import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
    return (
        <main className="bg-[#f8f5f0] min-h-screen">
            <Navbar />

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-5xl mx-auto bg-white shadow-xl border border-zinc-200 p-10 md:p-16">

                    <h1 className="font-serif text-4xl md:text-5xl text-zinc-950 mb-6">
                        Terms & Conditions
                    </h1>

                    <div className="h-px w-16 bg-[#9b815e] mb-10" />

                    <div className="space-y-10 text-zinc-700 leading-relaxed text-sm md:text-base">

                        {/* Airport Pickup */}
                        <div>
                            <h2 className="font-semibold text-lg text-zinc-900 mb-3">
                                Airport Pickup Information
                            </h2>
                            <p>
                                For pickups from the DTW Metro Detroit Airport, the driver and
                                Metro DTW Black Cars will be tracking the flight. The driver will
                                meet the passenger at the baggage claim and will be holding a
                                name sign. The driver will also contact the passenger using the
                                phone number given in the reservation, so it is the customer's
                                responsibility to turn on their cell phone as soon as they land.
                                If there is any difficulty locating the driver, please call us
                                for further assistance.
                            </p>
                        </div>

                        {/* Address Pickup */}
                        <div>
                            <h2 className="font-semibold text-lg text-zinc-900 mb-3">
                                Address Pickup Information
                            </h2>
                            <p>
                                For pickups from a house address to the DTW Metro Airport or to
                                another address using our Black Car Service, the driver will
                                contact the passenger using the number provided 30 minutes before
                                the scheduled pickup time and will arrive 10 minutes early.
                                It is the passenger's responsibility to keep their phone on and
                                monitor for any messages and phone calls from the driver.
                            </p>
                        </div>

                        {/* Payments & Cancellations */}
                        <div>
                            <h2 className="font-semibold text-lg text-zinc-900 mb-3">
                                Payments & Cancellations
                            </h2>

                            <p className="mb-4">
                                All charges are non-refundable unless cancelled in a timely manner
                                according to our policies below or at Metro DTW Black Cars'
                                discretion.
                            </p>

                            <p>
                                Cancellation made 12 or more hours before the scheduled pickup time
                                are without penalty. A cancellation made 3 to 12 hours before a
                                scheduled pickup time are subject to a $25.00 cancellation fee.
                                A cancellation made less than 3 hours or after scheduled pickup
                                time is subject to a full fare and gratuity charges.
                            </p>

                            <p className="mt-4">
                                All DTW Detroit Metro Airport pickups have a mandatory $10.00 fee
                                imposed by the DTW Metro Airport.
                            </p>

                            <p className="mt-4">
                                For all prepaid pickups, 20% gratuity is automatically added unless
                                otherwise specified by the client.
                            </p>

                            <p className="mt-4">
                                If you cannot locate your driver or are having trouble contacting
                                the driver, do not leave baggage claim without first contacting
                                Metro DTW Black Cars. Leaving without contact is subject to the
                                full fare charge in addition to the $10 Airport Fee.
                            </p>

                            <p className="mt-4">
                                If over 3 passengers and 3 full luggage bags, an automatic charge
                                of $30.00 will be added.
                            </p>

                            <p className="mt-4">
                                Hourly Service Rates: $99.99/hour (3-hour minimum required).
                            </p>

                            <p>
                                Waiting Charges: $1/minute after 15-minute grace period.
                            </p>

                            <p>
                                Car Seat: $20 per seat.
                            </p>
                        </div>

                        {/* Liabilities */}
                        <div>
                            <h2 className="font-semibold text-lg text-zinc-900 mb-3">
                                Liabilities
                            </h2>

                            <p>
                                Metro DTW Black Cars is not liable in the event of mechanical
                                breakdown while en route.
                            </p>

                            <p className="mt-4">
                                We are not responsible for delays caused by natural hazards,
                                traffic, accidents, or any event beyond our control.
                            </p>

                            <p className="mt-4">
                                Clients assume full financial liability for any damage caused
                                during use of the vehicle. A $200.00 damage fee applies.
                                A sanitation fee of $250.00 may be charged at the driver's discretion.
                            </p>

                            <p className="mt-4">
                                Smoking, vaping, alcohol consumption, and drug use are prohibited.
                                Violations may result in immediate termination without refund.
                            </p>

                            <p className="mt-4">
                                Vehicles cannot be loaded beyond seating capacity.
                            </p>

                            <p className="mt-4">
                                Terms and conditions are subject to change.
                            </p>
                        </div>

                        {/* Reservation Agreement */}
                        <div>
                            <h2 className="font-semibold text-lg text-zinc-900 mb-3">
                                Reservation Agreement
                            </h2>
                            <p>
                                By accessing this website and/or making a reservation, whether
                                online or in person, you acknowledge and agree to the terms and
                                conditions written above.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}