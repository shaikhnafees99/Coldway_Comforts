import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const serviceSlugs = [
  "doorstep-ac-refrigerator-service",
  "commercial-ac-service",
  "refrigerator-repair",
  "old-ac-purchase",
  "scrap-ac-buying",
  "ac-installation",
  "ac-maintenance",
  "ac-gas-filling",
  "new-ac-sale",
  "ac-repair",
  "ac-service",
];
const newAreas = [
  { slug: "dadar", name: "Dadar", zone: "Central Mumbai", context: "apartments, offices, retail shops and busy mixed-use buildings" },
  { slug: "parel", name: "Parel", zone: "Central Mumbai", context: "residential towers, hospitals, clinics, offices and commercial properties" },
  { slug: "worli", name: "Worli", zone: "South Mumbai", context: "residential towers, offices, restaurants and large commercial properties" },
  { slug: "lower-parel", name: "Lower Parel", zone: "South-Central Mumbai", context: "corporate offices, restaurants, retail spaces and high-rise residences" },
  { slug: "girgaon", name: "Girgaon", zone: "South Mumbai", context: "heritage homes, apartments, retail shops and local commercial spaces" },
  { slug: "kalbadevi", name: "Kalbadevi", zone: "South Mumbai", context: "commercial markets, offices, wholesale shops and busy business spaces" },
  { slug: "mahalaxmi", name: "Mahalaxmi", zone: "South Mumbai", context: "residential complexes, offices, studios and commercial spaces" },
  { slug: "prabhadevi", name: "Prabhadevi", zone: "South Mumbai", context: "high-rise residences, corporate towers, temples and retail spaces" },
  { slug: "sewri", name: "Sewri", zone: "South Mumbai", context: "port area properties, commercial warehouses, offices and residences" },
  { slug: "sion", name: "Sion", zone: "Central Mumbai", context: "homes, clinics, educational spaces, shops and offices" },
  { slug: "wadala", name: "Wadala", zone: "Central Mumbai", context: "residential townships, educational hubs, offices and commercial units" },
  { slug: "chembur", name: "Chembur", zone: "Eastern Mumbai", context: "apartments, independent homes, offices, clinics and retail properties" },
  { slug: "kurla", name: "Kurla", zone: "Central Mumbai", context: "commercial complexes, malls, retail hubs, offices and dense housing" },
  { slug: "ghatkopar", name: "Ghatkopar", zone: "Eastern Mumbai", context: "malls, retail spaces, corporate offices and residential societies" },
  { slug: "vikhroli", name: "Vikhroli", zone: "Eastern Mumbai", context: "IT parks, corporate campuses, industrial parks and modern housing" },
  { slug: "kanjurmarg", name: "Kanjurmarg", zone: "Eastern Mumbai", context: "high-rise residential complexes, offices and local commercial spaces" },
  { slug: "bhandup", name: "Bhandup", zone: "Eastern Mumbai", context: "industrial units, residential societies, markets and retail shops" },
  { slug: "mulund", name: "Mulund", zone: "Eastern Mumbai", context: "residential townships, clinics, shopping centers and offices" },
  { slug: "govandi", name: "Govandi", zone: "Eastern Mumbai", context: "residential housing, local shops, commercial units and clinics" },
  { slug: "mankhurd", name: "Mankhurd", zone: "Eastern Mumbai", context: "residential societies, local markets and commercial establishments" },
  { slug: "trombay", name: "Trombay", zone: "Eastern Mumbai", context: "industrial facilities, institutional campuses and residential housing" },
  { slug: "chunabhatti", name: "Chunabhatti", zone: "Central Mumbai", context: "residential apartments, transport hubs, local shops and offices" },
  { slug: "tilak-nagar", name: "Tilak Nagar", zone: "Eastern Mumbai", context: "residential housing societies, markets and commercial units" },
  { slug: "vidyavihar", name: "Vidyavihar", zone: "Eastern Mumbai", context: "educational institutes, offices, residential societies and shops" },
  { slug: "bandra", name: "Bandra", zone: "Western Mumbai", context: "apartments, restaurants, boutiques, offices and customer-facing businesses" },
  { slug: "khar", name: "Khar", zone: "Western Mumbai", context: "luxury residences, boutiques, cafes and commercial establishments" },
  { slug: "santacruz", name: "Santacruz", zone: "Western Mumbai", context: "residences, hotel & hospitality units, offices and retail shops" },
  { slug: "vile-parle", name: "Vile Parle", zone: "Western Mumbai", context: "colleges, commercial centers, residential societies and clinics" },
  { slug: "juhu", name: "Juhu", zone: "Western Mumbai", context: "luxury homes, hotels, restaurants, studios and commercial spaces" },
  { slug: "andheri", name: "Andheri", zone: "Western Mumbai", context: "homes, offices, studios, restaurants, shops and large commercial spaces" },
  { slug: "jogeshwari", name: "Jogeshwari", zone: "Western Mumbai", context: "residential housing, industrial estates, retail markets and offices" },
  { slug: "goregaon", name: "Goregaon", zone: "Western Mumbai", context: "film studios, IT parks, corporate towers and residential complexes" },
  { slug: "malad", name: "Malad", zone: "Western Mumbai", context: "shopping malls, call centers, corporate parks and high-rise apartments" },
  { slug: "kandivali", name: "Kandivali", zone: "Western Mumbai", context: "industrial estates, residential complexes, clinics and retail hubs" },
  { slug: "borivali", name: "Borivali", zone: "Western Mumbai", context: "large residential townships, commercial centers and retail spaces" },
  { slug: "dahisar", name: "Dahisar", zone: "Western Mumbai", context: "residential societies, local markets, clinics and commercial shops" },
  { slug: "mira-road", name: "Mira Road", zone: "Western Suburbs", context: "dense residential societies, shopping complexes and commercial shops" },
  { slug: "bhayandar", name: "Bhayandar", zone: "Western Suburbs", context: "industrial units, residential complexes and commercial markets" },
  { slug: "bkc", name: "BKC", zone: "Central Business District", context: "multinational corporate towers, banks, consulate buildings and luxury dining" },
  { slug: "versova", name: "Versova", zone: "Western Mumbai", context: "coastal residences, cafes, production offices and retail spaces" },
  { slug: "vashi", name: "Vashi", zone: "Navi Mumbai", context: "apartments, offices, malls, shops, clinics and commercial buildings" },
  { slug: "nerul", name: "Nerul", zone: "Navi Mumbai", context: "residential societies, institutions, clinics, offices and retail spaces" },
  { slug: "airoli", name: "Airoli", zone: "Navi Mumbai", context: "technology offices, commercial campuses, apartments and local businesses" },
  { slug: "cbd-belapur", name: "CBD Belapur", zone: "Navi Mumbai", context: "government offices, corporate spaces, restaurants, shops and residences" },
  { slug: "kharghar", name: "Kharghar", zone: "Navi Mumbai", context: "residential societies, clinics, educational spaces, shops and offices" },
  { slug: "panvel", name: "Panvel", zone: "Navi Mumbai", context: "homes, housing societies, shops, clinics, offices and commercial properties" },
  { slug: "ghansoli", name: "Ghansoli", zone: "Navi Mumbai", context: "IT parks, corporate campuses, new residential towers and retail shops" },
  { slug: "koparkhairane", name: "Koparkhairane", zone: "Navi Mumbai", context: "residential complexes, commercial markets, offices and clinics" },
  { slug: "sanpada", name: "Sanpada", zone: "Navi Mumbai", context: "residential towers, commercial complexes, shops and office spaces" },
  { slug: "juinagar", name: "Juinagar", zone: "Navi Mumbai", context: "industrial estates, residential complexes, offices and local shops" },
  { slug: "seawoods", name: "Seawoods", zone: "Navi Mumbai", context: "grand transit malls, high-rise luxury towers and commercial hubs" },
  { slug: "kamothe", name: "Kamothe", zone: "Navi Mumbai", context: "residential townships, hospitals, schools, shops and commercial units" },
  { slug: "khandeshwar", name: "Khandeshwar", zone: "Navi Mumbai", context: "residential complexes, local markets and commercial establishments" },
  { slug: "ulwe", name: "Ulwe", zone: "Navi Mumbai", context: "fast-growing residential townships, commercial complexes and retail shops" },
  { slug: "mansarovar", name: "Mansarovar", zone: "Navi Mumbai", context: "residential societies, transit hubs, shops and local offices" },
  { slug: "dronagiri", name: "Dronagiri", zone: "Navi Mumbai", context: "port-adjacent logistics hubs, commercial spaces and residential towers" },
  { slug: "thane", name: "Thane", zone: "MMR Region", context: "corporate parks, luxury residential towers, malls, hospitals and offices" },
  { slug: "ghodbunder-road", name: "Ghodbunder Road", zone: "Thane Region", context: "modern high-rise townships, retail hubs, offices and commercial spaces" },
  { slug: "majiwada", name: "Majiwada", zone: "Thane Region", context: "residential towers, shopping malls, corporate parks and clinics" },
  { slug: "naupada", name: "Naupada", zone: "Thane Region", context: "commercial markets, educational institutes, offices and residences" },
  { slug: "kalwa", name: "Kalwa", zone: "Thane Region", context: "residential housing, industrial estates, shops and local offices" },
  { slug: "mumbra", name: "Mumbra", zone: "Thane Region", context: "dense residential societies, commercial markets and local shops" },
  { slug: "kalyan", name: "Kalyan", zone: "MMR Region", context: "commercial hubs, residential townships, clinics and shopping centers" },
  { slug: "dombivli", name: "Dombivli", zone: "MMR Region", context: "industrial complexes, residential societies, educational hubs and shops" },
  { slug: "badlapur", name: "Badlapur", zone: "MMR Region", context: "residential townships, industrial units, local markets and offices" },
  { slug: "ambarnath", name: "Ambarnath", zone: "MMR Region", context: "industrial plants, residential housing, markets and commercial units" },
];

