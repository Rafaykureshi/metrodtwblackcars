import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Clock3, MapPin, Plane, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { getServiceArea, serviceAreas } from "@/data/serviceAreas";

export function generateStaticParams() {
  return serviceAreas.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const city = getServiceArea(slug);
  if (!city) return {};

  const title = `${city.name} to DTW Airport Car Service`;
  const description = `Private black car and chauffeur service between ${city.name} and Detroit Metro Airport (DTW). Airport transfers, corporate travel, events, and point-to-point rides available 24/7.`;

  return {
    title,
    description,
    alternates: { canonical: `/service-areas/${city.slug}` },
    openGraph: {
      title: `${title} | Metro DTW Black Cars`,
      description,
      url: `/service-areas/${city.slug}`,
    },
  };
}

export default async function ServiceAreaPage({ params }) {
  const { slug } = await params;
  const city = getServiceArea(slug);
  if (!city) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${city.name} to DTW Airport Car Service`,
    provider: {
      "@type": "TaxiService",
      name: "Metro DTW Black Cars",
      telephone: "+17342732916",
      url: "https://www.metrodtwblackcars.com",
    },
    areaServed: { "@type": "City", name: city.name },
    serviceType: ["Airport Transfer", "Black Car Service", "Corporate Transportation", "Private Chauffeur"],
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative flex min-h-[620px] items-center overflow-hidden bg-zinc-950 px-6 pb-24 pt-36 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-zinc-950" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="mb-7 inline-flex items-center gap-3">
            <div className="h-px w-8 bg-[#9b815e]" />
            <span className="text-[10px] font-black uppercase tracking-[0.45em] text-[#9b815e]">
              Michigan Chauffeur Service
            </span>
            <div className="h-px w-8 bg-[#9b815e]" />
          </div>

          <h1 className="font-serif text-4xl leading-tight text-white md:text-6xl lg:text-7xl">
            {city.name} to
            <br />
            <span className="text-[#9b815e]">DTW Airport</span> Car Service
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-sm font-light leading-7 text-white/65 md:text-base">
            Private, punctual transportation for {city.qualifier}—available for airport transfers,
            corporate travel, special events, and point-to-point rides.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={`/book?pickup=${encodeURIComponent(city.name)}`}
              className="inline-flex items-center justify-center gap-3 bg-[#9b815e] px-9 py-5 text-[10px] font-black uppercase tracking-[0.35em] text-white transition hover:bg-white hover:text-black"
            >
              Book from {city.name} <ArrowRight size={13} />
            </Link>
            <a
              href="tel:+17342732916"
              className="inline-flex items-center justify-center border border-white/25 px-9 py-5 text-[10px] font-black uppercase tracking-[0.35em] text-white transition hover:bg-white hover:text-black"
            >
              Call (734) 273-2916
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <article>
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-[#9b815e]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#9b815e]">
                Local Transportation
              </span>
            </div>

            <h2 className="font-serif text-4xl leading-tight text-zinc-950 md:text-5xl">
              Professional black car service in {city.name}
            </h2>

            <p className="mt-7 text-base font-light leading-8 text-zinc-600">{city.intro}</p>

            <p className="mt-6 text-base font-light leading-8 text-zinc-600">
              Every reservation is scheduled in advance and reviewed by our dispatch team. Your chauffeur
              arrives in a clean, comfortable vehicle and follows the itinerary provided with your booking.
              For airport trips, flight details can be included so pickup planning accounts for your arrival
              or departure schedule.
            </p>

            <p className="mt-6 text-base font-light leading-8 text-zinc-600">
              Choose Metro DTW Black Cars for early-morning departures, late-night arrivals, business travel,
              hotel transfers, weddings, concerts, sporting events, and private transportation throughout
              Michigan. One-way and round-trip reservations are available.
            </p>
          </article>

          <aside className="border border-zinc-200 bg-zinc-50 p-8 md:p-10">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#9b815e]">
              Service Highlights
            </div>
            <h3 className="mt-3 font-serif text-3xl text-zinc-950">Built around your schedule</h3>

            <div className="mt-8 space-y-6">
              {[
                [Plane, "DTW Airport Transfers", `Prearranged transportation between ${city.name} and Detroit Metro Airport.`],
                [Clock3, "24/7 Reservations", "Early departures and late arrivals can be scheduled in advance."],
                [BriefcaseBusiness, "Corporate Travel", "Professional transportation for executives, teams, meetings, and events."],
                [ShieldCheck, "Private & Professional", "Licensed, insured service with experienced chauffeurs and clean vehicles."],
                [MapPin, "Point-to-Point Service", `Private rides from ${city.name} to destinations across Metro Detroit and Michigan.`],
              ].map(([Icon, title, text]) => (
                <div key={title} className="flex gap-4 border-b border-zinc-200 pb-6 last:border-0 last:pb-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#9b815e]/30 bg-white">
                    <Icon size={18} className="text-[#9b815e]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-[0.16em] text-zinc-900">{title}</h4>
                    <p className="mt-2 text-sm font-light leading-6 text-zinc-500">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-zinc-950 px-6 py-24 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <span className="text-[10px] font-black uppercase tracking-[0.45em] text-[#9b815e]">
            Reserve Your Ride
          </span>
          <h2 className="mt-5 font-serif text-4xl md:text-5xl">
            Need transportation from {city.name}?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-7 text-zinc-400">
            Send your pickup details and receive availability and a personalized quote from our dispatch team.
          </p>
          <Link
            href={`/book?pickup=${encodeURIComponent(city.name)}`}
            className="mt-9 inline-flex items-center gap-3 bg-[#9b815e] px-10 py-5 text-[10px] font-black uppercase tracking-[0.35em] text-white transition hover:bg-white hover:text-black"
          >
            Request a Quote <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
}
