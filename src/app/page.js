import Navbar from "@/components/Navbar";
import {
  Users, Briefcase, ChevronDown,
  Star, Clock, ShieldCheck, Zap,
  CreditCard, UserCheck, Phone, ArrowRight,
} from "lucide-react";
import Link from "next/link";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";

// ─── Data ──────────────────────────────────────────────────────────────────────
const fleet = [
  {
    name: "2022 GMC Yukon",
    category: "Luxury SUV",
    pax: 6,
    lug: 6,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToIztEdwER_n5I4VcT0-6XuAnmjN2Ue_2uZqxZHS08kw&s=10",
  },
  {
    name: "Chevy Suburban",
    category: "Executive",
    pax: 4,
    lug: 4,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU_Mv2Ot848hX9kE6GwWJS0xsRVQTUFGb9PJ67_Zn5pg&s=10",
  },
  {
    name: "Lincoln Town Car",
    category: "Executive",
    pax: 2,
    lug: 2,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvMYD5t6tKykmCMgszQL343t6xcGnF8N8rJkq1ixV95Q&s=10",
  },
];

const services = [
  {
    title: "Airport Transfer",
    subtitle: "DTW • MBS • YYZ",
    desc: "On-time pickup and drop-off with real-time flight tracking. Never miss a flight again.",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Corporate Travel",
    subtitle: "Executive Service",
    desc: "Impress clients and partners with a seamless, professional transportation experience.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Point to Point",
    subtitle: "Anywhere in Metro Detroit",
    desc: "Direct, comfortable rides from any location to another — city, suburbs, or beyond.",
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Night Out",
    subtitle: "Events & Special Occasions",
    desc: "Arrive in style. We handle the driving so you can enjoy every moment.",
    img: "https://plus.unsplash.com/premium_photo-1670984940156-c7f833fe8397?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fG5pZ2h0b3V0fGVufDB8fDB8fHww",
  },
];

const stats = [
  { number: "5,000+", label: "Rides Completed" },
  { number: "4.9★", label: "Average Rating" },
  { number: "24/7", label: "Availability" },
  { number: "10+", label: "Years Experience" },
];

const steps = [
  {
    number: "01",
    title: "Choose Your Ride",
    desc: "Select your vehicle, service type, and travel details in our simple booking form.",
  },
  {
    number: "02",
    title: "Get Confirmed",
    desc: "Our dispatch team reviews your request and confirms availability within the hour.",
  },
  {
    number: "03",
    title: "Ride in Comfort",
    desc: "Your professional chauffeur arrives on time. Sit back and enjoy the journey.",
  },
];

