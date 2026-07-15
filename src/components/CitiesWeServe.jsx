import Link from "next/link";
import { serviceAreas } from "@/data/serviceAreas";

export default function CitiesWeServe({ dark = false }) {
  return (
    <section
      className={dark ? "border-b border-white/5 bg-zinc-950 px-6 py-16" : "bg-white px-6 py-20"}
      aria-labelledby="cities-we-serve-heading"
    >
      <div className="mx-auto max-w-7xl text-center">
        <div className="mb-5 inline-flex items-center gap-3">
          <div className="h-px w-8 bg-[#9b815e]" />
          <span className="text-[10px] font-black uppercase tracking-[0.45em] text-[#9b815e]">
            Michigan Service Areas
          </span>
          <div className="h-px w-8 bg-[#9b815e]" />
        </div>

        <h2
          id="cities-we-serve-heading"
          className={`font-serif text-3xl md:text-4xl ${dark ? "text-white" : "text-zinc-950"}`}
        >
          Cities We Serve
        </h2>

        <p className={`mx-auto mt-4 max-w-2xl text-sm leading-7 ${dark ? "text-zinc-500" : "text-zinc-500"}`}>
          Private DTW airport transfers, corporate transportation, and chauffeur service across Metro Detroit and Michigan.
        </p>

        <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-3 leading-relaxed">
          {serviceAreas.map((city, index) => (
            <span key={city.slug} className="inline-flex items-center">
              <Link
                href={`/service-areas/${city.slug}`}
                className={`border-b transition-colors ${
                  dark
                    ? "border-zinc-700 text-zinc-300 hover:border-[#9b815e] hover:text-[#9b815e]"
                    : "border-zinc-300 text-zinc-800 hover:border-[#9b815e] hover:text-[#9b815e]"
                }`}
              >
                {city.name}
              </Link>
              {index < serviceAreas.length - 1 && (
                <span className={`ml-2 ${dark ? "text-zinc-700" : "text-zinc-300"}`} aria-hidden="true">
                  |
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
