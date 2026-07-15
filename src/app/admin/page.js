"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import {
    Car, Calendar, LogOut, Plus, Trash2,
    CheckCircle, XCircle, PhoneCall,
    Mail, StickyNote,
} from "lucide-react";

// ─── Status config ─────────────────────────────────────────────────────────────
const STATUS = {
    pending: { label: "Pending", bg: "bg-amber-50", border: "border-amber-400", text: "text-amber-700" },
    confirmed: { label: "Confirmed", bg: "bg-blue-50", border: "border-blue-400", text: "text-blue-700" },
    completed: { label: "Completed", bg: "bg-green-50", border: "border-green-500", text: "text-green-700" },
    cancelled: { label: "Cancelled", bg: "bg-red-50", border: "border-red-400", text: "text-red-700" },
};

function StatusBadge({ status }) {
    const s = STATUS[status] || STATUS.pending;
    return (
        <span className={`inline-block px-3 py-1 text-[10px] font-black uppercase tracking-widest border-2 ${s.bg} ${s.border} ${s.text}`}>
            {s.label}
        </span>
    );
}

// ─── Luxury button components ──────────────────────────────────────────────────
function LuxBtn({ onClick, color = "gold", size = "sm", icon: Icon, children, disabled }) {
    const colors = {
        gold: "bg-zinc-900 hover:bg-[#9b815e] text-white shadow-lg shadow-black/20",
        blue: "bg-zinc-900 hover:bg-blue-700 text-white shadow-lg shadow-black/20",
        green: "bg-zinc-900 hover:bg-emerald-700 text-white shadow-lg shadow-black/20",
        red: "border border-red-200 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500",
        ghost: "border border-zinc-200 text-zinc-500 hover:border-[#9b815e] hover:text-[#9b815e]",
    };
    const sizes = {
        sm: "px-3 py-2 text-[10px]",
        md: "px-5 py-2.5 text-[10px]",
        lg: "px-8 py-3.5 text-[10px]",
    };
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-center gap-2 font-black uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-40 ${colors[color]} ${sizes[size]}`}
        >
            {Icon && <Icon size={12} />}
            {children}
        </button>
    );
}

// ─── Main admin panel ──────────────────────────────────────────────────────────
export default function AdminPanel() {
    const [view, setView] = useState("bookings");
    const [bookings, setBookings] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchBookings = async () => {
        const { data, error } = await supabase
            .from("bookings")
            .select(`*, vehicles(name)`)
            .order("created_at", { ascending: false });
        if (error) console.error("fetchBookings error:", error.message);
        if (data) setBookings(data);
        setLoading(false);
    };

    const fetchVehicles = async () => {
        const { data, error } = await supabase
            .from("vehicles")
            .select("*")
            .order("sort_order");
        if (error) console.error("fetchVehicles error:", error.message);
        if (data) setVehicles(data);
    };

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) router.push("/admin/login");
            else { fetchBookings(); fetchVehicles(); }
        };
        checkUser();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    const counts = {
        pending: bookings.filter(b => b.status === "pending").length,
        confirmed: bookings.filter(b => b.status === "confirmed").length,
        completed: bookings.filter(b => b.status === "completed").length,
        cancelled: bookings.filter(b => b.status === "cancelled").length,
    };

    if (loading) return (
        <div className="flex items-center justify-center h-screen bg-zinc-950">
            <div className="text-center">
                <div className="text-2xl font-bold tracking-tighter text-white mb-2">
                    METRO <span className="text-[#9b815e]">ADMIN</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">
                    Loading Command Center...
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-zinc-100 text-black">

            {/* ── SIDEBAR ── */}
            <aside className="w-64 bg-zinc-950 text-white flex flex-col fixed h-full z-10 border-r border-white/5">

                {/* Logo */}
                <div className="px-6 py-8 border-b border-white/5">
                    <div className="text-xl font-bold tracking-tighter">
                        METRO <span className="text-[#9b815e]">ADMIN</span>
                    </div>
                    <div className="text-[9px] uppercase tracking-[0.4em] text-zinc-600 mt-1">
                        Command Center
                    </div>
                </div>

                {/* Status counts */}
                <div className="px-6 py-5 border-b border-white/5">
                    <div className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 mb-3 font-bold">
                        Overview
                    </div>
                    <div className="space-y-2">
                        {Object.entries(counts).map(([status, count]) => {
                            const s = STATUS[status];
                            return (
                                <div key={status} className="flex justify-between items-center">
                                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                                        {s.label}
                                    </span>
                                    <span className={`text-[10px] font-black px-2.5 py-0.5 ${count > 0 ? "bg-[#9b815e] text-white" : "bg-zinc-800 text-zinc-600"
                                        }`}>
                                        {count}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-4 py-5 space-y-1">
                    <button
                        onClick={() => setView("bookings")}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${view === "bookings"
                                ? "bg-[#9b815e] text-white shadow-lg shadow-[#9b815e]/20"
                                : "text-zinc-500 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <Calendar size={15} /> Reservations
                    </button>
                    <button
                        onClick={() => setView("fleet")}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${view === "fleet"
                                ? "bg-[#9b815e] text-white shadow-lg shadow-[#9b815e]/20"
                                : "text-zinc-500 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <Car size={15} /> Manage Fleet
                    </button>
                </nav>

                {/* Logout */}
                <div className="px-4 py-5 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-500/10 transition-all duration-300"
                    >
                        <LogOut size={15} /> Logout
                    </button>
                </div>
            </aside>

            {/* ── MAIN ── */}
            <main className="flex-1 ml-64 p-10">
                {view === "bookings" ? (
                    <ReservationsView bookings={bookings} onUpdate={fetchBookings} />
                ) : (
                    <FleetView vehicles={vehicles} onUpdate={fetchVehicles} />
                )}
            </main>
        </div>
    );
}

// ─── Reservations view ─────────────────────────────────────────────────────────
function ReservationsView({ bookings, onUpdate }) {
    const [filter, setFilter] = useState("all");
    const [noteOpen, setNoteOpen] = useState(null);
    const [noteText, setNoteText] = useState("");
    const [savingNote, setSavingNote] = useState(false);

    const updateStatus = async (id, status) => {
        const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
        if (error) console.error("updateStatus error:", error.message);
        else onUpdate();
    };

    const openNote = (booking) => {
        setNoteOpen(booking.id);
        setNoteText(booking.admin_notes || "");
    };

    const saveNote = async () => {
        if (!noteOpen) return;
        setSavingNote(true);
        const { error } = await supabase
            .from("bookings")
            .update({ admin_notes: noteText })
            .eq("id", noteOpen);
        setSavingNote(false);
        if (!error) { setNoteOpen(null); onUpdate(); }
    };

    const filtered = filter === "all"
        ? bookings
        : bookings.filter(b => b.status === filter);

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <h2 className="font-serif text-4xl font-bold text-zinc-950">Reservations</h2>
                    <p className="text-zinc-500 text-sm mt-1">
                        {bookings.length} total &nbsp;•&nbsp;
                        <span className="text-amber-600 font-bold">
                            {bookings.filter(b => b.status === "pending").length} pending
                        </span>
                    </p>
                </div>

                {/* Filter buttons */}
                <div className="flex flex-wrap gap-2">
                    {["all", "pending", "confirmed", "completed", "cancelled"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`relative px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${filter === f
                                    ? "bg-zinc-950 text-white shadow-lg shadow-black/20"
                                    : "bg-white text-zinc-400 border border-zinc-200 hover:border-zinc-900 hover:text-zinc-900"
                                }`}
                        >
                            {f === "all" ? "All" : STATUS[f]?.label}
                            {f !== "all" && (
                                <span className={`ml-2 text-[9px] px-1.5 py-0.5 font-black ${filter === f ? "bg-[#9b815e] text-white" : "bg-zinc-100 text-zinc-500"
                                    }`}>
                                    {bookings.filter(b => b.status === f).length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-zinc-200 shadow-xl overflow-x-auto">
                <table className="w-full text-left min-w-[960px]">
                    <thead className="bg-zinc-950 text-white">
                        <tr>
                            {["Customer", "Trip Details", "Route", "Status", "Actions"].map((h) => (
                                <th key={h} className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={5} className="py-20 text-center text-zinc-400 text-sm">
                                    No bookings found.
                                </td>
                            </tr>
                        )}

                        {filtered.map((b) => (
                            <tr key={b.id} className="hover:bg-zinc-50/80 transition-colors duration-200 group">

                                {/* Customer */}
                                <td className="px-5 py-4">
                                    <div className="font-bold text-zinc-950 text-sm tracking-tight">{b.full_name}</div>
                                    <a
                                        href={`tel:${b.phone}`}
                                        className="flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-[#9b815e] transition-colors mt-1.5"
                                    >
                                        <PhoneCall size={11} /> {b.phone}
                                    </a>
                                    {b.email && (
                                        <a
                                            href={`mailto:${b.email}`}
                                            className="flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-[#9b815e] transition-colors mt-0.5"
                                        >
                                            <Mail size={11} /> {b.email}
                                        </a>
                                    )}
                                    {b.admin_notes && (
                                        <div className="mt-2 text-[10px] text-[#9b815e] italic truncate max-w-[180px] flex items-center gap-1">
                                            <StickyNote size={10} /> {b.admin_notes}
                                        </div>
                                    )}
                                </td>

                                {/* Trip */}
                                <td className="px-5 py-4">
                                    <div className="font-bold text-zinc-950 text-sm">
                                        {new Date(b.pickup_datetime).toLocaleString("en-US", {
                                            month: "short", day: "numeric", year: "numeric",
                                            hour: "numeric", minute: "2-digit",
                                        })}
                                    </div>
                                    <div className="text-[#9b815e] font-black text-[11px] mt-1 uppercase tracking-wide">
                                        {b.vehicles?.name || "—"}
                                    </div>
                                    {b.service_type && (
                                        <div className="text-zinc-400 text-[10px] mt-0.5 uppercase tracking-widest">
                                            {b.service_type}
                                        </div>
                                    )}
                                    {b.passengers > 0 && (
                                        <div className="text-zinc-400 text-[10px] mt-0.5">
                                            {b.passengers} pax / {b.luggage} lug
                                        </div>
                                    )}
                                </td>

                                {/* Route */}
                                <td className="px-5 py-4">
                                    <div className="space-y-1.5 text-[11px]">
                                        <div>
                                            <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold block">From</span>
                                            <span className="text-zinc-950 font-bold">{b.pickup_address}</span>
                                        </div>
                                        <div>
                                            <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold block">To</span>
                                            <span className="text-zinc-950 font-bold">{b.dropoff_address}</span>
                                        </div>
                                        {b.flight_number && (
                                            <div className="text-zinc-500 text-[10px]">
                                                ✈️ {b.flight_number}
                                            </div>
                                        )}
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="px-5 py-4">
                                    <StatusBadge status={b.status} />
                                    <div className="text-[9px] text-zinc-400 mt-2 uppercase tracking-widest">
                                        {new Date(b.created_at).toLocaleDateString("en-US", {
                                            month: "short", day: "numeric",
                                        })}
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="px-5 py-4">
                                    <div className="flex flex-col gap-2 min-w-[110px]">

                                        {/* Confirm */}
                                        {b.status === "pending" && (
                                            <LuxBtn
                                                onClick={() => updateStatus(b.id, "confirmed")}
                                                color="blue"
                                                icon={CheckCircle}
                                            >
                                                Confirm
                                            </LuxBtn>
                                        )}

                                        {/* Complete */}
                                        {b.status === "confirmed" && (
                                            <LuxBtn
                                                onClick={() => updateStatus(b.id, "completed")}
                                                color="green"
                                                icon={CheckCircle}
                                            >
                                                Complete
                                            </LuxBtn>
                                        )}

                                        {/* Cancel */}
                                        {(b.status === "pending" || b.status === "confirmed") && (
                                            <LuxBtn
                                                onClick={() => updateStatus(b.id, "cancelled")}
                                                color="red"
                                                icon={XCircle}
                                            >
                                                Cancel
                                            </LuxBtn>
                                        )}

                                        {/* Note */}
                                        <LuxBtn
                                            onClick={() => openNote(b)}
                                            color="ghost"
                                            icon={StickyNote}
                                        >
                                            {b.admin_notes ? "Edit Note" : "Add Note"}
                                        </LuxBtn>

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Notes Modal */}
            {noteOpen && (
                <div className="fixed inset-0 bg-black/70 z-[200] flex items-center justify-center p-6 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md shadow-2xl">

                        <div className="bg-zinc-950 px-6 py-5">
                            <h3 className="font-serif text-xl text-white">Internal Note</h3>
                            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] mt-1">
                                Only visible in admin panel
                            </p>
                        </div>

                        <div className="p-6 space-y-4">
                            <textarea
                                rows={5}
                                className="w-full border border-zinc-200 px-4 py-3 text-zinc-950 outline-none focus:border-[#9b815e] resize-none text-sm transition-colors"
                                placeholder="e.g. Customer requested child seat. Assigned to driver Ahmed."
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                            />
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setNoteOpen(null)}
                                    className="flex-1 border border-zinc-200 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 transition-all duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={saveNote}
                                    disabled={savingNote}
                                    className="flex-1 bg-zinc-950 text-white py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#9b815e] disabled:opacity-40 transition-all duration-300 shadow-lg shadow-black/20"
                                >
                                    {savingNote ? "Saving..." : "Save Note"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Fleet view ────────────────────────────────────────────────────────────────
function FleetView({ vehicles, onUpdate }) {
    const FALLBACK_IMG = "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1400&auto=format&fit=crop";

    const [showAdd, setShowAdd] = useState(false);
    const [saving, setSaving] = useState(false);
    const [newCar, setNewCar] = useState({ name: "", passengers: 4, luggage: 4, image_url: "" });

    const addCar = async () => {
        if (!newCar.name.trim()) { alert("Please enter a vehicle name."); return; }
        setSaving(true);
        const payload = {
            name: newCar.name.trim(),
            image_url: newCar.image_url?.trim() || null,
            passengers: Number(newCar.passengers || 0),
            luggage: Number(newCar.luggage || 0),
            active: true,
            sort_order: 0,
        };
        const { error } = await supabase.from("vehicles").insert([payload]);
        setSaving(false);
        if (error) { alert("Failed to add vehicle: " + error.message); return; }
        setShowAdd(false);
        setNewCar({ name: "", passengers: 4, luggage: 4, image_url: "" });
        onUpdate();
    };

    const deleteCar = async (id) => {
        if (!confirm("Delete this vehicle?")) return;
        const { error } = await supabase.from("vehicles").delete().eq("id", id);
        if (error) { alert("Delete failed: " + error.message); return; }
        onUpdate();
    };

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="font-serif text-4xl font-bold text-zinc-950">Fleet Management</h2>
                    <p className="text-zinc-500 text-sm mt-1">
                        Manage vehicles that appear on the booking form.
                    </p>
                </div>

                {/* Add Vehicle Button — luxury */}
                <button
                    onClick={() => setShowAdd(true)}
                    className="group flex items-center gap-3 bg-zinc-950 text-white px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#9b815e] transition-all duration-300 shadow-lg shadow-black/20"
                >
                    <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                    Add Vehicle
                </button>
            </div>

            {/* Add Modal */}
            {showAdd && (
                <div className="fixed inset-0 bg-black/70 z-[200] flex items-center justify-center p-6 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md shadow-2xl">

                        <div className="bg-zinc-950 px-6 py-5">
                            <h3 className="font-serif text-2xl text-white">New Vehicle</h3>
                            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] mt-1">
                                Use a direct image URL
                            </p>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700 mb-2">
                                    Vehicle Name *
                                </label>
                                <input
                                    className="w-full border border-zinc-200 px-4 py-3 text-zinc-950 outline-none focus:border-[#9b815e] transition-colors"
                                    value={newCar.name}
                                    onChange={(e) => setNewCar((s) => ({ ...s, name: e.target.value }))}
                                    placeholder="e.g., Executive SUV"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700 mb-2">
                                    Image URL
                                </label>
                                <input
                                    className="w-full border border-zinc-200 px-4 py-3 text-zinc-950 outline-none focus:border-[#9b815e] transition-colors"
                                    value={newCar.image_url}
                                    onChange={(e) => setNewCar((s) => ({ ...s, image_url: e.target.value }))}
                                    placeholder="https://images.unsplash.com/..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {["passengers", "luggage"].map((field) => (
                                    <div key={field}>
                                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700 mb-2">
                                            {field}
                                        </label>
                                        <input
                                            type="number" min={0}
                                            className="w-full border border-zinc-200 px-4 py-3 text-zinc-950 outline-none focus:border-[#9b815e] transition-colors"
                                            value={newCar[field]}
                                            onChange={(e) => setNewCar((s) => ({ ...s, [field]: e.target.value }))}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Preview */}
                            <div className="border border-zinc-100 bg-zinc-50 p-4">
                                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-3">
                                    Preview
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-24 h-16 bg-zinc-200 overflow-hidden shrink-0">
                                        <img
                                            src={newCar.image_url || FALLBACK_IMG}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
                                        />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-zinc-950">
                                            {newCar.name || "Vehicle name"}
                                        </div>
                                        <div className="text-[10px] text-zinc-400 mt-1 uppercase tracking-widest">
                                            {newCar.passengers} pax • {newCar.luggage} lug
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-1">
                                <button
                                    onClick={() => setShowAdd(false)}
                                    disabled={saving}
                                    className="flex-1 border border-zinc-200 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 transition-all duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={addCar}
                                    disabled={saving}
                                    className="flex-1 bg-zinc-950 text-white py-3.5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#9b815e] disabled:opacity-40 transition-all duration-300 shadow-lg shadow-black/20"
                                >
                                    {saving ? "Saving..." : "Save Vehicle"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Vehicle grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {vehicles.map((v) => (
                    <div
                        key={v.id}
                        className="bg-white border border-zinc-200 shadow-sm overflow-hidden group hover:shadow-xl hover:border-zinc-300 transition-all duration-300"
                    >
                        <div className="h-48 bg-zinc-100 overflow-hidden">
                            <img
                                src={v.image_url || FALLBACK_IMG}
                                alt={v.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                                onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
                            />
                        </div>

                        <div className="p-5 border-t border-zinc-100">
                            <div className="font-serif text-xl text-zinc-950">{v.name}</div>
                            <div className="mt-1 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                {v.passengers || 0} Passengers • {v.luggage || 0} Luggage
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 ${v.active
                                        ? "bg-green-50 text-green-700 border border-green-200"
                                        : "bg-zinc-100 text-zinc-500 border border-zinc-200"
                                    }`}>
                                    {v.active ? "Active" : "Inactive"}
                                </span>

                                <button
                                    onClick={() => deleteCar(v.id)}
                                    className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-300 border border-zinc-200 px-3 py-1.5 hover:text-red-500 hover:border-red-300 hover:bg-red-50 transition-all duration-300"
                                >
                                    <Trash2 size={11} /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {vehicles.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                        <div className="text-zinc-400 text-sm mb-4">No vehicles yet.</div>
                        <div className="text-[10px] uppercase tracking-widest text-zinc-300">
                            Click Add Vehicle to get started
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}