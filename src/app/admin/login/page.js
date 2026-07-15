"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setError("Invalid login details");
        else router.push("/admin");
    };

    return (
        <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-6">
            <form onSubmit={handleLogin} className="bg-white p-10 shadow-2xl w-full max-w-md border-t-4 border-[#9b815e]">
                <h1 className="font-serif text-3xl mb-2 text-black">Admin Portal</h1>
                <p className="text-zinc-500 text-sm mb-8 uppercase tracking-widest">Metro Share Logistics</p>

                {error && <p className="bg-red-50 text-red-600 p-3 mb-6 text-xs font-bold">{error}</p>}

                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Email Address</label>
                        <input type="email" required className="w-full border-b-2 border-zinc-200 py-3 outline-none focus:border-black transition-colors" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Password</label>
                        <input type="password" required className="w-full border-b-2 border-zinc-200 py-3 outline-none focus:border-black transition-colors" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-[#9b815e] transition">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
}