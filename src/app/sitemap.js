import { serviceAreas } from "@/data/serviceAreas";

export default function sitemap() {
  const baseUrl = "https://www.metrodtwblackcars.com";
  const now = new Date();

  const staticPages = ["", "/book", "/services", "/privacy", "/terms"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/book" ? 0.9 : 0.7,
  }));

  const cityPages = serviceAreas.map(({ slug }) => ({
    url: `${baseUrl}/service-areas/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticPages, ...cityPages];
}
