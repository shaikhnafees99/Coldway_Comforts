import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const baseUrl = "https://coldwaycomforts.com";
const phone = "+91 98192 13075";
const phoneHref = "+919819213075";

const homeHtml = readFileSync(path.join(root, "index.html"), "utf8");
const schemaMatch = homeHtml.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
if (!schemaMatch) throw new Error("Homepage JSON-LD was not found");
const homeGraph = JSON.parse(schemaMatch[1])["@graph"];
const business = homeGraph.find((node) => Array.isArray(node["@type"]) && node["@type"].includes("LocalBusiness"));
const website = homeGraph.find((node) => node["@type"] === "WebSite");

const services = [
  {
    slug: "hvac-amc-service",
    title: "HVAC AMC Service Mumbai | Commercial Maintenance",
    heading: "HVAC AMC Service in Mumbai",
    short: "Planned annual maintenance for commercial HVAC and high-use air-conditioning systems.",
    description: "HVAC AMC service in Mumbai for offices, clinics, restaurants, showrooms and commercial properties. Site survey, preventive visits and clear maintenance scope.",
    image: "commercial-large-space-photo.jpg",
    imageAlt: "Commercial HVAC outdoor equipment inspected during annual maintenance",
    intro: "An HVAC annual maintenance contract should reflect the equipment, operating hours and cost of downtime at the property. Coldway Comforts begins with a site survey, records the units and active faults, then discusses a practical preventive-maintenance scope for Mumbai businesses.",
    audience: "Offices, clinics, restaurants, retail stores, showrooms, societies and other properties that depend on reliable daily cooling.",
    checks: [
      ["Asset survey", "Record unit type, capacity, location, access, operating hours and known cooling complaints."],
      ["Preventive visits", "Plan filter, coil, drain, airflow and accessible electrical checks around business operations."],
      ["Maintenance history", "Track repeated faults and recommendations so repair decisions use the condition of each unit."],
      ["Clear AMC scope", "Explain scheduled work, exclusions, consumables and additional repair approval before the plan begins."],
    ],
    systems: ["Cassette AC", "Tower AC", "Central AC", "Ductable AC", "VRF and VRV systems", "Commercial split AC"],
    faqs: [
      ["What is included in an HVAC AMC?", "The scope is set after inspection and can include scheduled cleaning, drainage, airflow, cooling-performance and accessible electrical checks."],
      ["How often should preventive service be scheduled?", "Frequency depends on operating hours, occupancy, dust exposure, equipment type and the condition found during the survey."],
      ["Do you provide HVAC AMC service in Churchgate?", "Yes. Churchgate and other listed Mumbai and Navi Mumbai service routes can be planned subject to site access and scheduling."],
    ],
  },
  {
    slug: "industrial-air-conditioning-maintenance",
    title: "Industrial AC Maintenance Mumbai | Cooling Service",
    heading: "Industrial Air-Conditioning Maintenance in Mumbai",
    short: "Inspection and planned maintenance for heavy-use cooling in workshops and commercial facilities.",
    description: "Industrial air-conditioning maintenance in Mumbai for heavy-use cooling equipment, workspaces and facilities. Call Coldway Comforts for a site inspection.",
    image: "commercial-ac.jpg",
    imageAlt: "Large commercial air-conditioning units at an industrial facility",
    intro: "Industrial and heavy-use air-conditioning needs planned access, accurate fault history and maintenance that fits working hours. We inspect accessible cooling equipment, airflow, drainage, visible electrical condition and performance symptoms before recommending service or repair work.",
    audience: "Workshops, warehouses, production support areas, commercial kitchens, service facilities and other high-use spaces.",
    checks: [
      ["Operating conditions", "Review run time, heat load, dust exposure, occupancy and the business impact of cooling interruptions."],
      ["Cooling performance", "Check airflow, coil condition, drainage, operating noise and signs of repeated pressure or electrical trouble."],
      ["Safe access planning", "Confirm outdoor-unit location, ladders, service passages, shutdown windows and site safety requirements."],
      ["Repair priorities", "Separate urgent faults from preventive work and record recommendations for approval."],
    ],
    systems: ["Packaged and ductable AC", "Commercial split systems", "Tower AC", "Cassette AC", "Central cooling equipment", "Ventilation-related checks"],
    faqs: [
      ["Can maintenance be planned outside operating hours?", "Visit timing can be discussed around site access, technician availability and the property's working schedule."],
      ["Do you inspect industrial AC equipment before quoting?", "Yes. Equipment type, condition, access and maintenance requirements need to be reviewed before a useful scope is prepared."],
      ["Can you support repeated cooling breakdowns?", "We review symptoms and accessible equipment history so recurring faults can be diagnosed more systematically."],
    ],
  },
  {
    slug: "central-ac-service",
    title: "Central AC Service Mumbai | Repair & Maintenance",
    heading: "Central AC Service and Maintenance in Mumbai",
    short: "Centralized cooling inspection, preventive maintenance and breakdown diagnosis for large properties.",
    description: "Central AC service in Mumbai for offices, homes, halls and commercial properties. Cooling, airflow, drainage, controls and accessible equipment checks.",
    image: "central-service-photo.jpg",
    imageAlt: "Central air-conditioning outdoor equipment under service inspection",
    intro: "A central AC problem can affect several rooms or an entire floor. Diagnosis should consider airflow, controls, drainage, operating schedules and accessible indoor and outdoor equipment together instead of treating every complaint as a gas-filling issue.",
    audience: "Corporate offices, premium residences, clinics, halls, showrooms and commercial floors with centralized cooling.",
    checks: [
      ["Zone complaints", "Identify which rooms or areas are affected and whether the problem is temperature, airflow, noise or shutdown."],
      ["Air distribution", "Review accessible filters, return airflow, supply airflow and visible duct or grille concerns."],
      ["Drainage and coils", "Check accessible drainage paths, coil condition, water leakage signs and maintenance history."],
      ["Controls and operation", "Review thermostat response, operating schedules, fault indications and accessible electrical components."],
    ],
    systems: ["Central air conditioning", "Ducted cooling", "Air-handling equipment", "Commercial controls", "Multi-zone systems", "Large-space cooling"],
    faqs: [
      ["Do you service home centralized AC systems?", "Yes. Home and commercial centralized cooling enquiries can be assessed after confirming the system type and access."],
      ["Why is one central AC zone not cooling?", "Possible causes include airflow restriction, control settings, damper or duct concerns, coil condition or a system fault that needs diagnosis."],
      ["Can central AC be covered under AMC?", "Yes. A preventive scope can be discussed after the equipment, zones, access and operating requirements are surveyed."],
    ],
  },
  {
    slug: "multi-split-ac-service",
    title: "Multi Split AC Service Mumbai | Repair & Maintenance",
    heading: "Multi-Split Air-Conditioning Service in Mumbai",
    short: "Diagnosis and maintenance for multiple indoor units connected to shared outdoor equipment.",
    description: "Multi split AC service in Mumbai for homes, offices and commercial properties. Indoor-unit, shared outdoor-unit, drainage and control diagnosis.",
    image: "ac-maintenance-photo.jpg",
    imageAlt: "Multiple commercial air-conditioning units arranged for maintenance",
    intro: "Multi-split systems connect several indoor units to shared outdoor equipment. A fault may affect one room, several rooms or the complete system, so the technician needs the model details, error indicators and a clear list of affected indoor units before diagnosis.",
    audience: "Large homes, offices, clinics, studios, shops and properties using several indoor units with shared outdoor equipment.",
    checks: [
      ["Affected-unit mapping", "Record which indoor units cool normally, which show errors and whether the fault changes by operating mode."],
      ["Indoor-unit checks", "Review accessible filters, coils, blowers, drainage, airflow and controller response for each affected zone."],
      ["Shared outdoor system", "Inspect accessible operating symptoms, wiring condition, noise and system fault indications."],
      ["System information", "Confirm brand, model, number of connected units and previous repair history before major work."],
    ],
    systems: ["Multi-split AC", "Inverter multi-split", "Home multi-zone cooling", "Office multi-zone cooling", "Shared outdoor systems", "Wall and cassette indoor units"],
    faqs: [
      ["Why does one indoor unit cool while another does not?", "The affected unit may have an airflow, drainage, control, sensor or system communication concern that requires diagnosis."],
      ["Can all indoor units be serviced in one visit?", "This depends on unit count, access and condition. Share the complete equipment list when booking so enough time can be planned."],
      ["Do multi-split systems need specialized fault checks?", "Yes. Shared outdoor equipment and connected controls make accurate model and error information especially useful."],
    ],
  },
  {
    slug: "hvac-controls-safety-service",
    title: "HVAC Controls & Safety Checks Mumbai | Service",
    heading: "HVAC Controls and Safety System Checks in Mumbai",
    short: "Operational checks for thermostats, controllers, fault indicators and accessible HVAC electrical components.",
    description: "HVAC controls and safety system checks in Mumbai for commercial cooling. Thermostats, controllers, fault indicators and accessible electrical inspection.",
    image: "ac-technician.jpg",
    imageAlt: "HVAC technician checking controls and electrical connections",
    intro: "Controls and protection devices help cooling equipment start, stop and respond to abnormal conditions. Our service checks visible fault indications, thermostat response, controller settings and accessible electrical symptoms as part of broader HVAC diagnosis. Work on live or specialized control panels must follow site and equipment safety requirements.",
    audience: "Offices, shops, restaurants, clinics and commercial sites experiencing repeated trips, controller errors or inconsistent operation.",
    checks: [
      ["Thermostats and controllers", "Review set points, operating modes, schedules, display errors and basic response from connected equipment."],
      ["Fault history", "Record when the trip or error happens, which zones are affected and whether the issue returns after reset."],
      ["Accessible electrical signs", "Check for visible heat damage, loose accessible connections, unusual noise or repeated protective operation."],
      ["Escalation guidance", "Identify when specialized controls, manufacturer support or licensed electrical work may be required."],
    ],
    systems: ["Thermostats", "Wired and wireless controllers", "Error-code diagnosis", "Accessible protective devices", "Control wiring symptoms", "Operating schedules"],
    faqs: [
      ["Can you diagnose repeated HVAC tripping?", "We can inspect operating symptoms and accessible cooling components, then advise if specialized electrical or control-panel work is needed."],
      ["Should an HVAC safety device be bypassed?", "No. Protective devices should not be bypassed. The reason for repeated operation needs proper diagnosis."],
      ["What information helps with a controller error?", "Share a clear photo of the display, equipment brand and model, affected zones and what happened immediately before the error."],
    ],
  },
  {
    slug: "cassette-ac-service",
    title: "Cassette AC Service Mumbai | Repair & AMC",
    heading: "Cassette AC Service and Repair in Mumbai",
    short: "Ceiling cassette AC cleaning, leakage diagnosis, drain-pump checks and commercial AMC.",
    description: "Cassette AC service in Mumbai for offices, restaurants, clinics and showrooms. Cleaning, water leakage checks, drain pump diagnosis, repair and AMC.",
    image: "cassette-service-photo.jpg",
    imageAlt: "Technician servicing a ceiling cassette air conditioner",
    intro: "Cassette AC units cool large rooms from the ceiling and often run for long hours in commercial spaces. Maintenance must account for the filter, coil, blower, drain tray, drain pump, ceiling access and the occupied area below the unit.",
    audience: "Offices, restaurants, clinics, salons, showrooms, halls and retail spaces using ceiling cassette AC units.",
    checks: [
      ["Filter and airflow", "Clean accessible filters and inspect uneven discharge, weak airflow, odor and louver operation."],
      ["Coil and blower", "Review dirt buildup, icing signs, operating noise and cooling performance."],
      ["Drainage system", "Inspect the tray, drain pump, drain line and ceiling leakage symptoms."],
      ["Commercial planning", "Protect furniture and equipment below the unit and plan access around business hours."],
    ],
    systems: ["Four-way cassette AC", "Compact cassette AC", "Inverter cassette AC", "Commercial ceiling units", "Cassette drain pumps", "Multi-split cassette units"],
    faqs: [
      ["Why is my cassette AC leaking from the ceiling?", "A blocked drain, pump concern, tray overflow, icing or installation issue may be responsible."],
      ["Can cassette AC units be included in a commercial AMC?", "Yes. Visit frequency can be planned around usage, dust, occupancy and drainage condition."],
      ["Do you repair cassette AC drain pumps?", "Drain-pump symptoms can be inspected and the suitable repair or replacement recommendation discussed."],
    ],
  },
  {
    slug: "tower-ac-service",
    title: "Tower AC Service Mumbai | Repair & Maintenance",
    heading: "Tower AC Service and Repair in Mumbai",
    short: "High-capacity tower AC repair and maintenance for halls, showrooms and commercial spaces.",
    description: "Tower AC service in Mumbai for halls, showrooms, restaurants and large rooms. Cooling diagnosis, airflow checks, repair and preventive maintenance.",
    image: "tower-service-photo.jpg",
    imageAlt: "High-capacity tower air conditioner used in a commercial space",
    intro: "Tower AC units are commonly used where strong room cooling is needed without a ceiling-mounted indoor unit. High operating hours, blocked airflow, coil dirt and electrical or refrigeration faults can reduce cooling and increase shutdown risk during busy periods.",
    audience: "Halls, showrooms, restaurants, studios, event spaces, shops and large rooms using high-capacity tower units.",
    checks: [
      ["Airflow path", "Review filters, intake, discharge, fan response and obstructions around the unit."],
      ["Cooling symptoms", "Check coil condition, icing, operating noise, compressor behavior and visible leakage signs."],
      ["Electrical response", "Inspect accessible wiring symptoms, controller response and repeated trips before recommending parts."],
      ["Preventive care", "Plan cleaning and checks before events, peak trading periods or heavy seasonal use."],
    ],
    systems: ["Floor-standing tower AC", "Inverter tower AC", "High-capacity room AC", "Commercial floor units", "Event-space cooling", "Showroom cooling"],
    faqs: [
      ["Do you provide tower AC service for commercial halls?", "Yes. Share the unit brand, capacity, location and event or operating schedule when booking."],
      ["Why is a tower AC running but not cooling?", "Airflow restriction, coil condition, controls, electrical faults or refrigeration problems can cause this symptom."],
      ["Can tower AC maintenance be planned before an event?", "Yes, subject to technician availability. Booking early allows time for diagnosis and any approved repair."],
    ],
  },
  {
    slug: "ductable-ac-service",
    title: "Ductable AC Service Mumbai | Repair & AMC",
    heading: "Ductable AC Service and Maintenance in Mumbai",
    short: "Ducted commercial cooling inspection, airflow diagnosis, repair and preventive maintenance.",
    description: "Ductable AC service in Mumbai for offices, restaurants, halls and commercial floors. Airflow, drainage, cooling, controls, repair and AMC support.",
    image: "central-ac.jpg",
    imageAlt: "Commercial ductable air-conditioning outdoor equipment",
    intro: "Ductable AC systems distribute conditioned air through ducts and grilles, so poor cooling may involve the equipment, return-air path, filters, drainage, controls or air distribution. Site access and a clear map of affected rooms help make diagnosis more useful.",
    audience: "Offices, restaurants, halls, clinics, showrooms and commercial floors with concealed ducted cooling.",
    checks: [
      ["Affected-area survey", "Compare temperatures and airflow across rooms, grilles and zones before focusing on one component."],
      ["Return and supply airflow", "Inspect accessible filters, return paths, grilles and visible air-distribution concerns."],
      ["Equipment condition", "Review accessible coils, drainage, operating noise, controls and cooling symptoms."],
      ["Maintenance access", "Confirm ceiling panels, service passages, shutdown timing and protection for occupied areas."],
    ],
    systems: ["Ductable split AC", "Concealed ducted units", "Packaged cooling", "Commercial air distribution", "Return-air systems", "Multi-room cooling"],
    faqs: [
      ["Why is airflow weak in only one room?", "A grille, duct, damper, return-air or zone-specific issue may be involved and should be compared with the rest of the system."],
      ["Can ductable AC be covered by AMC?", "Yes. The equipment, access points, operating hours and preventive tasks should be documented first."],
      ["Do you clean complete duct networks?", "The required duct scope must be assessed separately. Standard AC service does not automatically include full internal duct cleaning."],
    ],
  },
  {
    slug: "vrf-vrv-ac-service",
    title: "VRF VRV AC Service Mumbai | Maintenance Support",
    heading: "VRF and VRV AC Service Support in Mumbai",
    short: "Multi-zone VRF and VRV cooling diagnosis, maintenance planning and service coordination.",
    description: "VRF and VRV AC service support in Mumbai for multi-zone commercial cooling. Error information, indoor units, controls and maintenance planning.",
    image: "commercial-large-space-photo.jpg",
    imageAlt: "Multi-zone commercial outdoor cooling equipment for VRF service",
    intro: "VRF and VRV systems connect multiple indoor units through shared refrigerant and control networks. Accurate brand, model, error-code and affected-zone information is essential because one symptom may involve an indoor unit, controller, communication path or shared outdoor equipment.",
    audience: "Corporate offices, premium homes, clinics, hotels, showrooms and multi-zone commercial properties.",
    checks: [
      ["System inventory", "Record outdoor modules, connected indoor-unit types, controllers and the zones reporting trouble."],
      ["Error information", "Capture displayed codes and operating conditions before repeated resets remove useful fault context."],
      ["Indoor-unit condition", "Review accessible filters, coils, airflow, drainage and controller response in affected zones."],
      ["Service planning", "Identify access, shutdown requirements and when brand-specific tools or specialist support may be needed."],
    ],
    systems: ["VRF systems", "VRV systems", "Multi-zone inverter cooling", "Cassette indoor units", "Ducted indoor units", "Central controllers"],
    faqs: [
      ["What should I send when a VRF system shows an error?", "Send the exact code, brand, model, controller photo and a list of affected indoor units."],
      ["Can one VRF fault affect several rooms?", "Yes. Shared controls, communication and outdoor equipment can affect more than one connected zone."],
      ["Do VRF systems need planned maintenance?", "High-use multi-zone systems benefit from documented unit lists, regular indoor-unit care and planned professional checks."],
    ],
  },
];

