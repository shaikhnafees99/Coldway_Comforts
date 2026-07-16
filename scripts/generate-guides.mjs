import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const baseUrl = "https://coldwaycomforts.com";
const guidesDir = path.join(root, "guides");
mkdirSync(guidesDir, { recursive: true });

const indexHtml = readFileSync(path.join(root, "index.html"), "utf8");
const schemaMatch = indexHtml.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
if (!schemaMatch) throw new Error("Homepage JSON-LD was not found");
const homeGraph = JSON.parse(schemaMatch[1])["@graph"];
const business = homeGraph.find((node) => {
  const type = node["@type"];
  return Array.isArray(type) && type.includes("LocalBusiness");
});
const website = homeGraph.find((node) => node["@type"] === "WebSite");

const guides = [
  {
    slug: "ac-not-cooling-causes",
    title: "AC Not Cooling? Causes and Checks | Coldway Comforts",
    heading: "AC Not Cooling: Common Causes and Safe Checks",
    description: "Understand common reasons an AC stops cooling, safe checks you can do, and when to call an AC technician in Mumbai.",
    image: "ac-repair-photo.jpg",
    intro: "An AC can run without cooling properly when airflow is restricted, the outdoor unit is not operating correctly, settings are wrong or the refrigeration cycle needs professional diagnosis. Checking the symptoms in the right order helps avoid unnecessary gas filling or part replacement.",
    checks: [
      ["Confirm the mode and temperature", "Use cooling mode, set a temperature below room temperature and allow several minutes for the compressor cycle to begin."],
      ["Check airflow", "A clogged filter, blocked return path or dirty coil can reduce airflow and make the room feel warm even when the unit is running."],
      ["Observe the outdoor unit", "If the indoor fan runs but the outdoor unit does not start, electrical parts, wiring or compressor protection may need inspection."],
      ["Look for ice or water", "Ice on the coil or pipe can indicate low airflow or a refrigeration problem. Switch the unit off and arrange diagnosis instead of repeatedly restarting it."],
    ],
    when: "Call a technician when cooling remains weak after basic setting and filter checks, the breaker trips, the outdoor unit does not run, ice returns, unusual noise appears or a burning smell is present. Refrigerant pressure should be checked only with proper tools after airflow and leakage symptoms are reviewed.",
    faqs: [
      ["Does weak cooling always mean low AC gas?", "No. Dirty filters, blocked airflow, coil condition, electrical faults and outdoor-unit problems can also cause weak cooling."],
      ["Can I keep running an AC with ice on the pipe?", "It is better to switch it off and arrange inspection because continued operation can worsen the condition."],
      ["How can I book an AC cooling inspection?", "Call or WhatsApp Coldway Comforts with the AC brand, type, location and symptoms."],
    ],
  },
  {
    slug: "ac-water-leakage-guide",
    title: "AC Water Leakage Causes and Repair Guide | Coldway",
    heading: "AC Water Leakage: Causes, Prevention and Repair",
    description: "Learn why split and cassette AC units leak water, what to switch off, and how drainage and coil checks solve recurring leakage.",
    image: "ac-service-photo.jpg",
    intro: "Indoor AC water leakage usually begins in the drainage path, but it can also follow coil icing, poor installation slope, drain-pump trouble or heavy dirt buildup. Water near wiring, ceilings or furniture should be handled quickly to limit damage.",
    checks: [
      ["Switch off the AC", "Stop the unit if water is reaching electrical points, the false ceiling, wall finishes or furniture."],
      ["Check the drain outlet", "A blocked or bent drain hose can prevent condensed water from leaving the indoor unit."],
      ["Look for icing", "Ice that melts after shutdown can overflow the drain tray. Airflow and refrigeration symptoms should both be checked."],
      ["Inspect installation and pumps", "Cassette units may use drain pumps, while wall units depend on correct slope and a clear gravity drain."],
    ],
    when: "Professional cleaning is appropriate when the drain line, tray, blower or coil is dirty. Repeated leakage after cleaning needs a closer check of installation slope, pipe insulation, drain-pump operation, coil icing and the route of the drain line.",
    faqs: [
      ["Can a dirty filter cause AC water leakage?", "A badly restricted filter can contribute to coil icing and later water overflow, although the drain path should also be checked."],
      ["Why does a cassette AC leak from the ceiling?", "Possible causes include a blocked drain, drain-pump trouble, tray overflow, icing or an installation issue."],
      ["Should I run the AC while it is leaking?", "Switch it off when water may reach wiring, ceilings or property, and arrange inspection."],
    ],
  },
  {
    slug: "ac-gas-filling-leak-check-guide",
    title: "AC Gas Filling and Leak Check Guide | Coldway",
    heading: "AC Gas Filling: Why Leak Diagnosis Comes First",
    description: "A practical guide to AC refrigerant symptoms, pressure checks, leak diagnosis, vacuuming and responsible gas filling in Mumbai.",
    image: "ac-gas-filling-photo.jpg",
    intro: "AC refrigerant is part of a sealed system. A correctly installed unit should not need routine gas topping up simply because a season has passed. When refrigerant is low, the useful question is where it escaped and whether the leak can be corrected before refilling.",
    checks: [
      ["Review the symptoms", "Weak cooling, ice formation and long running time can suggest a refrigeration issue, but they can also result from airflow or electrical problems."],
      ["Measure operating conditions", "A technician considers pressure together with system type, temperature, airflow and compressor behavior."],
      ["Look for leakage", "Accessible joints, valves, coils and piping should be checked when low refrigerant is suspected."],
      ["Repair, vacuum and charge", "After suitable leak correction, evacuation helps remove air and moisture before the correct refrigerant is charged."],
    ],
    when: "Avoid repeated topping up without diagnosis. Ask what refrigerant the equipment requires, whether leakage signs were found and what work is included. The final recommendation depends on equipment age, leak location, repairability and compressor condition.",
    faqs: [
      ["Does every AC need gas filling each year?", "No. Refrigerant works in a sealed system, so recurring low gas normally requires leakage diagnosis."],
      ["Can gas be filled without vacuuming?", "The correct process depends on the repair, but evacuation is generally important after the sealed system has been opened."],
      ["Why can an AC still cool poorly after gas filling?", "Airflow restriction, dirty coils, electrical problems or compressor issues may still be present."],
    ],
  },
  {
    slug: "commercial-ac-amc-checklist",
    title: "Commercial AC AMC Checklist for Mumbai Businesses",
    heading: "Commercial AC AMC Checklist for Offices and Large Spaces",
    description: "Use this commercial AC AMC checklist for cassette, tower, ductable and central AC systems in Mumbai offices and businesses.",
    image: "commercial-large-space-photo.jpg",
    intro: "Commercial AC maintenance should reflect operating hours, occupancy, dust exposure, equipment type and the cost of downtime. A useful AMC starts with an asset list and site survey rather than applying the same schedule to every property.",
    checks: [
      ["Record every unit", "List equipment type, capacity, location, access restrictions, known faults and operating hours."],
      ["Define preventive work", "Clarify filter, coil, drain, airflow and accessible electrical checks for each planned visit."],
      ["Plan around operations", "Choose visit windows that reduce disruption to staff, customers, clinics, restaurants or retail floors."],
      ["Track breakdowns", "Record repeat faults and recommendations so repair decisions are based on equipment history."],
    ],
    when: "Before approving an AMC, confirm visit frequency, covered equipment, consumables, breakdown response, exclusions and how additional repairs will be estimated. Cassette, tower, ductable and central systems may require different access and maintenance tasks.",
    faqs: [
      ["How often should commercial AC service be planned?", "Frequency depends on daily operating hours, occupancy, dust load, equipment type and current condition."],
      ["Is breakdown repair included in every AMC?", "Not automatically. Inclusions and exclusions should be written clearly before approval."],
      ["Do you survey the commercial site first?", "Yes. Coldway Comforts reviews unit count, equipment type, access and operating requirements before discussing scope."],
    ],
  },
  {
    slug: "cassette-ac-maintenance-guide",
    title: "Cassette AC Maintenance Guide | Coldway Comforts",
    heading: "Cassette AC Maintenance for Offices and Commercial Spaces",
    description: "Cassette AC maintenance guide covering filters, coils, drain pumps, ceiling leakage, airflow and planned commercial service.",
    image: "cassette-service-photo.jpg",
    intro: "Cassette AC units distribute air across large rooms and are common in offices, restaurants, clinics and showrooms. Because the indoor unit sits above a ceiling, drainage and access planning are especially important during maintenance.",
    checks: [
      ["Clean filters and panels", "Dust restriction reduces airflow and can affect comfort across different parts of the room."],
      ["Inspect the coil and blower", "Dirt on heat-exchange and airflow components can reduce performance and contribute to odor or icing."],
      ["Test drainage", "The tray, drain pump and drain line should move condensate reliably without overflowing into the ceiling."],
      ["Review airflow and controls", "Uneven discharge, noisy louvers, control errors or repeated shutdowns deserve diagnosis."],
    ],
    when: "Arrange service when cooling becomes uneven, water marks appear near the ceiling, odor develops, noise increases or the unit reports an error. Commercial sites should plan access and protect furniture or equipment below the cassette before work begins.",
    faqs: [
      ["Why does a cassette AC leak water?", "Common causes include drain blockage, pump trouble, tray overflow, icing or installation problems."],
      ["Can cassette AC filters be cleaned regularly?", "Yes. Filter frequency depends on dust, occupancy and operating hours."],
      ["Do cassette AC units need an AMC?", "High-use commercial units benefit from a planned schedule based on their condition and workload."],
    ],
  },
  {
    slug: "refrigerator-not-cooling-guide",
    title: "Refrigerator Not Cooling? Checks and Repair Guide",
    heading: "Refrigerator Not Cooling: Safe Checks Before Service",
    description: "Check common refrigerator cooling problems, airflow, thermostat settings, door seals and compressor symptoms before booking repair.",
    image: "refrigerator-repair-photo.jpg",
    intro: "A refrigerator may lose cooling because cold air cannot circulate, the door is not sealing, controls are set incorrectly or electrical and refrigeration components need diagnosis. Food safety comes first when temperatures rise for an extended period.",
    checks: [
      ["Confirm power and controls", "Check that the light or display works and that the cooling control was not accidentally changed."],
      ["Leave space for airflow", "Packed vents and overloaded compartments can stop cold air from circulating properly."],
      ["Inspect the door seal", "A loose, dirty or damaged gasket allows warm humid air to enter and can create frost."],
      ["Listen for operation", "Repeated clicking, unusual noise, a silent compressor area or excessive heat may require professional inspection."],
    ],
    when: "Arrange service if the unit remains warm after basic checks, the compressor repeatedly clicks, frost blocks airflow, water collects unexpectedly or electrical odor appears. Avoid dismantling sealed refrigeration parts or live electrical components.",
    faqs: [
      ["Why is the freezer cold but the refrigerator section warm?", "Blocked airflow, frost buildup or a fan and control problem may prevent cold air from reaching the refrigerator section."],
      ["Can an overloaded refrigerator stop cooling properly?", "Overloading can block vents and reduce circulation, although other faults may also be present."],
      ["When should food be moved elsewhere?", "Move temperature-sensitive food when safe storage temperature cannot be maintained."],
    ],
  },
];

