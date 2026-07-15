export const serviceAreas = [
  ["Ann Arbor", "ann-arbor"],
  ["Auburn Hills", "auburn-hills"],
  ["Battle Creek", "battle-creek"],
  ["Birmingham", "birmingham"],
  ["Bloomfield Hills", "bloomfield-hills"],
  ["Canton", "canton"],
  ["Chelsea", "chelsea"],
  ["Chesterfield", "chesterfield"],
  ["Dearborn Heights", "dearborn-heights"],
  ["Detroit", "detroit"],
  ["Dexter", "dexter"],
  ["Farmington Hills", "farmington-hills"],
  ["Fenton", "fenton"],
  ["Ferndale", "ferndale"],
  ["Garden City", "garden-city"],
  ["Grosse Pointe Farms", "grosse-pointe-farms"],
  ["Inkster", "inkster"],
  ["Kalamazoo", "kalamazoo"],
  ["Lansing", "lansing"],
  ["Livonia", "livonia"],
  ["Mackinac Island", "mackinac-island"],
  ["Madison Heights", "madison-heights"],
  ["Mount Clemens", "mount-clemens"],
  ["Novi", "novi"],
  ["Port Huron", "port-huron"],
  ["Plymouth", "plymouth"],
  ["Redford", "redford"],
  ["Rochester Hills", "rochester-hills"],
  ["Royal Oak", "royal-oak"],
  ["Romulus", "romulus"],
  ["Saginaw", "saginaw"],
  ["Southfield", "southfield"],
  ["South Lyon", "south-lyon"],
  ["Taylor", "taylor"],
  ["Troy", "troy"],
  ["Utica", "utica"],
  ["Warren", "warren"],
  ["Waterford", "waterford"],
  ["Wayne", "wayne"],
  ["West Bloomfield", "west-bloomfield"],
  ["Westland", "westland"],
  ["Wixom", "wixom"],
  ["Wyandotte", "wyandotte"],
  ["Ypsilanti", "ypsilanti"],
].map(([name, slug]) => ({ name, slug }));

const specialCopy = {
  "mackinac-island": {
    qualifier: "Mackinac City or St. Ignace ferry terminals",
    intro:
      "Planning a Mackinac Island trip starts with dependable ground transportation. Metro DTW Black Cars provides private transfers between DTW Airport, Metro Detroit, and the Mackinac City or St. Ignace ferry terminals, where guests continue to the island by ferry.",
  },
  romulus: {
    qualifier: "DTW Airport and surrounding hotels",
    intro:
      "Located beside Detroit Metropolitan Wayne County Airport, Romulus is at the center of our airport transportation service. We provide private pickups from DTW terminals, nearby hotels, businesses, and residences with flight-aware scheduling and professional chauffeurs.",
  },
  detroit: {
    qualifier: "Downtown Detroit, neighborhoods, venues, and DTW",
    intro:
      "Metro DTW Black Cars provides private chauffeur transportation throughout Detroit, including Downtown, Midtown, New Center, major venues, hotels, offices, and direct service to Detroit Metropolitan Wayne County Airport.",
  },
  "ann-arbor": {
    qualifier: "University of Michigan, downtown, hotels, and DTW",
    intro:
      "Travel comfortably between Ann Arbor and DTW with private, prearranged black-car service. We serve University of Michigan travelers, residents, corporate guests, hotels, medical destinations, and groups throughout the Ann Arbor area.",
  },
};

export function getServiceArea(slug) {
  const area = serviceAreas.find((item) => item.slug === slug);
  if (!area) return null;

  const special = specialCopy[slug];
  return {
    ...area,
    qualifier: special?.qualifier || `${area.name}, Metro Detroit, and DTW Airport`,
    intro:
      special?.intro ||
      `Metro DTW Black Cars offers private airport and chauffeur transportation for passengers traveling to or from ${area.name}. Our service connects homes, hotels, offices, event venues, and surrounding communities with Detroit Metropolitan Wayne County Airport and destinations across Michigan.`,
  };
}
