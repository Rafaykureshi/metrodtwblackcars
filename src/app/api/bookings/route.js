import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendBookingEmails } from "@/lib/sendBookingEmails";

const ALLOWED_SERVICES = new Set(["Point-to-Point", "Airport Transfer", "Hourly"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d\s.-]{7,25}$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const attempts = new Map();

function text(value, max) {
  return String(value ?? "").trim().slice(0, max);
}

function getClientIp(req) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const limit = 5;
  const recent = (attempts.get(ip) || []).filter((time) => now - time < windowMs);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > limit;
}

function badRequest(error) {
  return NextResponse.json({ ok: false, error }, { status: 400 });
}

export async function POST(req) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many booking attempts. Please wait a few minutes or call us." },
        { status: 429, headers: { "Retry-After": "600" } }
      );
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) {
      console.error("[bookings] Missing Supabase server environment variables.");
      return NextResponse.json({ ok: false, error: "Booking service is temporarily unavailable." }, { status: 500 });
    }

    const body = await req.json();
    if (text(body.website, 200)) {
      return NextResponse.json({ ok: true, bookingId: "received" });
    }

    const full_name = text(body.full_name, 100);
    const phone = text(body.phone, 25);
    const email = text(body.email, 160).toLowerCase();
    const pickup_address = text(body.pickup_address, 220);
    const dropoff_address = text(body.dropoff_address, 220);
    const service_type = text(body.service_type, 40);
    const vehicle_id = text(body.vehicle_id, 50);
    const flight_number = service_type === "Airport Transfer" ? text(body.flight_number, 30) || null : null;
    const notes = text(body.notes, 750) || null;
    const passengers = Number(body.passengers);
    const luggage = Number(body.luggage);

    if (full_name.length < 2) return badRequest("Please enter your full name.");
    if (!PHONE_RE.test(phone)) return badRequest("Please enter a valid phone number.");
    if (!EMAIL_RE.test(email)) return badRequest("Please enter a valid email address.");
    if (pickup_address.length < 5 || dropoff_address.length < 5) return badRequest("Please enter complete pickup and drop-off addresses.");
    if (!ALLOWED_SERVICES.has(service_type)) return badRequest("Invalid service type.");
    if (!UUID_RE.test(vehicle_id)) return badRequest("Invalid vehicle selection.");
    if (!Number.isInteger(passengers) || passengers < 1 || passengers > 14) return badRequest("Passengers must be between 1 and 14.");
    if (!Number.isInteger(luggage) || luggage < 0 || luggage > 20) return badRequest("Luggage must be between 0 and 20.");

    const pickupDate = new Date(body.pickup_datetime);
    if (Number.isNaN(pickupDate.getTime())) return badRequest("Invalid pickup date and time.");
    if (pickupDate.getTime() < Date.now() + 30 * 60 * 1000) return badRequest("Pickup time must be at least 30 minutes from now.");
    if (pickupDate.getTime() > Date.now() + 365 * 24 * 60 * 60 * 1000) return badRequest("Bookings can be made up to one year in advance.");

    const supabase = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: vehicle, error: vehicleError } = await supabase
      .from("vehicles")
      .select("id,name,passengers,luggage,active")
      .eq("id", vehicle_id)
      .eq("active", true)
      .maybeSingle();

    if (vehicleError) {
      console.error("[bookings] Vehicle lookup failed", vehicleError);
      return NextResponse.json({ ok: false, error: "Unable to verify the selected vehicle." }, { status: 500 });
    }
    if (!vehicle) return badRequest("The selected vehicle is no longer available.");
    if (passengers > Number(vehicle.passengers || 0)) return badRequest(`The selected vehicle supports up to ${vehicle.passengers} passengers.`);
    if (luggage > Number(vehicle.luggage || 0)) return badRequest(`The selected vehicle supports up to ${vehicle.luggage} bags.`);

    const insertPayload = {
      service_type,
      full_name,
      phone,
      email,
      pickup_address,
      dropoff_address,
      pickup_datetime: pickupDate.toISOString(),
      flight_number,
      passengers,
      luggage,
      vehicle_id,
      notes,
      status: "pending",
    };

    const { data, error } = await supabase
      .from("bookings")
      .insert(insertPayload)
      .select("id")
      .single();

    if (error) {
      console.error("[bookings] Insert failed", error);
      return NextResponse.json({ ok: false, error: "We could not save your booking. Please call us for assistance." }, { status: 500 });
    }

    const emailResult = await sendBookingEmails({
      id: data.id,
      ...insertPayload,
      vehicle_name: vehicle.name,
    });

    return NextResponse.json({
      ok: true,
      bookingId: data.id,
      notificationSent: emailResult.ok,
    });
  } catch (error) {
    console.error("[bookings] Unexpected error", error);
    return NextResponse.json({ ok: false, error: "Unexpected booking error. Please try again." }, { status: 500 });
  }
}
