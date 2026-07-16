import "./globals.css";

export const metadata = {
  title: {
    default: "Metro DTW Black Cars | Luxury Chauffeur Service Detroit",
    template: "%s | Metro DTW Black Cars",
  },
  description: "Premium black car and chauffeur service in Metro Detroit. DTW airport transfers, corporate transportation, point-to-point and hourly service. Call (248) 747-3474.",
  metadataBase: new URL("https://www.metrodtwblackcars.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.metrodtwblackcars.com",
    siteName: "Metro DTW Black Cars",
    title: "Metro DTW Black Cars | Luxury Chauffeur Service Detroit",
    description: "Premium black car and chauffeur service for Detroit and DTW Airport.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Metro DTW Black Cars" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Metro DTW Black Cars",
    description: "Luxury chauffeur service for Detroit and DTW Airport.",
    images: ["/og-image.svg"],
  },
  robots: { index: true, follow: true },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "Metro DTW Black Cars",
  url: "https://www.metrodtwblackcars.com",
  telephone: "+17342732916",
  email: "bookings@metrodtwblackcars.com",
  address: { "@type": "PostalAddress", addressLocality: "Detroit", addressRegion: "MI", addressCountry: "US" },
  areaServed: ["Detroit", "Metro Detroit", "Detroit Metropolitan Wayne County Airport", "Ann Arbor", "Troy", "Birmingham"],
  serviceType: ["Airport Transfer", "Corporate Transportation", "Hourly Chauffeur", "Point to Point"],
  openingHours: "Mo-Su 00:00-24:00",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </head>
      <body className="font-sans antialiased selection:bg-[#9b815e] selection:text-white">{children}</body>
    </html>
  );
}
