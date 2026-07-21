import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const baseUrl = "https://coldwaycomforts.com";
const pageUrl = `${baseUrl}/request-service.html`;
const home = readFileSync(path.join(root, "index.html"), "utf8");
const schemaMatch = home.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
if (!schemaMatch) throw new Error("Homepage JSON-LD was not found");
const homeGraph = JSON.parse(schemaMatch[1])["@graph"];
const business = homeGraph.find((node) => Array.isArray(node["@type"]) && node["@type"].includes("LocalBusiness"));
const website = homeGraph.find((node) => node["@type"] === "WebSite");

const title = "Request AC Service in Mumbai | Coldway Comforts";
const description = "Request AC repair, HVAC AMC, commercial AC or refrigerator service in Mumbai. Send your area, equipment and problem directly to Coldway Comforts on WhatsApp.";
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    business,
    website,
    {
      "@type": "ContactPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      isPartOf: { "@id": `${baseUrl}/#website` },
      about: { "@id": `${baseUrl}/#business` },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
        { "@type": "ListItem", position: 2, name: "Request Service", item: pageUrl },
      ],
    },
  ],
};

const form = `<form class="quote-form" onsubmit="sendServiceRequest(event)"><div class="quote-field"><label for="requestName">Name</label><input id="requestName" name="name" autocomplete="name" required></div><div class="quote-field"><label for="requestPhone">Phone number</label><input id="requestPhone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required></div><div class="quote-field"><label for="requestArea">Area / locality</label><input id="requestArea" name="area" autocomplete="address-level2" required></div><div class="quote-field"><label for="requestService">Service required</label><select id="requestService" name="service" required><option value="">Select service</option><option>AC service or repair</option><option>Commercial AC / HVAC AMC</option><option>Cassette AC service</option><option>Tower AC service</option><option>Central or ductable AC</option><option>VRF / VRV support</option><option>AC installation</option><option>AC gas and leak check</option><option>Refrigerator service</option><option>Old or scrap AC pickup</option></select></div><div class="quote-field"><label for="requestProperty">Property type</label><select id="requestProperty" name="property" required><option value="">Select property</option><option>Home / apartment</option><option>Office</option><option>Shop / showroom</option><option>Restaurant</option><option>Clinic / hospital</option><option>Society / building</option><option>Industrial / warehouse</option><option>Other commercial space</option></select></div><div class="quote-field"><label for="requestUnits">Number of units</label><input id="requestUnits" name="units" type="number" inputmode="numeric" min="1" max="1000" value="1"></div><div class="quote-field full"><label for="requestMessage">Equipment and problem</label><textarea id="requestMessage" name="message" placeholder="Brand, AC type, cooling problem, error code, access details or preferred visit time"></textarea></div><div class="quote-submit"><button class="btn primary" type="submit">Send Request on WhatsApp</button></div><p class="quote-note full">Submitting opens WhatsApp with these details. This website does not store the form information.</p></form>`;