function localize(template, area) {
  return template
    .replaceAll("churchgate", area.slug)
    .replaceAll("Churchgate", area.name);
}

const areaTemplate = readFileSync(path.join(root, "area", "churchgate.html"), "utf8");
for (const area of newAreas) {
  const profile = `<section class="section content-band local-area-profile"><div class="eyebrow">${area.zone} Service Route</div><h2>Cooling Service for ${area.name} Properties</h2><p class="sub">The ${area.name} service route supports ${area.context}. Share the building or society name, exact location, AC type, brand and cooling problem before the visit. Commercial customers can also share unit count, operating hours and access details for better AMC or breakdown planning.</p><div class="service-points"><div class="service-point"><b>Home Cooling</b>Split, window and inverter AC cleaning, repair, installation, leakage checks and gas-pressure diagnosis.</div><div class="service-point"><b>Commercial Cooling</b>Cassette, tower, ductable and central AC inspection for offices and customer-facing spaces.</div><div class="service-point"><b>Visit Planning</b>Building access, parking, service-lift rules and outdoor-unit access can be discussed before dispatch.</div><div class="service-point"><b>Clear Diagnosis</b>Cooling, airflow, drainage, electrical response and visible leakage signs are checked before major work.</div></div></section>`;
  let html = localize(areaTemplate, area);
  html = html.replace('<section class="section brand-mini content-band">', `${profile}<section class="section brand-mini content-band">`);
  writeFileSync(path.join(root, "area", `${area.slug}.html`), html);

  for (const serviceSlug of serviceSlugs) {
    const source = readFileSync(path.join(root, "local", `${serviceSlug}-churchgate.html`), "utf8");
    const localContext = `<section class="section content-band local-area-profile"><div class="eyebrow">${area.zone}</div><h2>${area.name} Service Visit Information</h2><p class="sub">This ${area.name} route serves ${area.context}. To arrange the correct technician visit, share the exact address, AC or refrigerator brand, equipment type, current problem and access details. Service timing depends on route availability and site access.</p></section>`;
    let localHtml = localize(source, area);
    localHtml = localHtml.replace('<section class="section brand-mini content-band">', `${localContext}<section class="section brand-mini content-band">`);
    writeFileSync(path.join(root, "local", `${serviceSlug}-${area.slug}.html`), localHtml);
  }
}

console.log(`Generated ${newAreas.length} genuine area pages and ${newAreas.length * serviceSlugs.length} local service pages.`);