const testimonials = [
  {
    name: "James R.",
    role: "Corporate Executive",
    text: "Absolutely flawless service. The driver was early, the car was spotless, and the experience was top-tier. This is my go-to for every Detroit airport run.",
    stars: 5,
  },
  {
    name: "Sarah M.",
    role: "Frequent Traveler",
    text: "I've used many car services and Metro DTW is genuinely a cut above. Professional, punctual, and the Sprinter Van was perfect for our group.",
    stars: 5,
  },
  {
    name: "David K.",
    role: "Business Owner",
    text: "Used them for a corporate event. Every single guest was impressed. I will not use anyone else for transportation in Detroit.",
    stars: 5,
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="bg-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center text-center">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2000')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
        </div>

        {/* Floating gold lines — decorative */}
        <div className="absolute top-1/3 left-8 w-px h-32 bg-gradient-to-b from-transparent via-[#9b815e]/60 to-transparent hidden lg:block" />
        <div className="absolute top-1/3 right-8 w-px h-32 bg-gradient-to-b from-transparent via-[#9b815e]/60 to-transparent hidden lg:block" />

        <div className="relative z-10 px-6 max-w-5xl mx-auto">
          {/* Pre-title */}
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-[#9b815e]" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#9b815e] font-bold">
              Metro Detroit's #1 Black Car Service
            </span>
            <div className="h-px w-8 bg-[#9b815e]" />
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[1.05]">
            Luxury Chauffeur
            <br />
            <span className="text-[#9b815e]">Detroit </span> &amp; DTW
          </h1>

          <p className="text-white/70 text-sm md:text-base font-light tracking-[0.25em] mb-12 max-w-xl mx-auto uppercase">
            Airport transfers, corporate travel &amp; special occasions
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-[#9b815e] text-white px-10 py-5 text-xs font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-300 shadow-2xl shadow-[#9b815e]/30 inline-flex items-center gap-3"
            >
              Book Your Ride <ArrowRight size={14} />
            </Link>
            <a
              href="tel:+12487473474"
              className="border border-white/25 text-white px-10 py-5 text-xs font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-300 inline-flex items-center gap-3"
            >
              <Phone size={14} /> Call Now
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 w-full text-white/30 flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.5em]">Scroll to Explore</span>
          <ChevronDown size={20} className="animate-bounce" />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-zinc-950 py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-serif text-3xl md:text-4xl text-[#9b815e] font-bold">{s.number}</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mt-2 font-bold">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#9b815e]" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#9b815e] font-bold">
                Simple Process
              </span>
              <div className="h-px w-8 bg-[#9b815e]" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-zinc-950">
              As Easy as 1, 2, 3
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-[#9b815e]/30 to-transparent" />

            {steps.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="inline-flex items-center justify-center w-20 h-20 border-2 border-[#9b815e] mb-8 relative">
                  <span className="font-serif text-2xl text-[#9b815e] font-bold">{step.number}</span>
                </div>
                <h3 className="font-serif text-2xl text-zinc-950 mb-4">{step.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/book"
              className="inline-flex items-center gap-3 bg-zinc-950 text-white px-10 py-4 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#9b815e] transition-all duration-300 shadow-lg shadow-black/20"
            >
              Start Booking <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-32 bg-zinc-950 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#9b815e]" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#9b815e] font-bold">
                What We Offer
              </span>
              <div className="h-px w-8 bg-[#9b815e]" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white">
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                href="/book"
                className="relative h-96 group overflow-hidden block"
              >
                {/* Background image */}
                <img
                  src={service.img}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/80 transition-all duration-500" />

                {/* Gold top border on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#9b815e] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="text-[10px] uppercase tracking-[0.4em] text-[#9b815e] font-bold mb-2">
                    {service.subtitle}
                  </div>
                  <h3 className="font-serif text-3xl text-white mb-3">{service.title}</h3>
                  <p className="text-white/60 text-sm font-light leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                    {service.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#9b815e] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Book Now <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLEET ── */}
      <section id="fleet" className="py-32 bg-zinc-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#9b815e]" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#9b815e] font-bold">
                Premium Vehicles
              </span>
              <div className="h-px w-8 bg-[#9b815e]" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-zinc-950">
              The Fleet
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {fleet.map((car) => (
              <div
                key={car.name}
                className="bg-white border border-zinc-200 group shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                <div className="overflow-hidden h-64 relative">
                  <img
                    src={car.img}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1.5 text-[9px] uppercase tracking-[0.3em] text-[#9b815e] font-black">
                    {car.category}
                  </div>
                </div>

                <div className="p-8 text-center">
                  <h3 className="font-serif text-2xl mb-5 text-zinc-950">{car.name}</h3>

                  <div className="flex justify-center gap-8 mb-8">
                    <div className="flex flex-col items-center gap-2 text-zinc-700">
                      <div className="w-10 h-10 border border-zinc-200 flex items-center justify-center">
                        <Users size={16} strokeWidth={1.5} />
                      </div>
                      <span className="text-[9px] uppercase font-bold tracking-widest">{car.pax} Pax</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-zinc-700">
                      <div className="w-10 h-10 border border-zinc-200 flex items-center justify-center">
                        <Briefcase size={16} strokeWidth={1.5} />
                      </div>
                      <span className="text-[9px] uppercase font-bold tracking-widest">{car.lug} Bags</span>
                    </div>
                  </div>

                  <Link
                    href="/book"
                    className="block w-full bg-zinc-950 py-4 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#9b815e] transition-all duration-300 group/btn"
                  >
                    <span className="inline-flex items-center gap-2">
                      Reserve Now
                      <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

          {/* LEFT: Image stack */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative h-[500px] md:h-[640px]">
              {/* Main image */}
              <div className="absolute inset-0 overflow-hidden shadow-2xl">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVP5Y7bHy-pn2XcF2GuEPcPC4Exq4DncKwVEND-vIF7Q&s=10"
                  alt="Luxury chauffeur"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Floating card — bottom right */}
              <div className="absolute -bottom-6 -right-6 bg-zinc-950 text-white p-6 w-52 shadow-2xl">
                <div className="text-[#9b815e] font-serif text-4xl font-bold">10+</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mt-1 font-bold">
                  Years of Excellence
                </div>
              </div>

              {/* Gold accent */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-[#9b815e] -z-10" />
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#9b815e]" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#9b815e] font-bold">
                Why Choose Us
              </span>
              <div className="h-px w-8 bg-[#9b815e]" />
            </div>

            <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight text-zinc-950">
              Every trip is safe,
              <br />
              seamless &amp; special
            </h2>

            <p className="text-zinc-500 text-base font-light leading-relaxed mb-12">
              We are Metro Detroit's most trusted luxury chauffeur service.
              From the moment you book to the moment you arrive, every detail is handled with precision.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <ValueIcon Icon={Star} label="Luxury Vehicles" />
              <ValueIcon Icon={Clock} label="24/7 Support" />
              <ValueIcon Icon={ShieldCheck} label="Fully Insured" />
              <ValueIcon Icon={Zap} label="Instant Booking" />
              <ValueIcon Icon={CreditCard} label="Easy Payments" />
              <ValueIcon Icon={UserCheck} label="Pro Chauffeurs" />
            </div>

            <div className="mt-12">
              <Link
                href="/book"
                className="inline-flex items-center gap-3 bg-zinc-950 text-white px-10 py-4 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#9b815e] transition-all duration-300 shadow-lg shadow-black/20"
              >
                Book Now <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-32 bg-zinc-950 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#9b815e]" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#9b815e] font-bold">
                Client Reviews
              </span>
              <div className="h-px w-8 bg-[#9b815e]" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white">
              What Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-zinc-900 border border-white/5 p-8 relative group hover:border-[#9b815e]/30 transition-all duration-300"
              >
                {/* Gold top border */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#9b815e] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={14} fill="#9b815e" className="text-[#9b815e]" />
                  ))}
                </div>

                <p className="text-zinc-300 text-sm font-light leading-relaxed mb-8 italic">
                  "{t.text}"
                </p>

                <div className="border-t border-white/5 pt-6">
                  <div className="font-bold text-white text-sm">{t.name}</div>
                  <div className="text-[10px] uppercase tracking-widest text-[#9b815e] mt-1 font-bold">
                    {t.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1769787301187-0fab290ba2f2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z21jJTIweXVrb258ZW58MHx8MHx8fDA%3D')",
          }}
        >
          <div className="absolute inset-0 bg-black/80" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-[#9b815e]" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#9b815e] font-bold">
              Ready to Ride?
            </span>
            <div className="h-px w-8 bg-[#9b815e]" />
          </div>

          <h2 className="font-serif text-4xl md:text-6xl text-white mb-6 leading-tight">
            Your Chauffeur
            <br />
            Awaits
          </h2>

          <p className="text-white/60 text-base font-light mb-12 max-w-lg mx-auto">
            Book online in minutes or call us directly.
            Available 24/7 across Metro Detroit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-[#9b815e] text-white px-12 py-5 text-xs font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-300 shadow-2xl shadow-[#9b815e]/30 inline-flex items-center gap-3 justify-center"
            >
              Book Online <ArrowRight size={14} />
            </Link>
            <a
              href="tel:+12487473474"
              className="border border-white/25 text-white px-12 py-5 text-xs font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-300 inline-flex items-center gap-3 justify-center"
            >
              <Phone size={14} /> (248) 747-3474
            </a>
          </div>
        </div>
      </section>
      <BackToTop />
      <Footer />
    </main>
  );
}

// ─── ValueIcon ─────────────────────────────────────────────────────────────────
function ValueIcon({ Icon, label }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 border border-[#9b815e]/30 flex items-center justify-center shrink-0 bg-[#9b815e]/5">
        <Icon size={20} strokeWidth={1.25} className="text-[#9b815e]" />
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700 leading-tight">
        {label}
      </span>
    </div>
  );
}