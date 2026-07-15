"use client";

import { useState, useEffect } from "react";

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        function onScroll() {
            setVisible(window.scrollY > 500);
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-[#9b815e] hover:bg-white hover:text-black text-white flex items-center justify-center shadow-lg shadow-[#9b815e]/30 transition-all duration-300 group"
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:-translate-y-0.5 transition-transform duration-300"
            >
                <path d="M18 15l-6-6-6 6" />
            </svg>
        </button>
    );
}