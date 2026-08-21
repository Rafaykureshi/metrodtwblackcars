import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Check,
  Clock,
  MapPin,
  Phone,
  Plane,
  ShieldCheck,
  Star,
  UserCheck,
} from "lucide-react";

export const metadata = {
  title: "Detroit Black Car Services | DTW Airport Transportation",
  description:
    "Luxury black car services in Detroit and Metro Detroit, including DTW airport transfers, hourly chauffeur service, point-to-point transportation, corporate travel and special occasions.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Detroit Black Car Services | Metro DTW Black Cars",
    description:
      "DTW airport transportation, hourly chauffeur service, point-to-point rides and executive black car service across Metro Detroit.",
    url: "https://metrodtwblackcars.com/services",
  },
};

const services = [
  {
    eyebrow: "24/7 Airport Service",
    title: "Airport Pick-Up / Drop-Off",
    description:
      "Private black car transportation to and from Detroit Metropolitan Airport with dependable pickup, luggage-friendly vehicles and professional chauffeurs.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=82&w=1600&auto=format&fit=crop",
    icon: Plane,
    highlights: ["DTW airport transfers", "Flight-aware pickup", "Private door-to-door service"],
  },
  {
    eyebrow: "Flexible Chauffeur Time",
    title: "Hourly Service",
    description:
      "Keep a professional chauffeur and luxury vehicle available for meetings, events, dinners, nights out and schedules with multiple stops.",
    image:
      "https://content.homenetiol.com/2000292/2235906/0x0/a3e369eb0d554f699aa4023fcea6156d.jpg",
    icon: Clock,
    highlights: ["Corporate itineraries", "Events & nights out", "Multiple stops"],
  },
  {
    eyebrow: "Metro Detroit Coverage",
    title: "Point-to-Point",
    description:
      "Direct private transportation between homes, hotels, offices, venues and destinations throughout Metro Detroit and Southeast Michigan.",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=82&w=1600&auto=format&fit=crop",
    icon: MapPin,
    highlights: ["Home-to-hotel", "Office-to-event", "City & suburban trips"],
  },
];

const process = [
  {
    number: "01",
    title: "Reserve Your Ride",
    description:
      "Tell us your pickup, destination, travel time and preferred vehicle online or by phone.",
  },
  {
    number: "02",
    title: "Receive Confirmation",
    description:
      "Our team reviews your request, confirms availability and provides your reservation details.",
  },
  {
    number: "03",
    title: "Enjoy the Journey",
    description:
      "Your chauffeur arrives prepared and on time so you can travel comfortably and without stress.",
  },
];

