"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Users, Briefcase } from "lucide-react";

const FALLBACK_IMG =
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1400&auto=format&fit=crop";

export default function FleetSection() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let alive = true;

        async function load() {
            setLoading(true);

            const { data, error } = await supabase
                .from("vehicles")
                .select("id,name,passengers,luggage,image_url,active,sort_order,created_at")
                .eq("active", true)
                .order("sort_order", { ascending: true })
                .order("created_at", { ascending: true });

            if (!alive) return;

            if (error) {
                console.error("Fleet load error:", error.message);
                setVehicles([]);
            } else {
                setVehicles(data || []);
            }

            setLoading(false);
        }

        load();

        return () => {
            alive = false;
        };
    }, []);

    return (
        <section id="fleet" className="py-24 md:py-32 bg-zinc-50">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <h2 className="text-center font-serif text-4xl md:text-5xl text-zinc-950 uppercase tracking-[0.25em]">
                    Fleet
                </h2>

                <p className="mt-6 text-center text-zinc-700 text-sm max-w-2xl mx-auto">
                    Choose the perfect vehicle for airport transfers, corporate travel, hourly service, and special events.
                </p>

                <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {loading &&
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="border border-zinc-200 bg-white shadow-sm">
                                <div className="h-64 bg-zinc-200 animate-pulse" />
                                <div className="p-8">
                                    <div className="h-7 bg-zinc-200 animate-pulse w-2/3 mx-auto" />
                                    <div className="mt-6 h-4 bg-zinc-200 animate-pulse w-1/2 mx-auto" />
                                    <div className="mt-10 h-12 bg-zinc-200 animate-pulse w-full" />
                                </div>
                            </div>
                        ))}

                    {!loading && vehicles.length === 0 && (
                        <div className="col-span-full text-center text-zinc-700">
                            No vehicles found. Add some vehicles in Admin → Fleet.
                        </div>
                    )}

                    {!loading &&
                        vehicles.map((v) => (
                            <article
                                key={v.id}
                                className="group border border-zinc-200 bg-white shadow-sm hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
                            >
                                <div className="h-64 w-full bg-zinc-100 overflow-hidden">
                                    <img
                                        src={v.image_url || FALLBACK_IMG}
                                        alt={v.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.currentTarget.src = FALLBACK_IMG;
                                        }}
                                    />
                                </div>

                                <div className="p-8 text-center">
                                    <h3 className="font-serif text-3xl text-zinc-950">
                                        {v.name}
                                    </h3>

                                    <div className="mt-6 flex items-center justify-center gap-10 text-zinc-600">
                                        <div className="flex flex-col items-center gap-2">
                                            <Users size={18} strokeWidth={1} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">
                                                {v.passengers || 0} Pax
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <Briefcase size={18} strokeWidth={1} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">
                                                {v.luggage || 0} Lug
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-10">
                                        <Link
                                            href={`/book?vehicleId=${v.id}`}
                                            className="block w-full bg-[#9b815e] py-4 text-white text-[10px] font-black uppercase tracking-[0.35em] hover:bg-black transition-colors"
                                        >
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                </div>
            </div>
        </section>
    );
}