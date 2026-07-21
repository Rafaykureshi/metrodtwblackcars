import Link from "next/link";
import { serviceAreas } from "@/data/site";

export default function CitiesSection() {
  return (
    <section className="border-b border-white/5 bg-zinc-950 px-6 py-16" aria-labelledby="cities-we-serve-heading">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.45em] text-[#9b815e]">Michigan Service Areas</p>
        <h2 id="cities-we-serve-heading" className="mt-4 font-serif text-3xl text-white md:text-4xl">Cities We Serve</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-400">Private DTW airport transfers, corporate transportation, and chauffeur service across Metro Detroit and Michigan.</p>
        <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-3">
          {serviceAreas.map((city, index) => (
            <span key={city.slug} className="inline-flex items-center">
              <Link href={`/service-areas/${city.slug}`} className="border-b border-zinc-700 text-sm text-zinc-300 transition hover:border-[#9b815e] hover:text-[#9b815e]">{city.name}</Link>
              {index < serviceAreas.length - 1 && <span className="ml-2 text-zinc-700" aria-hidden="true">|</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