const areaLinks = [
  ["churchgate", "Churchgate"], ["fort", "Fort"], ["nariman-point", "Nariman Point"],
  ["colaba", "Colaba"], ["cuffe-parade", "Cuffe Parade"], ["mazgaon", "Mazgaon"],
  ["byculla", "Byculla"], ["dadar", "Dadar"], ["worli", "Worli"],
  ["lower-parel", "Lower Parel"], ["andheri", "Andheri"], ["vashi", "Vashi"],
].map(([slug, name]) => `<a class="pill" href="../area/${slug}.html">${name}</a>`).join("");

function schemaFor(service) {
  const url = `${baseUrl}/service/${service.slug}.html`;
  const faqId = `${url}#faq`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      business,
      website,
      { "@type": "WebPage", "@id": `${url}#webpage`, url, name: service.title, description: service.description, isPartOf: { "@id": `${baseUrl}/#website` }, about: { "@id": `${baseUrl}/#business` }, primaryImageOfPage: { "@type": "ImageObject", url: `${baseUrl}/assets/services/${service.image}` }, mainEntity: { "@id": `${url}#service` }, subjectOf: { "@id": faqId }, breadcrumb: { "@id": `${url}#breadcrumb` }, inLanguage: "en-IN" },
      { "@type": "Service", "@id": `${url}#service`, name: service.heading, serviceType: service.heading.replace(" in Mumbai", ""), description: service.description, image: `${baseUrl}/assets/services/${service.image}`, provider: { "@id": `${baseUrl}/#business` }, areaServed: { "@type": "Place", name: "Mumbai and Navi Mumbai" }, availableChannel: { "@type": "ServiceChannel", servicePhone: phone, serviceUrl: url }, offers: { "@type": "Offer", url, priceCurrency: "INR", availability: "https://schema.org/InStock", eligibleRegion: { "@type": "Place", name: "Mumbai and Navi Mumbai" } } },
      { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` }, { "@type": "ListItem", position: 2, name: "Commercial AC Services", item: `${baseUrl}/service/commercial-ac-service.html` }, { "@type": "ListItem", position: 3, name: service.heading, item: url }] },
      { "@type": "FAQPage", "@id": faqId, mainEntity: service.faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) },
    ],
  };
}

function pageFor(service) {
  const url = `${baseUrl}/service/${service.slug}.html`;
  const checks = service.checks.map(([name, text]) => `<div class="service-point"><b>${name}</b>${text}</div>`).join("");
  const systems = service.systems.map((name) => `<span>${name}</span>`).join("");
  const faqs = service.faqs.map(([question, answer]) => `<details class="faq-item"><summary>${question}</summary><p>${answer}</p></details>`).join("");
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 4).map((item) => `<a class="card" href="${item.slug}.html"><h3>${item.heading.replace(" in Mumbai", "")}</h3><p>${item.short}</p></a>`).join("");
  return `<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${service.title}</title><meta name="description" content="${service.description}"><link rel="canonical" href="${url}"><link rel="stylesheet" href="../assets/style.css"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest"><meta name="theme-color" content="#0497a7"><meta property="og:type" content="website"><meta property="og:site_name" content="Coldway Comforts"><meta property="og:url" content="${url}"><meta property="og:title" content="${service.title}"><meta property="og:description" content="${service.description}"><meta property="og:image" content="${baseUrl}/assets/services/${service.image}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${service.title}"><meta name="twitter:description" content="${service.description}"><meta name="twitter:image" content="${baseUrl}/assets/services/${service.image}"><script type="application/ld+json">${JSON.stringify(schemaFor(service))}</script></head><body><div class="top-call"><span class="top-call-label">Call Now:</span><a href="tel:${phoneHref}">${phone}</a><a href="tel:+919653465441">+91 96534 65441</a><span class="top-call-text">Commercial AC &amp; HVAC Service</span></div><nav class="nav"><a class="brand" href="/"><img src="../assets/brand/coldway-comforts-wordmark.png" alt="Coldway Comforts logo"></a><div class="menu"><a href="../services.html">Services</a><a href="../areas.html">Areas</a><a href="../about.html">About</a><a href="../contact.html">Contact</a></div></nav><main><article class="section guide-page"><div class="breadcrumb">Home / Commercial AC Services / ${service.heading}</div><div class="eyebrow">Commercial Cooling Expertise</div><h1>${service.heading}</h1><div class="contactbar"><b>Book a site inspection: <a href="tel:${phoneHref}">${phone}</a> / <a href="tel:+919653465441">+91 96534 65441</a></b><br>Share the property, equipment type, unit count, operating hours and current problem.</div><p class="lead">${service.intro}</p><div class="service-photo-panel"><img src="../assets/services/${service.image}" alt="${service.imageAlt}" loading="eager"></div><section class="content-panel"><div class="eyebrow">Service Scope</div><h2>What We Check</h2><div class="service-points">${checks}</div></section><section class="content-panel"><div class="eyebrow">Equipment Coverage</div><h2>Systems and Applications</h2><p class="sub">Best suited for ${service.audience}</p><div class="brand-chips">${systems}</div></section><section class="content-panel"><div class="eyebrow">Commercial Process</div><h2>From Site Survey to Maintenance Plan</h2><div class="service-points"><div class="service-point"><b>1. Share requirements</b>Provide location, building type, equipment details, unit count and active symptoms.</div><div class="service-point"><b>2. Inspect the site</b>Review accessible equipment, cooling performance, airflow, drainage, controls and maintenance history.</div><div class="service-point"><b>3. Approve the scope</b>Receive an explanation of recommended service, repair priorities and any AMC options before work begins.</div><div class="service-point"><b>4. Record follow-up</b>Keep track of completed work and recurring concerns for the next preventive visit.</div></div><div class="cta"><a class="btn primary" href="tel:${phoneHref}">Call for Site Inspection</a><button class="btn secondary" onclick="openWhatsApp()">Send Requirements</button></div></section><section class="content-panel"><div class="eyebrow">Service Coverage</div><h2>Commercial AC Service Across Mumbai</h2><p class="sub">We accept enquiries from South Mumbai, Central Mumbai, Western Mumbai and Navi Mumbai routes. Exact visit availability depends on equipment, access and technician scheduling.</p><div class="area-cloud priority-areas">${areaLinks}</div></section><section class="content-panel"><div class="eyebrow">Related Expertise</div><h2>More Commercial Cooling Services</h2><div class="grid">${related}</div></section><section class="faq-section" id="service-faq"><div class="eyebrow">Frequently Asked</div><h2>${service.heading.replace(" in Mumbai", "")} FAQs</h2><div class="faq-grid">${faqs}</div></section></article></main><div class="fixed-actions"><a class="call" href="tel:${phoneHref}">Call Now</a><button onclick="openWhatsApp()">WhatsApp</button><button onclick="saveContact()">Save Contact</button></div><div id="waModal" class="modal"><div class="modal-card"><button class="close" onclick="closeWhatsApp()">x</button><h3>Select WhatsApp Number</h3><p>Send the site location, equipment type, unit count and service requirement.</p><a target="_blank" href="https://wa.me/919819213075?text=Hello%20Coldway%20Comforts,%20I%20need%20commercial%20AC%20service">WhatsApp +91 98192 13075</a><a target="_blank" href="https://wa.me/919653465441?text=Hello%20Coldway%20Comforts,%20I%20need%20commercial%20AC%20service">WhatsApp +91 96534 65441</a></div></div><footer class="footer"><div class="footgrid"><div><h3>Coldway Comforts</h3><p>Commercial AC AMC, HVAC maintenance, cassette AC, tower AC, central AC and ductable cooling service across Mumbai and Navi Mumbai.</p><p><b>Address:</b> Unit No. 60, Plot No. 7, New Tank, Bandar Road, Darukhana, Mazgaon, Mumbai - 400 010</p></div><div><h4>Contact</h4><p>+91 98192 13075<br>+91 96534 65441<br>ccoldwaycomforts@gmail.com</p></div><div><h4>Quick Links</h4><p><a href="commercial-ac-service.html">Commercial AC Hub</a><br><a href="../areas.html">Service Areas</a></p></div></div></footer><script src="../assets/script.js"></script></body></html>`;
}

for (const service of services) {
  const page = pageFor(service).replace(
    '<button class="btn secondary" onclick="openWhatsApp()">Send Requirements</button>',
    '<a class="btn secondary" href="../request-service.html">Send Requirements</a>',
  );
  writeFileSync(path.join(root, "service", `${service.slug}.html`), page);
}

const cards = services.map((service) => `<a class="card" href="service/${service.slug}.html"><img class="card-photo" src="assets/services/${service.image}" alt="${service.imageAlt}" loading="lazy"><h3>${service.heading.replace(" in Mumbai", "")}</h3><p>${service.short}</p></a>`).join("");
const section = `<section id="commercial-expertise" class="section content-band"><div class="eyebrow">Commercial Cooling Expertise</div><h2>HVAC, Central AC &amp; Large-Space Cooling Services</h2><p class="sub">Choose the cooling system or maintenance need that matches your property, then review the inspection scope and send the site details for a planned visit.</p><div class="grid commercial-service-grid">${cards}</div></section>`;

for (const filename of ["index.html", "services.html"]) {
  const file = path.join(root, filename);
  let html = readFileSync(file, "utf8");
  if (/<section id="commercial-expertise"/.test(html)) html = html.replace(/<section id="commercial-expertise".*?<\/section>/s, section);
  else html = html.replace('<section id="service-packages"', `${section}<section id="service-packages"`);
  writeFileSync(file, html);
}

const commercialFile = path.join(root, "service", "commercial-ac-service.html");
let commercialHtml = readFileSync(commercialFile, "utf8");
commercialHtml = commercialHtml.replace(
  "Search Console shows demand for commercial and industrial air-conditioning maintenance in Churchgate. Coldway Comforts accepts site-survey enquiries from Churchgate, Fort, Nariman Point, Colaba, Cuffe Parade, Marine Lines, Mazgaon, Byculla and the other genuine service areas listed below. Share the building name, unit count, AC types and preferred inspection time when calling.",
  "Coldway Comforts accepts commercial and industrial air-conditioning maintenance enquiries from Churchgate, Fort, Nariman Point, Colaba, Cuffe Parade, Marine Lines, Mazgaon, Byculla and the other listed service areas. Share the building name, unit count, AC types and preferred inspection time when calling.",
);
const commercialCards = services.map((service) => `<a class="card" href="${service.slug}.html"><img class="card-photo" src="../assets/services/${service.image}" alt="${service.imageAlt}" loading="lazy"><h3>${service.heading.replace(" in Mumbai", "")}</h3><p>${service.short}</p></a>`).join("");
const commercialSection = `<section id="specialist-commercial-services" class="content-panel"><div class="eyebrow">Specialist Services</div><h2>Explore Commercial AC &amp; HVAC Expertise</h2><p class="sub">Choose the system or maintenance need that matches your property. Each page explains inspection scope, suitable applications and booking information.</p><div class="grid commercial-service-grid">${commercialCards}</div></section>`;
if (/<section id="specialist-commercial-services"/.test(commercialHtml)) commercialHtml = commercialHtml.replace(/<section id="specialist-commercial-services".*?<\/section>/s, commercialSection);
else commercialHtml = commercialHtml.replace('<section id="commercial-process"', `${commercialSection}<section id="commercial-process"`);
writeFileSync(commercialFile, commercialHtml);

console.log(`Generated ${services.length} commercial service pages and updated three service hubs.`);
