import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const baseUrl = "https://coldwaycomforts.com";
const areas = new Map([
  ["mazgaon", "Mazgaon"],
  ["darukhana", "Darukhana"],
  ["byculla", "Byculla"],
  ["colaba", "Colaba"],
  ["fort", "Fort"],
  ["tardeo", "Tardeo"],
  ["mumbai-central", "Mumbai Central"],
  ["marine-lines", "Marine Lines"],
  ["churchgate", "Churchgate"],
  ["nariman-point", "Nariman Point"],
  ["cuffe-parade", "Cuffe Parade"],
  ["grant-road", "Grant Road"],
  ["charni-road", "Charni Road"],
  ["dockyard-road", "Dockyard Road"],
  ["reay-road", "Reay Road"],
  ["nagpada", "Nagpada"],
]);
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

function updateIndexing(html, canonicalUrl, indexable) {
  const robots = indexable
    ? "index,follow,max-image-preview:large"
    : "noindex,follow,max-image-preview:large";

  return html
    .replace(/<link rel="canonical" href="[^"]+">/, `<link rel="canonical" href="${canonicalUrl}">`)
    .replace(/<meta name="robots" content="[^"]+">/, `<meta name="robots" content="${robots}">`);
}

function baseAreaFor(locationSlug) {
  if (areas.has(locationSlug)) return locationSlug;
  return [...areas.keys()]
    .sort((a, b) => b.length - a.length)
    .find((area) => locationSlug.endsWith(`-${area}`));
}

function areaLinks(relativePrefix = "") {
  return [...areas]
    .map(([slug, name]) => `<a class="pill" href="${relativePrefix}area/${slug}.html">${name}</a>`)
    .join("");
}

let indexableAreas = 0;
let consolidatedAreas = 0;
for (const filename of readdirSync(path.join(root, "area")).filter((name) => name.endsWith(".html"))) {
  const slug = path.basename(filename, ".html");
  const baseArea = baseAreaFor(slug);
  if (!baseArea) throw new Error(`Cannot map area page: ${filename}`);

  const file = path.join(root, "area", filename);
  const indexable = slug === baseArea;
  const canonical = `${baseUrl}/area/${baseArea}.html`;
  writeFileSync(file, updateIndexing(readFileSync(file, "utf8"), canonical, indexable));
  if (indexable) indexableAreas += 1;
  else consolidatedAreas += 1;
}

let indexableLocal = 0;
let consolidatedLocal = 0;
for (const filename of readdirSync(path.join(root, "local")).filter((name) => name.endsWith(".html"))) {
  const basename = path.basename(filename, ".html");
  const serviceSlug = serviceSlugs.find((slug) => basename.startsWith(`${slug}-`));
  if (!serviceSlug) throw new Error(`Cannot map local service page: ${filename}`);

  const locationSlug = basename.slice(serviceSlug.length + 1);
  const baseArea = baseAreaFor(locationSlug);
  if (!baseArea) throw new Error(`Cannot map local area: ${filename}`);

  const file = path.join(root, "local", filename);
  const indexable = locationSlug === baseArea;
  const canonical = `${baseUrl}/local/${serviceSlug}-${baseArea}.html`;
  writeFileSync(file, updateIndexing(readFileSync(file, "utf8"), canonical, indexable));
  if (indexable) indexableLocal += 1;
  else consolidatedLocal += 1;
}

