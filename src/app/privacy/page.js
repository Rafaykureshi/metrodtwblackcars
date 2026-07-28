import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
    return (
        <main className="bg-[#f8f5f0] min-h-screen">
            <Navbar />

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto bg-white shadow-xl border border-zinc-200 p-10 md:p-16">

                    <h1 className="font-serif text-4xl md:text-5xl text-zinc-950 mb-6">
                        Privacy Policy
                    </h1>

                    <div className="h-px w-16 bg-[#9b815e] mb-10" />

                    <div className="space-y-8 text-zinc-700 leading-relaxed text-sm md:text-base">

                        {/* Section 1 */}
                        <div>
                            <h2 className="font-semibold text-lg text-zinc-900 mb-3">
                                1. Information We Collect
                            </h2>

                            <p className="mb-4">
                                We collect the following types of information:
                            </p>

                            <h3 className="font-semibold text-zinc-900 mb-2">
                                1.1 Personal Information
                            </h3>

                            <ul className="list-disc pl-6 space-y-1 mb-6">
                                <li>Name</li>
                                <li>Email address</li>
                                <li>Phone number</li>
                                <li>Payment information (collected securely for billing purposes)</li>
                                <li>Pick-up and drop-off locations</li>
                            </ul>

                            <h3 className="font-semibold text-zinc-900 mb-2">
                                1.2 Non-Personal Information
                            </h3>

                            <ul className="list-disc pl-6 space-y-1">
                                <li>Browser type and version</li>
                                <li>IP address</li>
                                <li>Device type</li>
                                <li>Cookies and usage data</li>
                            </ul>
                        </div>

                        {/* Section 2 */}
                        <div>
                            <h2 className="font-semibold text-lg text-zinc-900 mb-3">
                                2. How We Use Your Information
                            </h2>

                            <p className="mb-4">
                                We use your information to:
                            </p>

                            <ul className="list-disc pl-6 space-y-1">
                                <li>Provide, maintain, and improve our services</li>
                                <li>Process bookings and payments</li>
                                <li>Communicate updates, confirmations, or changes to your reservations</li>
                                <li>Respond to customer service inquiries</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </div>

                        {/* Section 3 */}
                        <div>
                            <h2 className="font-semibold text-lg text-zinc-900 mb-3">
                                3. How We Protect Your Information
                            </h2>

                            <p className="mb-4">
                                We take the following measures to ensure your information is safe:
                            </p>

                            <ul className="list-disc pl-6 space-y-1">
                                <li>Secure data encryption for online transactions</li>
                                <li>Limited access to personal information by authorized personnel only</li>
                                <li>Regularly updated security protocols to protect against breaches</li>
                                <li>No sharing of personal information with third parties without your consent</li>
                            </ul>
                        </div>

                        {/* Section 4 */}
                        <div>
                            <h2 className="font-semibold text-lg text-zinc-900 mb-3">
                                4. Sharing Your Information
                            </h2>

                            <p className="mb-4">
                                We do not sell, trade, or rent your personal information. However, we may share your information:
                            </p>

                            <ul className="list-disc pl-6 space-y-1">
                                <li>With trusted service providers (e.g., payment processors) to facilitate services</li>
                                <li>As required by law or to comply with legal obligations</li>
                            </ul>
                        </div>

                        {/* Section 5 */}
                        <div>
                            <h2 className="font-semibold text-lg text-zinc-900 mb-3">
                                5. Your Rights
                            </h2>

                            <p className="mb-4">
                                You have the right to:
                            </p>

                            <ul className="list-disc pl-6 space-y-1 mb-4">
                                <li>Access, update, or delete your personal information</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Request a copy of your data</li>
                            </ul>

                            <p>
                                To exercise your rights, please contact us at book@metrodtwblackcars.com or +1 (248) 747-3474.
                            </p>
                        </div>

                        {/* Section 6 */}
                        <div>
                            <h2 className="font-semibold text-lg text-zinc-900 mb-3">
                                6. Cookies and Tracking
                            </h2>

                            <p>
                                We use cookies to improve your experience on our website. You can disable cookies through your browser settings; however, some features may not function properly.
                            </p>
                        </div>

                        {/* Section 7 */}
                        <div>
                            <h2 className="font-semibold text-lg text-zinc-900 mb-3">
                                7. Changes to This Policy
                            </h2>

                            <p>
                                We reserve the right to update this Privacy Policy at any time. Changes will be posted on our website with the updated date.
                            </p>
                        </div>

                        {/* Section 8 */}
                        <div>
                            <h2 className="font-semibold text-lg text-zinc-900 mb-3">
                                8. Contact Us
                            </h2>

                            <p>
                                Email: book@metrodtwblackcars.com <br />
                                Phone: 734-673-1031
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}