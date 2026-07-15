"use client";
import { useState } from "react";

const amenities = [
    { id: 'wifi', title: 'Wifi', desc: 'High-Speed WiFi for all passengers.', img: 'https://images.unsplash.com/photo-1511316103324-913000b0df2b?q=80&w=1000' },
    { id: 'bt', title: 'Bluetooth', desc: 'Stream your music through our premium sound system.', img: 'https://images.unsplash.com/photo-1493238792040-8113bf70d7f3?q=80&w=1000' },
];

export default function Amenities() {
    const [active, setActive] = useState(amenities[0]);

    return (
        <section className="py-24 bg-accent">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="font-serif text-4xl text-center mb-12">Amenities</h2>
                <div className="bg-white shadow-xl flex flex-col md:flex-row">
                    <div className="md:w-1/3 flex md:flex-col border-b md:border-b-0 md:border-r border-zinc-100">
                        {amenities.map(a => (
                            <button
                                key={a.id}
                                onClick={() => setActive(a)}
                                className={`flex-1 p-6 text-sm uppercase tracking-widest font-bold transition-all ${active.id === a.id ? 'bg-black text-white' : 'hover:bg-zinc-50'}`}
                            >
                                {a.title}
                            </button>
                        ))}
                    </div>
                    <div className="md:w-2/3 p-12">
                        <img src={active.img} className="h-64 w-full object-cover mb-8" alt="" />
                        <h4 className="text-2xl font-serif mb-4">{active.title}</h4>
                        <p className="text-zinc-500 font-light leading-relaxed">{active.desc}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}