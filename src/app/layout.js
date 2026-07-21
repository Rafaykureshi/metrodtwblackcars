import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { BUSINESS_NAME, EMAIL, PHONE_E164, SITE_URL, faqItems, serviceAreas } from "@/data/site";

export const viewport = { themeColor: "#09090b", colorScheme: "light" };

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Detroit Airport Car Service & Black Car Transportation", template: `%s | ${BUSINESS_NAME}` },
  description: "Professional Detroit black car and DTW airport transportation. Reserve private airport transfers, corporate travel, hourly chauffeur service, and luxury SUV rides across Metro Detroit.",
  applicationName: BUSINESS_NAME,
  authors: [{ name: BUSINESS_NAME, url: SITE_URL }],
  creator: BUSINESS_NAME,
  publisher: BUSINESS_NAME,
  category: "transportation",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_US", url: "/", siteName: BUSINESS_NAME, title: "Detroit Airport Car Service & Luxury Black Car Transportation", description: "Private DTW airport transfers, corporate travel, and professional chauffeur service across Metro Detroit.", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${BUSINESS_NAME} luxury chauffeur service` }] },
  twitter: { card: "summary_large_image", title: "Detroit Airport Car Service | Metro DTW Black Cars", description: "Professional black car and chauffeur transportation for Detroit and DTW Airport.", images: ["/og-image.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: [{ url: "/favicon.ico" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }], apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }] },
  manifest: "/manifest.webmanifest",
};

const businessSchema = {
  "@context": "https://schema.org", "@type": ["LocalBusiness", "TaxiService"], "@id": `${SITE_URL}/#business`, name: BUSINESS_NAME,
  url: SITE_URL, telephone: PHONE_E164, email: EMAIL, priceRange: "$$$", image: `${SITE_URL}/og-image.png`,
  description: "Professional black car, luxury SUV, airport transfer, and chauffeur transportation serving Detroit, DTW Airport, and Metro Detroit.",
  address: { "@type": "PostalAddress", addressLocality: "Detroit", addressRegion: "MI", addressCountry: "US" },
  areaServed: serviceAreas.map(({ name }) => ({ "@type": "City", name })),
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "00:00", closes: "23:59" }],
  sameAs: ["https://www.facebook.com/profile.php?id=61591945043773", "https://www.instagram.com/metrodtwblackcars"]
};
const websiteSchema = { "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: BUSINESS_NAME, publisher: { "@id": `${SITE_URL}/#business` }, inLanguage: "en-US" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };

export default function RootLayout({ children }) {
  return <html lang="en"><body className="font-sans antialiased text-zinc-950 selection:bg-[#9b815e] selection:text-white"><JsonLd data={businessSchema}/><JsonLd data={websiteSchema}/><JsonLd data={faqSchema}/>{children}</body></html>;
}
