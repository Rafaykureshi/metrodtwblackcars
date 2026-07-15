"use client";
import { ChevronDown } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative h-[100vh] w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            {/* Background with subtle zoom effect */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] scale-110 hover:scale-100"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2000')" }}
            />
            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 max-w-5xl">
                <h1 className="font-serif text-5xl md:text-8xl text-white mb-8 leading-tight">
                    The Best Chauffeur <br /> Services in Metro Detroit
                </h1>
                <p className="text-white/80 text-lg md:text-xl font-light tracking-wide mb-12 max-w-2xl mx-auto">
                    Trusted by thousands of customers in Metro Detroit area.
                </p>

                <div className="flex flex-col items-center gap-16">
                    <button className="bg-primary hover:bg-[#866e4f] text-white px-12 py-5 text-sm uppercase tracking-[0.3em] font-bold transition-all duration-300 shadow-xl">
                        Book Now
                    </button>

                    <div className="animate-bounce flex flex-col items-center gap-2 text-white/60">
                        <span className="text-[10px] uppercase tracking-[0.4em]">Learn More</span>
                        <ChevronDown size={20} />
                    </div>
                </div>
            </div>
        </section>
    );
}