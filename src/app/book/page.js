"use client";

import Navbar from "@/components/Navbar";
import { supabasePublic } from "@/lib/supabasePublic";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
    MapPin, Clock, Plane, Users, Briefcase,
    ArrowRight, CheckCircle, Phone, Shield, Star,
} from "lucide-react";
import Footer from "@/components/Footer";

function BookInner() {
    const searchParams = useSearchParams();
    const initialVehicleId = useMemo(
        () => searchParams.get("vehicleId") || "",
        [searchParams]
    );

    const [fleet, setFleet] = useState([]);
    const [loadingFleet, setLoadingFleet] = useState(true);
    const [form, setForm] = useState({
        service_type: "Point-to-Point",
        full_name: "", phone: "", email: "",
        pickup_address: "", dropoff_address: "",
        pickup_datetime: "", flight_number: "",
        passengers: 1, luggage: 0,
        vehicle_id: initialVehicleId, notes: "", website: "",
    });
    const [status, setStatus] = useState({
        loading: false, success: false, error: null, bookingId: null,
    });

    useEffect(() => {
        let alive = true;
        async function load() {
            setLoadingFleet(true);
            const { data, error } = await supabasePublic
                .from("vehicles")
                .select("id,name,passengers,luggage,image_url,active,sort_order")
                .eq("active", true)
                .order("sort_order", { ascending: true });
            if (!alive) return;
            if (error) { setFleet([]); } else {
                setFleet(data || []);
                if (!initialVehicleId && data?.length > 0)
                    setForm((s) => ({ ...s, vehicle_id: data[0].id }));
            }
            setLoadingFleet(false);
        }
        load();
        return () => { alive = false; };
    }, [initialVehicleId]);

    const selectedVehicle = useMemo(
        () => fleet.find((v) => v.id === form.vehicle_id) || null,
        [fleet, form.vehicle_id]
    );

    function setField(n, v) { setForm((s) => ({ ...s, [n]: v })); }

    function resetAll() {
        setForm({
            service_type: "Point-to-Point",
            full_name: "", phone: "", email: "",
            pickup_address: "", dropoff_address: "",
            pickup_datetime: "", flight_number: "",
            passengers: 1, luggage: 0,
            vehicle_id: initialVehicleId || fleet[0]?.id || "", notes: "", website: "",
        });
        setStatus({ loading: false, success: false, error: null, bookingId: null });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null, bookingId: null });

        if (!form.full_name || !form.phone || !form.email ||
            !form.pickup_address || !form.dropoff_address || !form.pickup_datetime) {
            setStatus({
                loading: false, success: false, bookingId: null,
                error: "Please fill all required fields."
            });
            return;
        }
        if (!form.vehicle_id) {
            setStatus({
                loading: false, success: false, bookingId: null,
                error: "Please select a vehicle."
            });
            return;
        }

        const res = await fetch("/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                service_type: form.service_type,
                full_name: form.full_name, phone: form.phone, email: form.email,
                pickup_address: form.pickup_address,
                dropoff_address: form.dropoff_address,
                pickup_datetime: form.pickup_datetime,
                flight_number: form.service_type === "Airport Transfer" ? form.flight_number || null : null,
                passengers: Number(form.passengers || 1),
                luggage: Number(form.luggage || 0),
                vehicle_id: form.vehicle_id, notes: form.notes || null, website: form.website,
            }),
        });

        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.ok) {
            setStatus({
                loading: false, success: false, bookingId: null,
                error: json?.error || "Booking failed."
            });
            return;
        }

        const bookingId = json.bookingId;


        setStatus({ loading: false, success: true, error: null, bookingId });
    }

    const serviceIcons = {
        "Point-to-Point": MapPin,
        "Airport Transfer": Plane,
        "Hourly": Clock,
    };

    // ── SUCCESS SCREEN ─────────────────────────────────────────────────────
    if (status.success) {
        return (
            <main className="min-h-screen bg-zinc-950 relative overflow-hidden">
                <Navbar />
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-15"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />

                <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-32">
                    <div className="w-full max-w-lg text-center">

                        {/* Decorative lines */}
                        <div className="flex items-center justify-center gap-4 mb-10">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#9b815e]" />
                            <div className="w-3 h-3 border border-[#9b815e] rotate-45" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#9b815e]" />
                        </div>

                        <div className="w-20 h-20 mx-auto mb-8 border border-[#9b815e]/30 flex items-center justify-center bg-[#9b815e]/10">
                            <CheckCircle size={32} className="text-[#9b815e]" />
                        </div>

                        <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
                            Thank You
                        </h2>
                        <p className="text-zinc-400 text-sm font-light leading-relaxed mb-3 max-w-sm mx-auto">
                            Your reservation request has been received. Our team will
                            contact you within the hour.
                        </p>

                        {status.bookingId && (
                            <div className="inline-flex items-center gap-2 border border-zinc-800 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-10">
                                Ref: {status.bookingId.slice(0, 8)}
                            </div>
                        )}

                        <div className="bg-zinc-900/50 border border-zinc-800 p-6 mb-8 backdrop-blur-sm">
                            <div className="text-[9px] uppercase tracking-[0.4em] text-zinc-600 mb-3 font-bold">
                                Immediate Assistance
                            </div>
                            <a href="tel:+17342732916" className="font-serif text-2xl text-[#9b815e] hover:text-white transition">
                                (734) 273-2916
                            </a>
                            <div className="mt-2">
                                <a href="https://wa.me/17342732916" target="_blank" rel="noreferrer"
                                    className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-[#9b815e] transition">
                                    WhatsApp →
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/"
                                className="flex-1 bg-zinc-900 border border-zinc-800 text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#9b815e] hover:border-[#9b815e] transition-all duration-300 text-center">
                                Back Home
                            </Link>
                            <button onClick={resetAll}
                                className="flex-1 border border-zinc-800 text-zinc-400 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white hover:border-zinc-600 transition-all duration-300">
                                Book Another
                            </button>
                        </div>

                        {/* Bottom decorative */}
                        <div className="flex items-center justify-center gap-4 mt-10">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-zinc-800" />
                            <div className="w-2 h-2 border border-zinc-800 rotate-45" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-zinc-800" />
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // ── BOOKING FORM ───────────────────────────────────────────────────────
    return (
        <main className="min-h-screen bg-zinc-950">
            <Navbar />

            {/* Full-page background */}
            <div className="fixed inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/95 to-zinc-950" />
            </div>

            <div className="relative z-10 pt-28 md:pt-32 pb-24 px-4 md:px-8">

                {/* Page header */}
                <div className="relative -mx-4 md:-mx-8 -mt-28 md:-mt-32 mb-12 overflow-hidden">
                    {/* Background image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop')",
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-black/70 to-zinc-950" />
                    </div>

                    {/* Gold accent lines */}
                    <div className="absolute top-1/2 left-8 w-px h-20 bg-gradient-to-b from-transparent via-[#9b815e]/40 to-transparent hidden lg:block -translate-y-1/2" />
                    <div className="absolute top-1/2 right-8 w-px h-20 bg-gradient-to-b from-transparent via-[#9b815e]/40 to-transparent hidden lg:block -translate-y-1/2" />

                    {/* Content */}
                    <div className="relative z-10 text-center px-6 pt-40 md:pt-44 pb-16">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#9b815e]" />
                            <div className="w-2 h-2 border border-[#9b815e] rotate-45" />
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#9b815e]" />
                        </div>

                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                            Reserve Your <span className="text-[#9b815e]">Experience</span>
                        </h1>

                        <p className="text-white/40 text-xs font-light tracking-[0.25em] uppercase max-w-md mx-auto">
                            Luxury ground transportation — confirmed within the hour
                        </p>

                        {/* Bottom decorative */}
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#9b815e]/30" />
                            <div className="w-1.5 h-1.5 bg-[#9b815e]/40 rotate-45" />
                            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#9b815e]/30" />
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ── FORM ── */}
                    <div className="lg:col-span-2 bg-white/[0.03] backdrop-blur-sm border border-white/10 shadow-2xl">

                        {/* Gold top accent */}
                        <div className="h-0.5 bg-gradient-to-r from-transparent via-[#9b815e] to-transparent" />

                        {status.error && (
                            <div className="mx-6 md:mx-10 mt-8 border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                                {status.error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-10">
                            <div className="absolute -left-[9999px]" aria-hidden="true">
                                <label htmlFor="website">Website</label>
                                <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setField("website", e.target.value)} />
                            </div>

                            {/* Service type */}
                            <div>
                                <GoldLabel text="Service Type" />
                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {["Point-to-Point", "Airport Transfer", "Hourly"].map((type) => {
                                        const Icon = serviceIcons[type];
                                        const active = form.service_type === type;
                                        return (
                                            <button key={type} type="button"
                                                onClick={() => setField("service_type", type)}
                                                className={`group flex items-center justify-center gap-3 py-4 text-[10px] font-black uppercase tracking-[0.2em] border transition-all duration-300 ${active
                                                    ? "bg-[#9b815e] text-white border-[#9b815e] shadow-lg shadow-[#9b815e]/20"
                                                    : "bg-transparent text-zinc-400 border-zinc-700 hover:border-[#9b815e]/50 hover:text-white"
                                                    }`}
                                            >
                                                <Icon size={14} className={active ? "text-white" : "text-zinc-600"} />
                                                {type}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Contact */}
                            <div>
                                <GoldLabel text="Your Details" />
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <DarkInput label="Full Name" required value={form.full_name}
                                        onChange={(v) => setField("full_name", v)} placeholder="John Smith" />
                                    <DarkInput label="Phone" required value={form.phone}
                                        onChange={(v) => setField("phone", v)} placeholder="+1 (248) 000-0000" />
                                </div>
                                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <div className="md:col-span-2">
                                        <DarkInput label="Email" type="email" required value={form.email}
                                            onChange={(v) => setField("email", v)} placeholder="john@email.com" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <DarkIconInput label="Pax" icon={Users} type="number" min={1}
                                            value={form.passengers} onChange={(v) => setField("passengers", v)} />
                                        <DarkIconInput label="Bags" icon={Briefcase} type="number" min={0}
                                            value={form.luggage} onChange={(v) => setField("luggage", v)} />
                                    </div>
                                </div>
                            </div>

                            {/* Trip */}
                            <div>
                                <GoldLabel text="Trip Details" />
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <DarkIconInput label="Pickup" icon={MapPin} required
                                        value={form.pickup_address} onChange={(v) => setField("pickup_address", v)}
                                        placeholder="123 Main St, Detroit" />
                                    <DarkIconInput label="Dropoff" icon={MapPin} required
                                        value={form.dropoff_address} onChange={(v) => setField("dropoff_address", v)}
                                        placeholder="DTW Airport" />
                                </div>
                                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <DarkIconInput label="Date & Time" icon={Clock} type="datetime-local" required
                                        value={form.pickup_datetime} onChange={(v) => setField("pickup_datetime", v)} />
                                    {form.service_type === "Airport Transfer" ? (
                                        <DarkIconInput label="Flight #" icon={Plane}
                                            value={form.flight_number} onChange={(v) => setField("flight_number", v)}
                                            placeholder="AA 1234" />
                                    ) : <div className="hidden md:block" />}
                                </div>
                            </div>

                            {/* Vehicle */}
                            <div>
                                <GoldLabel text="Select Vehicle" />
                                <div className="mt-4">
                                    {loadingFleet ? (
                                        <div className="text-zinc-500 text-sm py-8 text-center">Loading fleet...</div>
                                    ) : fleet.length === 0 ? (
                                        <div className="border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-300 text-center">
                                            No vehicles available.
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {fleet.map((v) => {
                                                const active = form.vehicle_id === v.id;
                                                return (
                                                    <button type="button" key={v.id}
                                                        onClick={() => setField("vehicle_id", v.id)}
                                                        className={`relative flex items-center gap-4 p-4 border transition-all duration-300 text-left group ${active
                                                            ? "border-[#9b815e] bg-[#9b815e]/10 shadow-lg shadow-[#9b815e]/10"
                                                            : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-600"
                                                            }`}
                                                    >
                                                        {active && (
                                                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#9b815e]" />
                                                        )}
                                                        <div className="w-24 h-16 bg-zinc-800 overflow-hidden shrink-0">
                                                            <img
                                                                src={v.image_url || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=400"}
                                                                alt={v.name}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=400"; }}
                                                            />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="text-[11px] font-black uppercase tracking-widest text-white">
                                                                {v.name}
                                                            </div>
                                                            <div className="mt-2 flex items-center gap-3 text-[10px] text-zinc-500">
                                                                <span className="inline-flex items-center gap-1"><Users size={11} /> {v.passengers}</span>
                                                                <span className="inline-flex items-center gap-1"><Briefcase size={11} /> {v.luggage}</span>
                                                            </div>
                                                        </div>
                                                        {active && (
                                                            <CheckCircle size={16} className="text-[#9b815e] absolute top-3 right-3" />
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Notes */}
                            <div>
                                <GoldLabel text="Special Requests" />
                                <textarea rows={3}
                                    className="mt-4 w-full bg-zinc-900/50 border border-zinc-800 px-4 py-3 text-white text-sm outline-none focus:border-[#9b815e] transition-colors resize-none placeholder:text-zinc-600"
                                    placeholder="Child seat, extra stop, accessibility needs..."
                                    value={form.notes}
                                    onChange={(e) => setField("notes", e.target.value)}
                                />
                            </div>

                            {/* Submit */}
                            <button type="submit" disabled={status.loading}
                                className="w-full bg-[#9b815e] hover:bg-white hover:text-black text-white py-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 disabled:opacity-40 shadow-lg shadow-[#9b815e]/20 flex items-center justify-center gap-3"
                            >
                                {status.loading ? "Processing..." : <><span>Confirm Reservation</span> <ArrowRight size={14} /></>}
                            </button>

                            <p className="text-center text-[10px] text-zinc-600 leading-relaxed">
                                No payment required now — we'll confirm availability and provide a quote.
                            </p>
                        </form>
                    </div>

                    {/* ── SIDEBAR ── */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-28 space-y-6">

                            {/* Summary */}
                            <div className="border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
                                <div className="h-0.5 bg-gradient-to-r from-transparent via-[#9b815e] to-transparent" />
                                <div className="p-6 border-b border-zinc-800/50">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="h-px w-3 bg-[#9b815e]" />
                                        <span className="text-[9px] uppercase tracking-[0.4em] text-[#9b815e] font-bold">Summary</span>
                                    </div>
                                    <h3 className="font-serif text-xl text-white">Your Booking</h3>
                                </div>

                                <div className="p-6 space-y-4">
                                    <SidebarRow label="Service" value={form.service_type} />
                                    <SidebarRow label="Date"
                                        value={form.pickup_datetime
                                            ? new Date(form.pickup_datetime).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
                                            : "—"
                                        }
                                    />
                                    <SidebarRow label="Passengers" value={`${form.passengers} pax`} />
                                    <SidebarRow label="Luggage" value={`${form.luggage} bags`} />

                                    {selectedVehicle && (
                                        <div className="pt-4 border-t border-zinc-800/50">
                                            <div className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 font-bold mb-3">Vehicle</div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-16 h-10 bg-zinc-800 overflow-hidden shrink-0">
                                                    <img src={selectedVehicle.image_url || ""} alt="" className="w-full h-full object-cover"
                                                        onError={(e) => { e.currentTarget.style.display = "none"; }} />
                                                </div>
                                                <span className="font-serif text-base text-[#9b815e]">{selectedVehicle.name}</span>
                                            </div>
                                        </div>
                                    )}

                                    {form.service_type === "Airport Transfer" && form.flight_number && (
                                        <div className="pt-4 border-t border-zinc-800/50">
                                            <div className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 font-bold mb-1">Flight</div>
                                            <div className="text-sm text-white">{form.flight_number}</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Included */}
                            <div className="border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm p-6">
                                <div className="text-[9px] uppercase tracking-[0.3em] text-[#9b815e] font-bold mb-5">
                                    What's Included
                                </div>
                                {[
                                    "Professional licensed chauffeur",
                                    "Fully insured ride",
                                    "Meet & greet service",
                                    "All taxes & tolls",
                                    "Complimentary water",
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 py-2">
                                        <div className="w-1 h-1 bg-[#9b815e]" />
                                        <span className="text-xs text-zinc-400">{item}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Help */}
                            <div className="relative overflow-hidden border border-[#9b815e]/30 bg-[#9b815e]/10 backdrop-blur-sm p-6 text-center">
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#9b815e]" />
                                <div className="text-[9px] uppercase tracking-[0.4em] text-[#9b815e]/70 font-bold mb-3">
                                    Need Help?
                                </div>
                                <a href="tel:+12487473474" className="font-serif text-xl text-white hover:text-[#9b815e] transition flex items-center justify-center gap-2">
                                    <Phone size={16} /> (248) 747-3474
                                </a>
                                <div className="mt-2">
                                    <a href="https://wa.me/12487473474" target="_blank" rel="noreferrer"
                                        className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-[#9b815e] transition">
                                        WhatsApp →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
            <Footer />
        </main>
    );
}

// ─── Components ────────────────────────────────────────────────────────────────

function GoldLabel({ text }) {
    return (
        <div className="flex items-center gap-3">
            <div className="h-px w-4 bg-[#9b815e]" />
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#9b815e]">
                {text}
            </span>
        </div>
    );
}

function DarkInput({ label, required, value, onChange, placeholder, type = "text" }) {
    return (
        <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                {label} {required && <span className="text-[#9b815e]">*</span>}
            </label>
            <input type={type} required={required} value={value}
                onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
                className="w-full bg-zinc-900/50 border border-zinc-800 px-4 py-3 text-white text-sm font-medium outline-none focus:border-[#9b815e] transition-colors placeholder:text-zinc-600"
            />
        </div>
    );
}

function DarkIconInput({ label, icon: Icon, required, value, onChange, placeholder, type = "text", min }) {
    return (
        <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                {label} {required && <span className="text-[#9b815e]">*</span>}
            </label>
            <div className="relative">
                <Icon size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                <input type={type} required={required} min={min} value={value}
                    onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
                    className="w-full bg-zinc-900/50 border border-zinc-800 pl-12 pr-4 py-3 text-white text-sm font-medium outline-none focus:border-[#9b815e] transition-colors placeholder:text-zinc-600"
                />
            </div>
        </div>
    );
}

function SidebarRow({ label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 pb-3 border-b border-zinc-800/50">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600 shrink-0">{label}</span>
            <span className="text-sm text-white text-right">{value}</span>
        </div>
    );
}

export default function BookPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-zinc-950" />}>
            <BookInner />
        </Suspense>
    );
}