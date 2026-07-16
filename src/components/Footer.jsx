"use client";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import CitiesWeServe from "@/components/CitiesWeServe";

export default function Footer() {
    return (
        <>
        <CitiesWeServe dark />
        <footer className="bg-zinc-950 text-white pt-24 pb-12 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 mb-20">

                    {/* Col 1 */}
                    <div className="flex flex-col">
                        <div className="text-2xl font-bold tracking-tighter mb-2">
                            METRO <span className="text-[#9b815e]">DTW</span>
                        </div>
                        <div className="h-px w-12 bg-[#9b815e] mb-6" />

                        <p className="text-zinc-400 text-sm font-light leading-loose max-w-xs">
                            Metro Detroit's premier black car service.
                            Professional chauffeurs, immaculate vehicles,
                            and unmatched reliability.
                        </p>

                        <div className="mt-8 space-y-3 text-sm text-zinc-400">
                            <a href="tel:+17342732916" className="flex items-center gap-2 hover:text-white transition">
                                <Phone size={13} className="text-[#9b815e]" />
                                +1 (734) 273-2916
                            </a>

                            <a href="mailto:Metrodtwblackcars@gmail.com" className="hover:text-white transition text-xs">
                                Metrodtwblackcars@gmail.com
                            </a>

                            <div className="text-xs text-zinc-500">
                                Detroit, Michigan
                            </div>
                        </div>
                    </div>

                    {/* Col 2 */}
                    <div>
                        <h4 className="text-[#9b815e] text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                            Navigation
                        </h4>

                        <ul className="space-y-4 text-xs uppercase tracking-widest text-zinc-400">
                            <li>
                                <Link href="/" className="hover:text-white hover:pl-2 transition-all duration-200">
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link href="/services" className="hover:text-white hover:pl-2 transition-all duration-200">
                                    Our Services
                                </Link>
                            </li>

                            <li>
                                <Link href="/#fleet" className="hover:text-white hover:pl-2 transition-all duration-200">
                                    Fleet Gallery
                                </Link>
                            </li>

                            <li>
                                <Link href="/book" className="hover:text-white hover:pl-2 transition-all duration-200">
                                    Book a Ride
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Col 3 */}
                    <div>
                        <h4 className="text-[#9b815e] text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                            Service Areas
                        </h4>

                        <ul className="space-y-4 text-xs uppercase tracking-widest text-zinc-400">
                            {[
                                "Downtown Detroit",
                                "Metro Airport (DTW)",
                                "Warren",
                                "Troy / Birmingham",
                                "Ann Arbor"
                            ].map((area) => (
                                <li key={area} className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-[#9b815e]" />
                                    {area}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 4 */}
                    <div className="flex flex-col lg:items-end">
                        <h4 className="text-[#9b815e] text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                            Connect
                        </h4>

                        <div className="flex gap-3">
                            <a
                                href="https://www.facebook.com/profile.php?id=61591945043773"
                                aria-label="Facebook"
                                className="h-11 w-11 rounded-full border border-white/10 bg-white/5 hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-300 flex items-center justify-center group"
                            >
                                <FaFacebookF size={15} className="text-[#1877F2] group-hover:text-white transition-colors" />
                            </a>

                            <a
                                href="https://www.instagram.com/metrodtwblackcars?utm_source=qr&igsh=MTdzNm1qbm5qbnN5cA=="
                                aria-label="Instagram"
                                className="h-11 w-11 rounded-full border border-white/10 bg-white/5 hover:border-pink-500 transition-all duration-300 flex items-center justify-center group"
                            >
                                <FaInstagram size={16} className="text-pink-400 group-hover:text-pink-300 transition-colors" />
                            </a>

                            <a
                                href="https://wa.me/17342732916"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="WhatsApp"
                                className="h-11 w-11 rounded-full border border-white/10 bg-white/5 hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300 flex items-center justify-center group"
                            >
                                <FaWhatsapp size={17} className="text-[#25D366] group-hover:text-white transition-colors" />
                            </a>
                        </div>

                        <Link
                            href="/book"
                            className="mt-8 inline-flex items-center gap-2 bg-[#9b815e] px-7 py-4 text-[10px] font-black uppercase tracking-[0.35em] text-white hover:bg-white hover:text-black transition-all duration-300"
                        >
                            Book Now <ArrowRight size={12} />
                        </Link>

                        <p className="mt-6 text-[10px] text-zinc-600 uppercase tracking-[0.35em]">
                            Licensed • Insured • 24/7
                        </p>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-[9px] uppercase tracking-[0.3em]">

                    <p>
                        © {new Date().getFullYear()} Metro DTW Black Cars. All rights reserved.
                    </p>

                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition">
                            Privacy Policy
                        </Link>

                        <Link href="/terms" className="hover:text-white transition">
                            Terms & Conditions
                        </Link>
                    </div>

                </div>

            </div>
        </footer>
        </>
    );
}