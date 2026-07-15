import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "service", "commercial-ac-service.html");
let html = readFileSync(file, "utf8");

const title = "Commercial AC AMC & HVAC Service Mumbai | Coldway";
const description = "Commercial AC AMC and HVAC maintenance in Mumbai for cassette, tower, central and ductable systems. Call Coldway Comforts for a site inspection.";

html = html
  .replaceAll("Commercial AC Service Mumbai | Coldway", title)
  .replaceAll(
    "Call Now: +91 98192 13075 / +91 96534 65441 for large space and commercial AC service, cassette AC, tower AC and central AC support in Mumbai &amp; Navi Mumbai.",
    description,
  )
  .replace(
    "<h1>Large Space &amp; Commercial AC Service in Mumbai &amp; Navi Mumbai</h1>",
    "<h1>Commercial AC AMC &amp; HVAC Service in Mumbai</h1>",
  )
  .replace(
    "<p class=\"lead\">Large space and commercial AC service is our core work. Coldway Comforts handles cassette AC, tower AC, central AC, office AC, showroom AC and business cooling maintenance with fast response and guaranteed work done.</p>",
    "<p class=\"lead\">Commercial AC maintenance is our core work. Coldway Comforts provides inspection, breakdown support and planned AMC service for cassette AC, tower AC, central AC and ductable systems in offices, showrooms, clinics, restaurants and other large spaces across Mumbai.</p>",
  );

const faqItems = [
  [
    "What is included in a commercial AC AMC?",
    "The scope is planned after a site inspection. It can include scheduled cleaning, drainage checks, airflow checks, electrical inspection, cooling-performance review and breakdown planning for the covered units.",
  ],
  [
    "Do you maintain cassette, tower and central AC systems?",
    "Yes. Cassette AC, tower AC, central AC and ductable commercial systems are part of our core service work.",
  ],
  [
    "Can you plan HVAC annual maintenance in Churchgate?",
    "Yes. We support commercial AC and HVAC maintenance enquiries in Churchgate and other listed South and Central Mumbai service areas, subject to site access and technician scheduling.",
  ],
  [
    "How is AMC visit frequency decided?",
    "Visit frequency depends on operating hours, dust exposure, occupancy, system type and the condition found during the initial site survey.",
  ],
  [
    "Do you inspect the site before giving an AMC estimate?",
    "Yes. Unit count, AC type, access, operating hours and current faults are reviewed before the maintenance scope and estimate are discussed.",
  ],
];

const commercialContent = `<section id="commercial-amc" class="content-panel"><div class="eyebrow">Annual Maintenance</div><h2>Commercial AC AMC for Busy Mumbai Properties</h2><p class="sub">A useful AMC should match the equipment and daily workload of the property. We begin with a site survey, note the number and type of units, review access and operating hours, then discuss a practical preventive-maintenance scope. This helps offices and customer-facing businesses plan service before cooling problems interrupt normal work.</p><div class="service-points"><div class="service-point"><b>Initial Asset Check</b>Record cassette, tower, central, ductable and split AC units, their condition and any active cooling complaints.</div><div class="service-point"><b>Preventive Visits</b>Plan filter, coil, drain, airflow and basic electrical checks around operating hours and equipment usage.</div><div class="service-point"><b>Breakdown Readiness</b>Document recurring faults and access requirements so urgent commercial calls can be handled with better context.</div><div class="service-point"><b>Clear Scope</b>Explain inclusions, exclusions and repair recommendations before the annual maintenance plan is approved.</div></div></section><section id="hvac-maintenance" class="content-panel"><div class="eyebrow">HVAC Maintenance</div><h2>What We Inspect During Commercial AC Service</h2><p class="sub">Commercial cooling complaints often involve more than one component. The technician checks the symptoms first and recommends work based on the unit condition instead of assuming that every weak-cooling issue needs gas filling.</p><div class="seo-table-wrap"><table class="seo-table"><thead><tr><th>System or concern</th><th>Inspection focus</th><th>Why it matters</th></tr></thead><tbody><tr><td>Cassette AC</td><td>Filters, coil, drain pump, drain line, airflow and ceiling leakage signs</td><td>Helps prevent water damage and uneven cooling in occupied spaces</td></tr><tr><td>Tower AC</td><td>Airflow, coil condition, electrical response and operating noise</td><td>Supports reliable cooling in halls, showrooms and event spaces</td></tr><tr><td>Central or ductable AC</td><td>Cooling performance, return airflow, drain condition and accessible electrical components</td><td>One fault can affect several rooms or a complete business floor</td></tr><tr><td>Repeated low cooling</td><td>Coil cleanliness, airflow restriction, pressure symptoms and leakage signs</td><td>Diagnosis avoids unnecessary gas filling and repeated call-outs</td></tr><tr><td>High-use commercial units</td><td>Operating hours, dust load, access and maintenance history</td><td>These details help set a suitable preventive-service frequency</td></tr></tbody></table></div></section><section id="commercial-coverage" class="content-panel"><div class="eyebrow">Local Commercial Support</div><h2>HVAC Annual Maintenance in Churchgate &amp; South Mumbai</h2><p class="sub">Search Console shows demand for commercial and industrial air-conditioning maintenance in Churchgate. Coldway Comforts accepts site-survey enquiries from Churchgate, Fort, Nariman Point, Colaba, Cuffe Parade, Marine Lines, Mazgaon, Byculla and the other genuine service areas listed below. Share the building name, unit count, AC types and preferred inspection time when calling.</p><div class="cta"><a class="btn primary" href="tel:+919819213075">Call for Site Inspection</a><button class="btn secondary" onclick="openWhatsApp()">Send AMC Requirement</button></div></section><section id="commercial-faq" class="faq-section"><div class="eyebrow">Commercial AC Questions</div><h2>Commercial AC AMC FAQs</h2><div class="faq-grid">${faqItems.map(([question, answer]) => `<details class="faq-item"><summary>${question}</summary><p>${answer}</p></details>`).join("")}</div></section>`;

html = html.replace("<h2>Popular Areas</h2>", `${commercialContent}<h2>Commercial AC Service Areas</h2>`);

const jsonLdMatch = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
if (!jsonLdMatch) throw new Error("Commercial page JSON-LD was not found");
const schema = JSON.parse(jsonLdMatch[1]);
const graph = schema["@graph"];
const webPage = graph.find((node) => node["@type"] === "WebPage");
const service = graph.find((node) => node["@type"] === "Service");

webPage.name = title;
webPage.description = description;
webPage.subjectOf = { "@id": "https://coldwaycomforts.com/service/commercial-ac-service.html#faq" };
service.name = "Commercial AC AMC and HVAC Service in Mumbai";
service.serviceType = "Commercial AC AMC and HVAC Maintenance";
service.description = description;
const faqSchema = {
  "@type": "FAQPage",
  "@id": "https://coldwaycomforts.com/service/commercial-ac-service.html#faq",
  mainEntity: faqItems.map(([name, text]) => ({
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text },
  })),
};
const existingFaqIndex = graph.findIndex((node) => node["@id"] === faqSchema["@id"]);
if (existingFaqIndex === -1) graph.push(faqSchema);
else graph[existingFaqIndex] = faqSchema;

html = html.replace(jsonLdMatch[1], JSON.stringify(schema));
writeFileSync(file, html);
console.log("Enhanced the commercial AC AMC and HVAC service page.");
