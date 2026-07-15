import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function ServicesPage() {
    return (
        <main className="bg-[#f8f5f0] min-h-screen">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-16 text-center px-6">
                <h1 className="font-serif text-5xl text-zinc-950">Our Services</h1>
                <div className="mx-auto mt-6 h-px w-16 bg-[#9b815e]" />
            </section>

            {/* Intro Section */}
            <section className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <p className="text-zinc-700 leading-relaxed text-lg">
                        At <strong>Metro DTW Black Cars</strong>, we take care of your trips
                        transportation to and from the Metro Airport using our premium Black Cars
                        which are set aside and used only for Metro Airport Car Services.
                        In addition to our car service to and from the Metro Detroit Airport
                        24 hours a day, we also provide local address-to-address transportation
                        and hourly services around the Detroit Metro area.
                    </p>

                    <p className="mt-6 text-zinc-700 leading-relaxed text-lg">
                        Our drivers are highly experienced and have been serving clients
                        throughout Metro Detroit for years. Whether you are heading home from
                        the airport, attending a corporate event, enjoying a night out,
                        or planning a special occasion, we provide the luxury and reliability
                        you expect from a professional black car service.
                    </p>
                </div>

                <img
                    src="https://images.unsplash.com/photo-1474302770737-173ee21bab63?q=80&w=1600&auto=format&fit=crop"
                    alt="Detroit Airport"
                    className="w-full h-[350px] object-cover shadow-xl"
                />
            </section>

            {/* Service Cards */}
            <section className="bg-white py-20">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">

                    <div>
                        <h3 className="font-serif text-3xl mb-4">
                            Airport Pick‑Up / Drop‑Off
                        </h3>
                        <p className="text-zinc-600 mb-6">
                            Metro Airport Car Service using luxury black cars 24 hours a day.
                        </p>
                        <Link
                            href="/book"
                            className="bg-black text-white px-8 py-3 text-xs font-black uppercase tracking-widest hover:bg-[#9b815e] transition"
                        >
                            Book Now
                        </Link>
                    </div>

                    <div>
                        <h3 className="font-serif text-3xl mb-4">
                            Hourly Service
                        </h3>
                        <p className="text-zinc-600 mb-6">
                            Hourly service for special events, corporate travel,
                            and nights out with friends and family.
                        </p>
                        <Link
                            href="/book"
                            className="bg-black text-white px-8 py-3 text-xs font-black uppercase tracking-widest hover:bg-[#9b815e] transition"
                        >
                            Book Now
                        </Link>
                    </div>

                    <div>
                        <h3 className="font-serif text-3xl mb-4">
                            Point‑to‑Point
                        </h3>
                        <p className="text-zinc-600 mb-6">
                            Local point‑to‑point car service anywhere in the Metro Detroit area.
                        </p>
                        <Link
                            href="/book"
                            className="bg-black text-white px-8 py-3 text-xs font-black uppercase tracking-widest hover:bg-[#9b815e] transition"
                        >
                            Book Now
                        </Link>
                    </div>

                </div>
            </section>

            {/* The Process */}
            <section className="py-24 px-6 max-w-5xl mx-auto">
                <h2 className="font-serif text-4xl text-center text-zinc-950 mb-16">
                    The Process
                </h2>

                <div className="space-y-12">
                    <div>
                        <h3 className="font-bold text-xl mb-3">Reserve Your Car!</h3>
                        <p className="text-zinc-700 leading-relaxed">
                            Reserve your ride online or by phone. Our simple and easy reservation
                            system ensures quick booking and confirmation.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-xl mb-3">Receive Your Confirmation Number!</h3>
                        <p className="text-zinc-700 leading-relaxed">
                            Once booked, you will receive a confirmation number.
                            You can manage changes online or by phone with our dispatch team.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-xl mb-3">Enjoy Your Ride!</h3>
                        <p className="text-zinc-700 leading-relaxed">
                            Sit back and relax while our professional chauffeur ensures
                            a safe, smooth, and luxury ride to your destination.
                        </p>
                    </div>
                </div>
            </section>

            {/* Detailed Service Description */}
            <section className="bg-white py-24 px-6">
                <div className="max-w-5xl mx-auto">

                    <h2 className="font-serif text-4xl text-center mb-8 text-zinc-950">
                        Detroit Luxury Black Car Service
                    </h2>

                    <p className="text-zinc-700 leading-relaxed mb-8">
                        <strong>Metro DTW Black Cars</strong> proudly provides premium Detroit
                        Airport transportation, luxury black car service, corporate chauffeur
                        services, and executive travel throughout Metro Detroit and Southeast Michigan.
                    </p>

                    <p className="text-zinc-700 leading-relaxed mb-8">
                        Whether you need airport pickup, executive transportation,
                        DTW Airport transfers, luxury limousine service, or private
                        driver service, our professional chauffeurs deliver comfort,
                        reliability, and excellence.
                    </p>

                    <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                        <li>Detroit Black Car Service</li>
                        <li>DTW Airport Transportation</li>
                        <li>Luxury SUV Airport Service</li>
                        <li>Corporate Executive Service</li>
                        <li>Wedding Limousine Service</li>
                        <li>Hotel Transportation</li>
                        <li>Downtown Detroit Chauffeur Service</li>
                        <li>Premium Black Car Service Detroit</li>
                    </ul>

                    <p className="mt-10 text-zinc-700 leading-relaxed">
                        Since our founding, Metro DTW Black Cars has delivered reliable,
                        luxury airport transportation and professional chauffeur services
                        across Metro Detroit and Southeast Michigan.
                    </p>

                </div>
            </section>
            <Footer />
        </main>
    );
}