const areasFile = path.join(root, "areas.html");
let areasHtml = readFileSync(areasFile, "utf8");
const areasTitle = "AC Service Areas in Mumbai | Coldway Comforts";
const areasDescription = "Doorstep AC repair, commercial AC maintenance and refrigerator service across 16 genuine South and Central Mumbai service areas.";
areasHtml = areasHtml.replace(
  /<div class="area-cloud">.*?<\/div>/,
  `<div class="area-cloud priority-areas">${areaLinks()}</div>`,
);
areasHtml = areasHtml
  .replace(/<div class="area-cloud all-areas">.*?<\/div>/, `<div class="area-cloud all-areas">${areaLinks()}</div>`)
  .replaceAll("AC Service Near Me Areas | Coldway Comforts", areasTitle)
  .replaceAll(
    "Find AC service near me across Mumbai and Navi Mumbai. Search 420 Coldway Comforts service areas for AC repair, commercial AC, cassette AC, tower AC, central AC and refrigerator service.",
    areasDescription,
  )
  .replace("<h1>Find AC Service Near Me in Mumbai &amp; Navi Mumbai</h1>", "<h1>AC Service Areas in South &amp; Central Mumbai</h1>")
  .replace("<div class=\"eyebrow\">Full Coverage</div>", "<div class=\"eyebrow\">Service Coverage</div>")
  .replace("<h2>All Active Service Areas</h2>", "<h2>Genuine Local Service Areas</h2>")
  .replace(
    "Coldway Comforts covers homes, offices, shops, clinics, restaurants, showrooms and commercial spaces across South Mumbai, Central Mumbai and nearby Navi Mumbai service routes. Use the area finder below to reach the right AC service near me page for AC repair, commercial AC maintenance, cassette AC, tower AC, central AC and refrigerator support.",
    "Coldway Comforts serves homes, offices, shops, clinics, restaurants, showrooms and commercial spaces across the listed South and Central Mumbai neighborhoods. Search a genuine area below for AC repair, commercial AC maintenance, cassette AC, tower AC, central AC and refrigerator support. For other Mumbai or Navi Mumbai routes, call with the exact location so availability can be confirmed.",
  )
  .replaceAll("<b>420</b>Area Pages Listed", "<b>16</b>Genuine Area Pages")
  .replaceAll("Showing 420 service areas", "Showing 16 service areas")
  .replace(
    "Find the nearest Coldway Comforts area page for AC service, AC repair, commercial AC work and refrigerator service in Mumbai and Navi Mumbai.",
    "Search the listed neighborhood pages for AC service, AC repair, commercial AC work and refrigerator service near your location.",
  )
  .replace("<h2>Area Pages Built for Local AC Service Search</h2>", "<h2>Useful Local Pages for Customers Near You</h2>")
  .replace(
    "Every area link leads to a dedicated AC service near me page with its own title, description, service schema, phone number and related service links. Search your area, then open the matching page for AC repair, commercial AC service, refrigerator service and other cooling support.",
    "Each neighborhood page keeps the phone numbers, available cooling services and related service links together. Choose the closest listed area, then open the relevant AC repair, commercial AC or refrigerator service page.",
  )
  .replaceAll("<b>420</b>service areas listed", "<b>16</b>genuine areas listed")
  .replaceAll("<b>5,051</b>local service pages", "<b>176</b>focused service pages")
  .replace("<h2>Browse Every Area</h2>", "<h2>Browse Service Areas</h2>")
  .replace(
    "These links now come directly from the live area pages in the website folder, so no generated area is left out.",
    "Choose the closest genuine neighborhood below. Each page provides local contact details and links to the cooling services available in that area.",
  );

const areasSchemaMatch = areasHtml.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
if (!areasSchemaMatch) throw new Error("Areas page JSON-LD was not found");
const areasSchema = JSON.parse(areasSchemaMatch[1]);
const areasWebPage = areasSchema["@graph"].find((node) => {
  const type = node["@type"];
  return type === "WebPage" || (Array.isArray(type) && type.includes("WebPage"));
});
areasWebPage.name = areasTitle;
areasWebPage.description = areasDescription;
areasHtml = areasHtml.replace(areasSchemaMatch[1], JSON.stringify(areasSchema));
writeFileSync(areasFile, areasHtml);

for (const serviceSlug of serviceSlugs) {
  const file = path.join(root, "service", `${serviceSlug}.html`);
  let html = readFileSync(file, "utf8");
  const links = [...areas]
    .map(([areaSlug, areaName]) => `<a class="pill" href="../local/${serviceSlug}-${areaSlug}.html">${areaName}</a>`)
    .join("");
  html = html.replace(/<div class="area-cloud">.*?<\/div>/, `<div class="area-cloud priority-areas">${links}</div>`);
  writeFileSync(file, html);
}

console.log(
  `Kept ${indexableAreas} area pages and ${indexableLocal} local service pages indexable; ` +
  `consolidated ${consolidatedAreas + consolidatedLocal} artificial variants.`,
);
