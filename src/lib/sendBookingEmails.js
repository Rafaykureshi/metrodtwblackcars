import { Resend } from "resend";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDetroitDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Detroit",
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(value));
}

function detailRow(label, value) {
  return `<tr><td style="padding:8px 0;color:#777;width:145px">${escapeHtml(label)}</td><td style="padding:8px 0;color:#111;font-weight:700">${escapeHtml(value || "—")}</td></tr>`;
}

export async function sendBookingEmails(booking) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.BOOKINGS_NOTIFY_TO;

  if (!apiKey || !adminEmail) {
    console.warn("[booking-email] Email environment variables are not configured.");
    return { ok: false, skipped: true };
  }

  const resend = new Resend(apiKey);
  const fromName = process.env.BOOKINGS_FROM_NAME || "Metro DTW Black Cars";
  const fromEmail = process.env.BOOKINGS_FROM_EMAIL || "onboarding@resend.dev";
  const from = `${fromName} <${fromEmail}>`;
  const pickupTime = formatDetroitDate(booking.pickup_datetime);
  const reference = String(booking.id).slice(0, 8).toUpperCase();

  const rows = [
    detailRow("Service", booking.service_type),
    detailRow("Vehicle", booking.vehicle_name),
    detailRow("Pickup time", pickupTime),
    detailRow("Pickup", booking.pickup_address),
    detailRow("Drop-off", booking.dropoff_address),
    detailRow("Passengers", booking.passengers),
    detailRow("Luggage", booking.luggage),
    booking.flight_number ? detailRow("Flight", booking.flight_number) : "",
    booking.notes ? detailRow("Requests", booking.notes) : "",
  ].join("");

  const shell = (eyebrow, title, intro, content) => `
    <div style="margin:0;background:#f4f1ec;padding:28px;font-family:Arial,sans-serif;color:#111">
      <div style="max-width:680px;margin:auto;background:#fff;border:1px solid #e7e1d8">
        <div style="height:4px;background:#9b815e"></div>
        <div style="padding:30px">
          <div style="font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#9b815e;font-weight:800">${escapeHtml(eyebrow)}</div>
          <h1 style="font-family:Georgia,serif;font-size:30px;margin:12px 0 8px">${escapeHtml(title)}</h1>
          <p style="color:#666;line-height:1.7;margin:0 0 22px">${escapeHtml(intro)}</p>
          ${content}
          <div style="margin-top:26px;padding:18px;background:#111;text-align:center;color:#fff">
            <div style="font-size:10px;letter-spacing:.25em;text-transform:uppercase;color:#aaa">Immediate assistance</div>
            <div style="margin-top:8px;font-size:20px;color:#c0a47e;font-weight:800">(734) 273-2916</div>
          </div>
        </div>
      </div>
    </div>`;

  const adminHtml = shell(
    "New reservation request",
    booking.full_name,
    `Reference ${reference}. Review and confirm this request in the admin dashboard.`,
    `<table style="width:100%;border-collapse:collapse;font-size:14px">
      ${detailRow("Customer email", booking.email)}
      ${detailRow("Customer phone", booking.phone)}
      ${rows}
    </table>`
  );

  const customerHtml = shell(
    "Request received",
    `Thank you, ${booking.full_name}`,
    `We received your reservation request. Reference ${reference}. This is not a final confirmation; our dispatch team will contact you with availability and pricing.`,
    `<table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>`
  );

  const results = await Promise.allSettled([
    resend.emails.send({
      from,
      to: [adminEmail],
      replyTo: booking.email,
      subject: `New booking ${reference} • ${booking.service_type} • ${booking.full_name}`,
      html: adminHtml,
    }),
    resend.emails.send({
      from,
      to: [booking.email],
      subject: `Reservation request received • ${reference}`,
      html: customerHtml,
    }),
  ]);

  const failures = results.filter(
    (result) => result.status === "rejected" || result.value?.error
  );

  if (failures.length) {
    console.error("[booking-email] One or more emails failed", failures);
    return { ok: false, skipped: false };
  }

  return { ok: true, skipped: false };
}