function jsonLdFor(guide) {
  const url = `${baseUrl}/guides/${guide.slug}.html`;
  const faqId = `${url}#faq`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      business,
      website,
      { "@type": "WebPage", "@id": `${url}#webpage`, url, name: guide.title, description: guide.description, isPartOf: { "@id": `${baseUrl}/#website` }, about: { "@id": `${baseUrl}/#business` }, mainEntity: { "@id": `${url}#article` }, subjectOf: { "@id": faqId }, inLanguage: "en-IN" },
      { "@type": "Article", "@id": `${url}#article`, headline: guide.heading, description: guide.description, image: `${baseUrl}/assets/services/${guide.image}`, author: { "@id": `${baseUrl}/#business` }, publisher: { "@id": `${baseUrl}/#business` }, mainEntityOfPage: { "@id": `${url}#webpage` }, inLanguage: "en-IN" },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` }, { "@type": "ListItem", position: 2, name: "AC Guides", item: `${baseUrl}/services.html#ac-guides` }, { "@type": "ListItem", position: 3, name: guide.heading, item: url }] },
      { "@type": "FAQPage", "@id": faqId, mainEntity: guide.faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) },
    ],
  };
}

function pageFor(guide) {
  const url = `${baseUrl}/guides/${guide.slug}.html`;
  const checks = guide.checks.map(([heading, copy]) => `<div class="service-point"><b>${heading}</b>${copy}</div>`).join("");
  const faqs = guide.faqs.map(([question, answer]) => `<details class="faq-item"><summary>${question}</summary><p>${answer}</p></details>`).join("");
  return `<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${guide.title}</title><meta name="description" content="${guide.description}"><link rel="canonical" href="${url}"><link rel="stylesheet" href="../assets/style.css"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest"><meta name="theme-color" content="#0497a7"><meta property="og:type" content="article"><meta property="og:site_name" content="Coldway Comforts"><meta property="og:url" content="${url}"><meta property="og:title" content="${guide.title}"><meta property="og:description" content="${guide.description}"><meta property="og:image" content="${baseUrl}/assets/services/${guide.image}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${guide.title}"><meta name="twitter:description" content="${guide.description}"><meta name="twitter:image" content="${baseUrl}/assets/services/${guide.image}"><script type="application/ld+json">${JSON.stringify(jsonLdFor(guide))}</script></head><body><div class="top-call"><span class="top-call-label">Call Now:</span><a href="tel:+919819213075">+91 98192 13075</a><a href="tel:+919653465441">+91 96534 65441</a><span class="top-call-text">AC &amp; Refrigerator Doorstep Service</span></div><nav class="nav"><a class="brand" href="/"><img src="../assets/brand/coldway-comforts-wordmark.png" alt="Coldway Comforts logo"></a><div class="menu"><a href="../services.html">Services</a><a href="../areas.html">Areas</a><a href="../about.html">About</a><a href="../contact.html">Contact</a></div></nav><main><article class="section guide-page"><div class="breadcrumb">Home / AC Guides / ${guide.heading}</div><div class="eyebrow">Cooling Help Guide</div><h1>${guide.heading}</h1><p class="lead">${guide.intro}</p><div class="service-photo-panel"><img src="../assets/services/${guide.image}" alt="${guide.heading}" loading="eager"></div><section class="content-panel"><h2>Step-by-Step Checks</h2><div class="service-points">${checks}</div></section><section class="content-panel"><h2>When Professional Diagnosis Is Needed</h2><p class="lead">${guide.when}</p><div class="cta"><a class="btn primary" href="tel:+919819213075">Call for Inspection</a><button class="btn secondary" onclick="openWhatsApp()">WhatsApp the Symptoms</button></div></section><section class="faq-section" id="guide-faq"><div class="eyebrow">Frequently Asked</div><h2>Questions About This Problem</h2><div class="faq-grid">${faqs}</div></section></article></main><div class="fixed-actions"><a class="call" href="tel:+919819213075">Call Now</a><button onclick="openWhatsApp()">WhatsApp</button><button onclick="saveContact()">Save Contact</button></div><div id="waModal" class="modal"><div class="modal-card"><button class="close" onclick="closeWhatsApp()">x</button><h3>Select WhatsApp Number</h3><p>Choose a number and describe the equipment, location and symptoms.</p><a target="_blank" href="https://wa.me/919819213075?text=Hello%20Coldway%20Comforts,%20I%20need%20cooling%20service%20support">WhatsApp +91 98192 13075</a><a target="_blank" href="https://wa.me/919653465441?text=Hello%20Coldway%20Comforts,%20I%20need%20cooling%20service%20support">WhatsApp +91 96534 65441</a></div></div><footer class="footer"><div class="footgrid"><div><h3>Coldway Comforts</h3><p>AC service, AC repair, commercial AC maintenance and refrigerator service across Mumbai and Navi Mumbai.</p><p><b>Address:</b> Unit No. 60, Plot No. 7, New Tank, Bandar Road, Darukhana, Mazgaon, Mumbai - 400 010</p></div><div><h4>Contact</h4><p>+91 98192 13075<br>+91 96534 65441<br>ccoldwaycomforts@gmail.com</p></div><div><h4>Quick Links</h4><p><a href="../services.html">Services</a><br><a href="../areas.html">Area Pages</a></p></div></div></footer><script src="../assets/script.js"></script></body></html>`;
}

for (const guide of guides) writeFileSync(path.join(guidesDir, `${guide.slug}.html`), pageFor(guide));

const guideCards = guides.map((guide) => `<a class="card" href="guides/${guide.slug}.html"><img class="card-photo" src="assets/services/${guide.image}" alt="${guide.heading}" loading="lazy"><h3>${guide.heading}</h3><p>${guide.description}</p></a>`).join("");
const guideSection = `<section id="ac-guides" class="section content-band"><div class="eyebrow">Cooling Knowledge</div><h2>AC Repair &amp; Maintenance Guides</h2><p class="sub">Practical information for common cooling problems, commercial maintenance planning and safer service decisions.</p><div class="grid">${guideCards}</div></section>`;

for (const filename of ["index.html", "services.html"]) {
  const file = path.join(root, filename);
  let html = readFileSync(file, "utf8");
  if (/<section id="ac-guides"/.test(html)) html = html.replace(/<section id="ac-guides".*?<\/section>/s, guideSection);
  else html = html.replace('<section id="cooling-faq"', `${guideSection}<section id="cooling-faq"`);
  writeFileSync(file, html);
}

console.log(`Generated ${guides.length} search-focused cooling guides and linked them from the homepage and services page.`);