const included = [
  { icon: UserCheck, title: "Professional Chauffeurs", text: "Courteous, experienced service from pickup through drop-off." },
  { icon: ShieldCheck, title: "Private & Reliable", text: "A dedicated vehicle and chauffeur for your reservation." },
  { icon: Star, title: "Premium Vehicles", text: "Clean, comfortable black cars and SUVs prepared for every trip." },
  { icon: Briefcase, title: "Business Ready", text: "Professional transportation for executives, clients and teams." },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f3ed] text-zinc-950">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[620px] overflow-hidden bg-zinc-950 pt-24 text-white md:min-h-[680px]">
        <img
          src="/images/services/detroit-services-hero.jpg"
          alt="Downtown Detroit skyline"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/25" />

        <div className="relative z-10 mx-auto flex min-h-[596px] max-w-7xl items-center px-6 py-20 md:min-h-[656px]">
          <div className="max-w-3xl">
            <div className="mb-7 flex items-center gap-4">
              <div className="h-px w-10 bg-[#ad9068]" />
              <span className="text-[10px] font-black uppercase tracking-[0.45em] text-[#c2a57c]">
                Detroit &amp; DTW Transportation
              </span>
            </div>

            <h1 className="font-serif text-5xl leading-[0.98] sm:text-6xl md:text-7xl lg:text-[86px]">
              Chauffeur service,
              <br />
              <span className="text-[#b5976c]">elevated.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base font-light leading-8 text-white/70 md:text-lg">
              Premium airport transfers, hourly chauffeur service and private
              point-to-point transportation throughout Metro Detroit and Southeast Michigan.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-3 bg-[#a88c65] px-9 py-5 text-[10px] font-black uppercase tracking-[0.35em] text-white transition hover:bg-white hover:text-black"
              >
                Reserve a Ride <ArrowRight size={14} />
              </Link>
              <a
                href="tel:+17342732916"
                className="inline-flex items-center justify-center gap-3 border border-white/25 px-9 py-5 text-[10px] font-black uppercase tracking-[0.35em] text-white transition hover:border-white hover:bg-white hover:text-black"
              >
                <Phone size={14} /> (734) 273-2916
              </a>
            </div>
          </div>
        </div>

        <a
          href="https://commons.wikimedia.org/wiki/File:Detroit_Skyline_(Nov2021).jpg"
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-[70px] right-4 z-10 text-[8px] text-white/30 transition hover:text-white/60"
        >
          Photo: Lrgjr72 / Wikimedia Commons, CC BY-SA 4.0
        </a>

        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-black/35 backdrop-blur-md">
          <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {["24/7 Availability", "Private Black Car Service", "Metro Detroit Coverage"].map((item) => (
              <div key={item} className="py-5 text-center text-[9px] font-bold uppercase tracking-[0.3em] text-white/65">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-28 w-28 border-l border-t border-[#a88c65]/60" />
            <img
              src="https://di-uploads-pod21.dealerinspire.com/ryanchevroletnd/uploads/2024/11/Untitled-design-2024-11-15T191826.058.png"
              alt="Premium black car transportation"
              className="relative h-[440px] w-full object-cover shadow-2xl md:h-[540px]"
            />
            <div className="absolute -bottom-7 right-0 bg-zinc-950 px-8 py-6 text-white shadow-xl md:right-[-28px]">
              <div className="font-serif text-4xl text-[#b5976c]">24/7</div>
              <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.3em] text-white/50">Transportation Support</div>
            </div>
          </div>

          <div className="lg:pl-4">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-[#a88c65]" />
              <span className="text-[10px] font-black uppercase tracking-[0.45em] text-[#8b704c]">Our Standard</span>
            </div>
            <h2 className="max-w-2xl font-serif text-4xl leading-tight md:text-6xl">
              Detroit transportation built around your schedule.
            </h2>
            <p className="mt-7 text-base leading-8 text-zinc-600 md:text-lg">
              Metro DTW Black Cars provides private transportation to and from Detroit Metropolitan Airport,
              along with local address-to-address and hourly chauffeur service across the Metro Detroit area.
            </p>
            <p className="mt-5 text-base leading-8 text-zinc-600 md:text-lg">
              Whether your day begins at DTW, a downtown hotel, a corporate office or your front door,
              our goal is the same: a clean vehicle, a professional chauffeur and a smooth arrival.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-5 border-t border-black/10 pt-8 sm:grid-cols-3">
              <div><div className="font-serif text-3xl">DTW</div><div className="mt-1 text-[9px] uppercase tracking-[0.25em] text-zinc-500">Airport Service</div></div>
              <div><div className="font-serif text-3xl">24/7</div><div className="mt-1 text-[9px] uppercase tracking-[0.25em] text-zinc-500">Availability</div></div>
              <div><div className="font-serif text-3xl">Private</div><div className="mt-1 text-[9px] uppercase tracking-[0.25em] text-zinc-500">Chauffeur Ride</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-zinc-950 px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px w-8 bg-[#a88c65]" />
                <span className="text-[10px] font-black uppercase tracking-[0.45em] text-[#b5976c]">Choose Your Service</span>
              </div>
              <h2 className="font-serif text-4xl md:text-6xl">Every ride, handled properly.</h2>
            </div>

          </div>

          <div className="grid gap-7 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className="group overflow-hidden border border-white/10 bg-zinc-900/70">
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/15 to-transparent" />
                    <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center border border-white/20 bg-black/45 backdrop-blur-md">
                      <Icon size={20} className="text-[#c0a277]" />
                    </div>
                  </div>

                  <div className="p-7 md:p-8">
                    <div className="text-[9px] font-black uppercase tracking-[0.35em] text-[#b5976c]">{service.eyebrow}</div>
                    <h3 className="mt-3 font-serif text-3xl leading-tight">{service.title}</h3>
                    <p className="mt-4 min-h-[84px] text-sm leading-7 text-zinc-400">{service.description}</p>
                    <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
                      {service.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-center gap-3 text-xs text-zinc-300">
                          <Check size={13} className="text-[#b5976c]" /> {highlight}
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/book"
                      className="mt-8 inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white transition group-hover:text-[#c0a277]"
                    >
                      Book this service <ArrowRight size={13} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="bg-white px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
            {included.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-white p-8 md:p-9">
                <Icon size={22} strokeWidth={1.4} className="text-[#9b815e]" />
                <h3 className="mt-6 font-serif text-xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            {/* LEFT: Process steps */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-8 bg-[#a88c65]" />
                <span className="text-[10px] font-black uppercase tracking-[0.45em] text-[#8b704c]">
                  Simple From Start to Finish
                </span>
              </div>

              <h2 className="font-serif text-4xl md:text-6xl">The Process</h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-500">
                Reserve in minutes. We take care of the details from confirmation through arrival.
              </p>

              <div className="mt-10 divide-y divide-zinc-200 border-y border-zinc-200">
                {process.map((step) => (
                  <div
                    key={step.number}
                    className="grid grid-cols-[64px_1fr] gap-5 py-7 md:grid-cols-[80px_1fr] md:py-8"
                  >
                    <div className="font-serif text-3xl text-[#a88c65] md:text-4xl">
                      {step.number}
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl text-zinc-950">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/book"
                className="mt-9 inline-flex items-center gap-3 bg-zinc-950 px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-white transition hover:bg-[#a88c65]"
              >
                Start Your Reservation <ArrowRight size={13} />
              </Link>
            </div>

            {/* RIGHT: One process image */}
            <div className="relative">
              <div className="absolute -right-4 -top-4 h-28 w-28 border-r border-t border-[#a88c65]/60" />
              <img
                src="https://di-uploads-pod21.dealerinspire.com/ryanchevroletnd/uploads/2024/11/Untitled-design-2024-11-15T191826.058.png"
                alt="Luxury black car ready for a Metro DTW reservation"
                className="relative h-[440px] w-full object-cover shadow-2xl md:h-[560px]"
              />
              <div className="absolute -bottom-6 left-0 bg-zinc-950 px-7 py-5 text-white shadow-xl md:-left-6">
                <div className="text-[9px] font-black uppercase tracking-[0.35em] text-[#b5976c]">
                  Easy Booking
                </div>
                <div className="mt-2 font-serif text-2xl">
                  Reserve • Confirm • Ride
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO / DETAIL */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* LEFT: Luxury black car image */}
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-28 w-28 border-l border-t border-[#a88c65]/60" />

            <img
              src="https://content.homenetiol.com/2000292/2235906/0x0/a3e369eb0d554f699aa4023fcea6156d.jpg"
              alt="Luxury black car service in Detroit"
              className="relative h-[480px] w-full object-cover shadow-2xl md:h-[620px]"
            />

            <div className="absolute -bottom-6 right-0 border border-[#a88c65]/40 bg-[#f7f3ed] px-7 py-6 shadow-xl md:-right-6">
              <div className="text-[9px] font-black uppercase tracking-[0.35em] text-[#8b704c]">
                Serving
              </div>
              <div className="mt-2 font-serif text-2xl">
                Detroit • DTW • Metro Area
              </div>
            </div>
          </div>

          {/* RIGHT: SEO-rich service content */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-[#a88c65]" />
              <span className="text-[10px] font-black uppercase tracking-[0.45em] text-[#8b704c]">
                Premium Detroit Transportation
              </span>
            </div>

            <h2 className="font-serif text-4xl leading-tight md:text-6xl">
              Detroit Luxury Black Car Service
            </h2>

            <p className="mt-7 text-base leading-8 text-zinc-600">
              <strong className="font-semibold text-zinc-900">Metro DTW Black Cars</strong>{" "}
              provides premium Detroit airport transportation, executive travel and private
              chauffeur service throughout Metro Detroit and Southeast Michigan.
            </p>

            <p className="mt-5 text-base leading-8 text-zinc-600">
              From DTW airport pickup to corporate meetings, hotel transportation,
              weddings and private city travel, our service is designed around comfort,
              reliability and professional presentation.
            </p>

            <div className="mt-9 grid gap-x-8 gap-y-1 sm:grid-cols-2">
              {[
                "Detroit Black Car Service",
                "DTW Airport Transportation",
                "Luxury SUV Airport Service",
                "Corporate Executive Service",
                "Wedding Transportation",
                "Hotel Transportation",
                "Downtown Detroit Chauffeur",
                "Premium Private Car Service",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border-b border-zinc-100 py-3 text-sm text-zinc-700"
                >
                  <Check size={14} className="shrink-0 text-[#a88c65]" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-3 bg-zinc-950 px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-white transition hover:bg-[#a88c65]"
              >
                Reserve Now <ArrowRight size={13} />
              </Link>

              <a
                href="tel:+17342732916"
                className="inline-flex items-center justify-center gap-3 border border-zinc-300 px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-900 transition hover:border-zinc-950"
              >
                <Phone size={13} /> Call Dispatch
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-zinc-950 px-6 py-24 text-white md:py-28">
        <img
          src="/images/services/detroit-services-hero.jpg"
          alt="Detroit skyline at dusk"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-zinc-950/75" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="text-[10px] font-black uppercase tracking-[0.45em] text-[#b5976c]">Your Ride Is Ready</div>
          <h2 className="mt-5 font-serif text-4xl md:text-6xl">Tell us where you need to be.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-400">
            Submit your reservation request online or speak directly with Metro DTW Black Cars for availability and trip details.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/book" className="inline-flex items-center justify-center gap-3 bg-[#a88c65] px-9 py-5 text-[10px] font-black uppercase tracking-[0.35em] text-white transition hover:bg-white hover:text-black">
              Book Your Ride <ArrowRight size={14} />
            </Link>
            <a href="tel:+17342732916" className="inline-flex items-center justify-center gap-3 border border-white/20 px-9 py-5 text-[10px] font-black uppercase tracking-[0.35em] text-white transition hover:bg-white hover:text-black">
              <Phone size={14} /> (734) 273-2916
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
