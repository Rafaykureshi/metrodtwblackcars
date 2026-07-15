"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { Phone, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();

    const PHONE_DISPLAY = "(734) 273-2916";
    const PHONE_TEL = "+17342732916";
    const WHATSAPP_NUMBER = "17342732916";
    const WHATSAPP_TEXT = "Hi! I want to book a ride. Please share availability and pricing.";
    const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        function onScroll() {
            setScrolled(window.scrollY > 50);
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Fleet", href: "/#fleet" },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-[100] transition-all duration-500 ${pathname === "/"
                    ? scrolled
                        ? "bg-zinc-950/95 backdrop-blur-xl shadow-2xl border-b border-white/5"
                        : "bg-transparent border-b border-white/10"
                    : "bg-zinc-950/95 backdrop-blur-xl shadow-2xl border-b border-white/5"
                    }`}
            >
                {/* Gold Accent Line */}
                <div className="h-[1px] bg-gradient-to-r from-transparent via-[#9b815e]/50 to-transparent" />

                <div className="max-w-7xl mx-auto w-full px-6 md:px-10 h-20 flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="hidden md:block w-[2px] h-8 bg-gradient-to-b from-[#9b815e] to-transparent" />
                        <div className="flex flex-col leading-none">
                            <span className="text-xl md:text-2xl font-bold tracking-tight text-white">
                                METRO <span className="text-[#9b815e] font-light">DTW</span>
                            </span>
                            <span className="text-[7px] uppercase tracking-[0.5em] text-white/30 mt-0.5">
                                Black Car Service
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="relative px-5 py-2 text-[10px] uppercase tracking-[0.3em] font-bold text-white/60 hover:text-white transition group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-6 h-[1px] bg-[#9b815e] transition-all duration-300" />
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">

                        {/* Phone */}
                        <a
                            href={`tel:${PHONE_TEL}`}
                            className="hidden md:flex items-center gap-2 text-white/70 hover:text-white transition"
                        >
                            <Phone size={14} className="text-[#9b815e]" />
                            <span className="text-xs font-bold tracking-wider">{PHONE_DISPLAY}</span>
                        </a>

                        {/* WhatsApp */}
                        <a
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="WhatsApp"
                            className="h-11 w-11 rounded-full border border-white/10 bg-white/5 hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300 flex items-center justify-center group"
                        >
                            <FaWhatsapp size={17} className="text-[#25D366] group-hover:text-white transition-colors" />
                        </a>

                        {/* Book Now CTA */}
                        <Link
                            href="/book"
                            className="hidden sm:inline-flex items-center gap-2 bg-[#9b815e] px-6 py-2.5 text-[10px] uppercase tracking-[0.3em] font-black text-white hover:bg-white hover:text-black transition"
                        >
                            Book Now
                            <ArrowRight size={12} />
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden w-10 h-10 flex items-center justify-center border border-white/10 bg-white/5"
                        >
                            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}