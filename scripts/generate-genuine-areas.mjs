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
  { slug: "sion", name: "Sion", zone: "Central Mumbai", context: "homes, clinics, educational spaces, shops and offices" },
  { slug: "chembur", name: "Chembur", zone: "Eastern Mumbai", context: "apartments, independent homes, offices, clinics and retail properties" },
  { slug: "bandra", name: "Bandra", zone: "Western Mumbai", context: "apartments, restaurants, boutiques, offices and customer-facing businesses" },
  { slug: "andheri", name: "Andheri", zone: "Western Mumbai", context: "homes, offices, studios, restaurants, shops and large commercial spaces" },
  { slug: "vashi", name: "Vashi", zone: "Navi Mumbai", context: "apartments, offices, malls, shops, clinics and commercial buildings" },
  { slug: "nerul", name: "Nerul", zone: "Navi Mumbai", context: "residential societies, institutions, clinics, offices and retail spaces" },
  { slug: "airoli", name: "Airoli", zone: "Navi Mumbai", context: "technology offices, commercial campuses, apartments and local businesses" },
  { slug: "cbd-belapur", name: "CBD Belapur", zone: "Navi Mumbai", context: "government offices, corporate spaces, restaurants, shops and residences" },
  { slug: "kharghar", name: "Kharghar", zone: "Navi Mumbai", context: "residential societies, clinics, educational spaces, shops and offices" },
  { slug: "panvel", name: "Panvel", zone: "Navi Mumbai", context: "homes, housing societies, shops, clinics, offices and commercial properties" },
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