const html = `<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="${pageUrl}"><link rel="stylesheet" href="assets/style.css"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest"><meta name="theme-color" content="#0497a7"><meta property="og:type" content="website"><meta property="og:site_name" content="Coldway Comforts"><meta property="og:url" content="${pageUrl}"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:image" content="${baseUrl}/assets/brand/coldway-comforts-social.png"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><meta name="twitter:image" content="${baseUrl}/assets/brand/coldway-comforts-social.png"><script type="application/ld+json">${JSON.stringify(schema)}</script></head><body><div class="top-call"><span class="top-call-label">Call Now:</span><a href="tel:+919819213075">+91 98192 13075</a><a href="tel:+919653465441">+91 96534 65441</a><span class="top-call-text">AC &amp; Refrigerator Doorstep Service</span></div><nav class="nav"><a class="brand" href="/"><img src="assets/brand/coldway-comforts-wordmark.png" alt="Coldway Comforts logo"></a><div class="menu"><a href="services.html">Services</a><a href="areas.html">Areas</a><a href="about.html">About</a><a href="contact.html">Contact</a></div></nav><main><section class="section"><div class="breadcrumb">Home / Request Service</div><div class="quote-band"><div><div class="eyebrow">Fast Service Request</div><h1>Request AC or HVAC Service</h1><p class="lead">Tell us where the equipment is, what type of system you have and what problem you are experiencing. Your request opens directly in WhatsApp so the Coldway Comforts team can review it and confirm the next available visit.</p><div class="service-points"><div class="service-point"><b>Home AC Service</b>Split, window and inverter AC repair, cleaning, installation and leakage checks.</div><div class="service-point"><b>Commercial Cooling</b>HVAC AMC, cassette, tower, central, ductable, multi-split and VRF/VRV enquiries.</div><div class="service-point"><b>Better Visit Planning</b>Unit count, brand, error code and access details help arrange the right inspection.</div></div></div><div class="card">${form}</div></div></section><section class="section content-band"><div class="eyebrow">Before Booking</div><h2>Information That Helps Us Respond</h2><div class="service-points"><div class="service-point"><b>Equipment</b>Share the AC type, brand, model or capacity when available.</div><div class="service-point"><b>Symptoms</b>Mention no cooling, water leakage, noise, tripping, error code or any previous repair.</div><div class="service-point"><b>Location</b>Provide the area, building name and access restrictions for indoor or outdoor units.</div><div class="service-point"><b>Commercial Sites</b>Add unit count, operating hours and the best time for a site inspection.</div></div></section></main><div class="fixed-actions"><a class="call" href="tel:+919819213075">Call Now</a><button onclick="openWhatsApp()">WhatsApp</button><button onclick="saveContact()">Save Contact</button></div><div id="waModal" class="modal"><div class="modal-card"><button class="close" onclick="closeWhatsApp()">x</button><h3>Select WhatsApp Number</h3><p>Choose a number to start a service conversation.</p><a target="_blank" href="https://wa.me/919819213075?text=Hello%20Coldway%20Comforts,%20I%20need%20service%20support">WhatsApp +91 98192 13075</a><a target="_blank" href="https://wa.me/919653465441?text=Hello%20Coldway%20Comforts,%20I%20need%20service%20support">WhatsApp +91 96534 65441</a></div></div><footer class="footer"><div class="footgrid"><div><h3>Coldway Comforts</h3><p>AC service, commercial HVAC maintenance and refrigerator support across Mumbai and Navi Mumbai.</p><p><b>Address:</b> Unit No. 60, Plot No. 7, New Tank, Bandar Road, Darukhana, Mazgaon, Mumbai - 400 010</p></div><div><h4>Contact</h4><p>+91 98192 13075<br>+91 96534 65441<br>ccoldwaycomforts@gmail.com</p></div><div><h4>Quick Links</h4><p><a href="services.html">Services</a><br><a href="areas.html">Service Areas</a></p></div></div></footer><script src="assets/script.js"></script></body></html>`;

writeFileSync(
  path.join(root, "request-service.html"),
  html.replace('src="assets/script.js"', 'src="assets/script.js?v=20260721"'),
);

const bookingSection = `<section id="request-service" class="section content-band"><div class="quote-band"><div><div class="eyebrow">Request a Callback</div><h2>Send Your AC or HVAC Requirement</h2><p class="sub">Share your area, equipment type, unit count and cooling problem in one structured WhatsApp request. This is especially useful for commercial AMC and multi-unit sites.</p></div><div class="card"><h3>Plan the Right Service Visit</h3><p>Include the brand, AC type, error code, building access and preferred visit time.</p><div class="cta"><a class="btn primary" href="request-service.html">Request Service</a><a class="btn secondary" href="tel:+919819213075">Call Now</a></div></div></div></section>`;

for (const filename of ["index.html", "services.html"]) {
  const file = path.join(root, filename);
  let page = readFileSync(file, "utf8");
  if (/<section id="request-service"/.test(page)) page = page.replace(/<section id="request-service".*?<\/section>/s, bookingSection);
  else page = page.replace('<section id="commercial-expertise"', `${bookingSection}<section id="commercial-expertise"`);
  writeFileSync(file, page);
}

const commercialFile = path.join(root, "service", "commercial-ac-service.html");
let commercial = readFileSync(commercialFile, "utf8");
const commercialBooking = bookingSection.replaceAll('href="request-service.html"', 'href="../request-service.html"');
if (/<section id="request-service"/.test(commercial)) commercial = commercial.replace(/<section id="request-service".*?<\/section>/s, commercialBooking);
else commercial = commercial.replace('<section id="specialist-commercial-services"', `${commercialBooking}<section id="specialist-commercial-services"`);
writeFileSync(commercialFile, commercial);

console.log("Generated the service request page and linked it from the primary service hubs.");
