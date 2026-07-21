import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const baseUrl = "https://coldwaycomforts.com";
const brandsDir = path.join(root, "brands");
const solutionsDir = path.join(root, "solutions");
mkdirSync(brandsDir, { recursive: true });
mkdirSync(solutionsDir, { recursive: true });

const homeHtml = readFileSync(path.join(root, "index.html"), "utf8");
const schemaMatch = homeHtml.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
if (!schemaMatch) throw new Error("Homepage JSON-LD was not found");
const homeGraph = JSON.parse(schemaMatch[1])["@graph"];
const business = homeGraph.find((node) => Array.isArray(node["@type"]) && node["@type"].includes("LocalBusiness"));
const website = homeGraph.find((node) => node["@type"] === "WebSite");

const images = {
  brand: "ac-technician.jpg",
  problems: "ac-repair-photo.jpg",
  industries: "commercial-large-space-photo.jpg",
  systems: "commercial-ac.jpg",
  maintenance: "ac-maintenance-photo.jpg",
  conditions: "ac-service-photo.jpg",
  decisions: "doorstep-cooling-photo.jpg",
};

const categoryInfo = {
  problems: {
    label: "AC Problem Guide",
    overview: "Cooling faults can have several causes. Start with the visible symptom, avoid repeated resets or unnecessary gas filling, and arrange diagnosis when basic safe checks do not solve the problem.",
    points: [
      ["Record the symptom", "Note when it started, whether cooling changed gradually or suddenly, and any noise, smell, leakage or error indication."],
      ["Check safe basics", "Confirm cooling mode, temperature, airflow and accessible filters without opening live electrical or sealed refrigeration parts."],
      ["Protect the equipment", "Switch the unit off if there is burning smell, repeated tripping, heavy leakage, ice buildup or unusual mechanical noise."],
      ["Share useful details", "Send the brand, model, AC type, room or property type and a clear description before the technician visit."],
    ],
    service: "../service/ac-repair.html",
    serviceName: "AC Repair",
  },
  industries: {
    label: "Commercial Cooling Guide",
    overview: "Commercial cooling must match occupancy, operating hours, equipment access and the cost of downtime. A useful maintenance plan begins with a site and asset survey.",
    points: [
      ["Map the cooling load", "Record occupied zones, business hours, heat-producing equipment and areas where temperature or airflow is inconsistent."],
      ["List every unit", "Document AC type, capacity, location, controller, access conditions and current maintenance history."],
      ["Plan around operations", "Choose inspection and preventive-service windows that reduce interruption to staff and customers."],
      ["Prioritize faults", "Separate urgent breakdown work from preventive recommendations and approve repairs with a clear scope."],
    ],
    service: "../service/hvac-amc-service.html",
    serviceName: "HVAC AMC Service",
  },
  systems: {
    label: "AC System Guide",
    overview: "Each air-conditioning system has different airflow, drainage, controls and access requirements. Identifying the equipment correctly makes service planning more accurate.",
    points: [
      ["Confirm the system", "Share indoor and outdoor unit photos, brand, model, capacity and controller or thermostat information."],
      ["Describe affected zones", "Explain whether one room, one indoor unit or the complete property is experiencing the problem."],
      ["Review access", "Identify ceiling panels, outdoor-unit access, service lifts, ladders and permitted shutdown times."],
      ["Choose the right scope", "Cleaning, repair, controls diagnosis and AMC work should be planned around the actual equipment configuration."],
    ],
    service: "../service/commercial-ac-service.html",
    serviceName: "Commercial AC Service",
  },
  maintenance: {
    label: "Maintenance Planning",
    overview: "Preventive maintenance is most useful when its frequency and scope reflect operating hours, dust, humidity, occupancy and the consequences of a breakdown.",
    points: [
      ["Review operating hours", "Long daily run times and high occupancy generally require closer inspection than occasional residential use."],
      ["Track repeat symptoms", "Record water leakage, weak airflow, unusual noise, error codes and previous part or gas work."],
      ["Define the visit scope", "Clarify filters, coils, drainage, airflow, accessible electrical checks and performance observations."],
      ["Keep service records", "A simple unit list and visit history helps identify recurring faults and replacement decisions."],
    ],
    service: "../service/ac-maintenance.html",
    serviceName: "AC Maintenance",
  },
  conditions: {
    label: "Mumbai Cooling Conditions",
    overview: "Mumbai heat, coastal humidity, dust, monsoon moisture and long cooling seasons affect filters, coils, drainage, metal parts and daily AC workload.",
    points: [
      ["Watch seasonal changes", "Cooling performance and drainage symptoms may change between dry heat, humid weather and heavy monsoon use."],
      ["Keep airflow clear", "Regular filter care and unobstructed indoor and outdoor airflow help reduce unnecessary strain."],
      ["Look for moisture signs", "Water marks, odor, corrosion and damp insulation deserve attention before damage spreads."],
      ["Plan before peak demand", "Inspection before the hottest or busiest period leaves time for approved cleaning and repairs."],
    ],
    service: "../service/ac-service.html",
    serviceName: "AC Service",
  },
  decisions: {
    label: "Service Decision Guide",
    overview: "A good service decision compares equipment condition, repair scope, operating cost, age, access and expected future use instead of relying on one symptom alone.",
    points: [
      ["Start with diagnosis", "Ask what was inspected and which observation supports the recommended cleaning, repair, gas work or replacement."],
      ["Compare the complete scope", "Check labour, parts, access work, consumables, testing and follow-up rather than comparing one headline amount."],
      ["Consider future use", "Equipment age, daily run time, room load and planned property changes can affect the sensible option."],
      ["Approve clearly", "Confirm the work and estimate before major repair or replacement begins."],
    ],
    service: "../request-service.html",
    serviceName: "Request Service",
  },
};

const brands = [
  ["lg", "LG"], ["samsung", "Samsung"], ["daikin", "Daikin"], ["voltas", "Voltas"],
  ["blue-star", "Blue Star"], ["carrier", "Carrier"], ["hitachi", "Hitachi"],
  ["panasonic", "Panasonic"], ["haier", "Haier"], ["whirlpool", "Whirlpool"],
  ["godrej", "Godrej"], ["lloyd", "Lloyd"], ["mitsubishi", "Mitsubishi"],
  ["bosch", "Bosch"], ["ifb", "IFB"],
].map(([slug, name]) => ({
  slug: `${slug}-ac-service-support`,
  name: `${name} AC Service Support in Mumbai`,
  brand: name,
  summary: `Independent inspection and service support for ${name} cooling equipment in Mumbai. Share the exact model, AC type, error indication and service history before booking.`,
}));

const problems = [
  ["ac-compressor-not-starting", "AC Compressor Not Starting", "The indoor unit may run while the outdoor compressor stays off, starts late or repeatedly attempts to start."],
  ["ac-outdoor-unit-not-working", "AC Outdoor Unit Not Working", "A silent outdoor unit can involve power, controls, protection devices, fan operation or compressor-related symptoms."],
  ["ac-indoor-unit-not-working", "AC Indoor Unit Not Working", "No display, no blower response or a non-responsive indoor unit needs settings, power and control checks."],
  ["ac-blowing-warm-air", "AC Blowing Warm Air", "Warm discharge can follow incorrect mode, restricted airflow, outdoor-unit trouble or refrigeration-cycle faults."],
  ["ac-weak-airflow", "Weak Airflow from AC", "Blocked filters, blower dirt, coil condition, fan trouble or air-distribution restrictions can reduce airflow."],
  ["ac-bad-smell", "Bad Smell from AC", "Musty, drain-related, electrical or other odors have different causes and should not be masked without inspection."],
  ["ac-making-rattling-noise", "AC Making Rattling Noise", "Loose panels, fan contact, debris, mounting issues or mechanical wear can create rattling sounds."],
  ["ac-making-buzzing-noise", "AC Making Buzzing Noise", "Buzzing may involve vibration, electrical components, fan obstruction or outdoor-unit operation."],
  ["ac-freezing-coil", "AC Coil Freezing", "Ice on the indoor coil or pipe can follow low airflow, dirt, control faults or refrigeration problems."],
  ["ac-pipe-ice-formation", "Ice Formation on AC Pipe", "Visible pipe ice is a symptom that needs airflow and refrigeration diagnosis before continued operation."],
  ["ac-breaker-tripping", "AC Tripping the Circuit Breaker", "Repeated breaker operation can indicate an electrical or mechanical fault and should not be bypassed."],
  ["ac-turning-on-and-off", "AC Turning On and Off Repeatedly", "Short cycling can involve settings, sensors, airflow, heat load, controls or equipment protection."],
  ["ac-remote-not-working", "AC Remote or Controller Not Working", "Battery, receiver, lock, controller, communication or power issues can prevent normal commands."],
  ["ac-error-code", "AC Error Code Diagnosis", "The exact displayed code, model and operating condition provide useful context for service planning."],
  ["ac-water-leak-outdoor-unit", "Water Near the AC Outdoor Unit", "Normal condensation and abnormal drainage or pipe symptoms need to be distinguished by location and operating conditions."],
  ["ac-drain-pipe-blockage", "AC Drain Pipe Blockage", "Slow or blocked condensate drainage can cause indoor leakage, odor and ceiling or wall damage."],
  ["ac-cooling-one-room-only", "Uneven AC Cooling Between Rooms", "Zone settings, airflow, ducts, doors, heat load and multi-zone controls can create uneven temperatures."],
  ["ac-high-electricity-bill", "High Electricity Use from AC", "Long run time, dirty airflow components, poor settings, heat gain or equipment faults can increase consumption."],
  ["ac-not-responding-thermostat", "AC Not Responding to Thermostat", "Thermostat settings, power, wiring, sensors, schedules and connected controls may need review."],
  ["ac-fan-not-running", "AC Fan Not Running", "Indoor or outdoor fan trouble can reduce airflow, stop cooling and trigger equipment protection."],
  ["ac-fan-running-compressor-off", "AC Fan Running but Compressor Off", "This symptom needs operating-mode, delay, control, electrical and compressor-protection checks."],
  ["ac-gas-leak-symptoms", "Possible AC Gas Leak Symptoms", "Weak cooling or ice does not prove a leak, but recurring low refrigerant requires proper diagnosis."],
  ["ac-copper-pipe-leak", "AC Copper Pipe Leakage", "Damage, poor joints, vibration or corrosion can affect refrigerant piping and should be pressure-tested appropriately."],
  ["ac-after-power-cut-not-starting", "AC Not Starting After Power Cut", "Voltage recovery, delay timers, controller state, protection and electrical faults may prevent restart."],
  ["ac-pcb-problem", "Possible AC PCB or Control Board Problem", "Display, communication and switching symptoms require careful diagnosis before a board is replaced."],
  ["ac-capacitor-problem", "Possible AC Capacitor Problem", "Starting trouble, humming or fan symptoms may involve a capacitor, but safe instrument testing is required."],
  ["ac-sensor-problem", "AC Temperature Sensor Problem", "Incorrect temperature readings or cycling can involve sensor position, connection or control-board interpretation."],
  ["ac-vibration-problem", "AC Vibration and Mounting Problems", "Loose mounts, pipe contact, panel fit and fan imbalance can transmit vibration into walls or ceilings."],
  ["ac-cooling-drops-afternoon", "AC Cooling Drops in the Afternoon", "Peak heat, direct sun, room load, airflow and equipment capacity can reduce afternoon comfort."],
  ["ac-cooling-drops-after-service", "AC Cooling Weak After Service", "Recheck settings, airflow, assembly, drainage and the original fault when performance changes after work."],
].map(([slug, name, summary]) => ({ slug, name, summary, category: "problems" }));

const industries = [
  ["office-ac-maintenance", "Office AC Maintenance", "Keep work areas comfortable while planning service around meetings, staff hours and multi-zone complaints."],
  ["restaurant-ac-maintenance", "Restaurant AC Maintenance", "Kitchen heat, long hours, grease, occupancy and customer comfort make preventive cooling care especially important."],
  ["hospital-clinic-ac-maintenance", "Hospital and Clinic AC Maintenance", "Clinical schedules, occupied rooms, hygiene expectations and controlled access require careful visit planning."],
  ["hotel-ac-maintenance", "Hotel AC Maintenance", "Guest rooms, reception spaces, restaurants and common areas create varied cooling loads and access windows."],
  ["retail-store-ac-maintenance", "Retail Store AC Maintenance", "Customer comfort, lighting heat and long trading hours increase the value of planned maintenance."],
  ["showroom-ac-maintenance", "Showroom AC Maintenance", "Large glass areas, display lighting and open entrances can affect cooling load and temperature balance."],
  ["warehouse-ac-maintenance", "Warehouse Cooling Maintenance", "Large volumes, loading activity, dust and specialized stored goods influence cooling and ventilation requirements."],
  ["factory-workshop-ac-maintenance", "Factory and Workshop AC Maintenance", "Process heat, dust, operating shifts and restricted access need a site-specific cooling plan."],
  ["school-college-ac-maintenance", "School and College AC Maintenance", "Class schedules, halls, labs and seasonal occupancy require maintenance around academic operations."],
  ["salon-spa-ac-maintenance", "Salon and Spa AC Maintenance", "Humidity, odors, customer comfort and long business hours can affect filters, coils and drainage."],
  ["gym-fitness-ac-maintenance", "Gym and Fitness Centre AC Maintenance", "High occupancy, body heat, humidity and extended hours increase airflow and maintenance demands."],
  ["bank-ac-maintenance", "Bank and Financial Office AC Maintenance", "Customer areas, secure zones and fixed operating hours require coordinated service access."],
  ["data-server-room-cooling", "Server and Equipment Room Cooling", "Continuous heat loads and the cost of temperature failure require monitoring and specialist planning."],
  ["housing-society-ac-maintenance", "Housing Society AC Maintenance", "Common areas, offices, halls and multiple resident units can benefit from coordinated service planning."],
  ["event-hall-ac-maintenance", "Event Hall AC Maintenance", "Variable occupancy and fixed event dates make pre-event inspection and contingency planning valuable."],
].map(([slug, name, summary]) => ({ slug, name, summary, category: "industries" }));

const systems = [
  ["split-ac-system-guide", "Split AC System Guide", "Wall-mounted indoor and outdoor units need correct airflow, drainage, piping and electrical operation."],
  ["window-ac-system-guide", "Window AC System Guide", "A compact window unit combines cooling components in one chassis and needs secure mounting and clear airflow."],
  ["inverter-ac-system-guide", "Inverter AC System Guide", "Variable-speed operation changes how the compressor, controls and error symptoms should be interpreted."],
  ["cassette-ac-system-guide", "Cassette AC System Guide", "Ceiling cassette units require access planning, four-way airflow checks and reliable drain-pump operation."],
  ["tower-ac-system-guide", "Tower AC System Guide", "Floor-standing high-capacity units serve halls and large rooms where airflow and peak demand matter."],
  ["ductable-ac-system-guide", "Ductable AC System Guide", "Concealed equipment distributes air through ducts, grilles and return paths across one or more spaces."],
  ["central-ac-system-guide", "Central AC System Guide", "Centralized equipment and controls can affect several rooms, zones or a complete commercial floor."],
  ["multi-split-ac-system-guide", "Multi-Split AC System Guide", "Several indoor units share outdoor equipment, making affected-zone mapping important for diagnosis."],
  ["vrf-ac-system-guide", "VRF AC System Guide", "Multi-zone variable refrigerant systems depend on connected indoor units, controls and communication."],
  ["vrv-ac-system-guide", "VRV AC System Guide", "Brand-specific multi-zone systems need accurate models, error codes and connected-unit information."],
  ["packaged-ac-system-guide", "Packaged AC System Guide", "Packaged equipment used in commercial properties needs coordinated airflow, controls and maintenance access."],
  ["ahu-system-guide", "Air Handling Unit Maintenance Guide", "AHUs manage filters, coils, fans and air distribution for larger commercial HVAC systems."],
  ["fcu-system-guide", "Fan Coil Unit Maintenance Guide", "FCUs need filter, coil, fan, drainage and control checks within occupied zones."],
  ["chiller-cooling-system-guide", "Chiller Cooling System Planning Guide", "Chiller systems are specialist installations requiring qualified plant-level operation and maintenance planning."],
  ["fresh-air-ventilation-guide", "Fresh Air and Ventilation Guide", "Ventilation and cooling must be considered together where occupancy, odor or indoor-air requirements are important."],
].map(([slug, name, summary]) => ({ slug, name, summary, category: "systems" }));

const maintenance = [
  ["ac-preventive-maintenance-schedule", "AC Preventive Maintenance Schedule", "Build a service frequency around use, dust, humidity, occupancy and equipment condition."],
  ["commercial-ac-asset-register", "Commercial AC Asset Register", "Track unit type, capacity, location, model, faults and maintenance history in one useful list."],
  ["ac-amc-scope-checklist", "AC AMC Scope Checklist", "Compare planned visits, covered tasks, exclusions, consumables, breakdown support and approval rules."],
  ["comprehensive-vs-non-comprehensive-amc", "Comprehensive vs Non-Comprehensive AC AMC", "Understand how parts, labour, consumables and exclusions may differ between contract structures."],
  ["ac-maintenance-before-summer", "AC Maintenance Before Summer", "Inspect cooling and airflow before peak heat increases workload and booking demand."],
  ["ac-maintenance-before-monsoon", "AC Maintenance Before Monsoon", "Review drainage, insulation, outdoor exposure and electrical safety before prolonged humid weather."],
  ["ac-maintenance-after-monsoon", "AC Maintenance After Monsoon", "Look for moisture, corrosion, blocked drainage, odor and outdoor-unit debris after the wet season."],
  ["commercial-ac-breakdown-plan", "Commercial AC Breakdown Response Plan", "Prepare contact details, equipment records, access rules and priority zones before an urgent failure."],
  ["multi-unit-ac-maintenance-plan", "Multi-Unit AC Maintenance Plan", "Group units by type, location, usage and service priority to reduce disruption and missed equipment."],
  ["ac-service-record-template", "AC Service Record Guide", "Record symptoms, inspection findings, completed work, replaced parts and follow-up recommendations."],
  ["ac-filter-cleaning-frequency", "AC Filter Cleaning Frequency", "Choose filter-care intervals based on dust, occupancy, pets, smoke, construction and daily running hours."],
  ["ac-coil-cleaning-guide", "AC Coil Cleaning Planning Guide", "Coil condition affects heat transfer, airflow, odor and equipment workload, but cleaning must suit the unit."],
  ["ac-drain-maintenance-guide", "AC Drainage Maintenance Guide", "Keep trays, pumps, hoses and drain routes clear to reduce leakage and water damage."],
  ["ac-energy-efficiency-maintenance", "AC Maintenance for Energy Efficiency", "Settings, airflow, cleanliness, heat gain and equipment condition all influence electricity use."],
  ["ac-replacement-planning", "AC Replacement Planning", "Compare repair history, age, capacity, efficiency, refrigerant, installation needs and future usage."],
].map(([slug, name, summary]) => ({ slug, name, summary, category: "maintenance" }));

const conditions = [
  ["ac-care-coastal-humidity", "AC Care in Coastal Humidity", "High humidity and salt exposure can affect drainage, comfort, corrosion and outdoor equipment."],
  ["ac-care-mumbai-monsoon", "AC Care During Mumbai Monsoon", "Moisture, drainage load, outdoor exposure and electrical conditions deserve additional attention."],
  ["ac-care-mumbai-summer", "AC Performance in Mumbai Summer", "High outdoor temperature, direct sun and long run times increase cooling demand."],
  ["ac-care-construction-dust", "AC Care During Construction Dust", "Fine dust can load filters, coils and blowers quickly during renovation or nearby construction."],
  ["ac-care-high-rise-building", "AC Service in High-Rise Buildings", "Outdoor-unit access, service lifts, working-height rules and wind exposure affect visit planning."],
  ["ac-care-sea-facing-property", "AC Care for Sea-Facing Properties", "Salt-laden air and humidity can accelerate visible corrosion and outdoor-unit deterioration."],
  ["ac-care-top-floor-flat", "AC Cooling for Top-Floor Flats", "Roof heat gain and afternoon sun can increase room load and reduce comfort during peak hours."],
  ["ac-care-glass-front-showroom", "AC Cooling for Glass-Front Showrooms", "Solar gain, display lighting and frequent door opening can create a demanding cooling load."],
  ["ac-care-small-server-room", "AC Planning for Small Server Rooms", "Continuous equipment heat requires capacity, redundancy and specialist monitoring decisions."],
  ["ac-care-long-daily-runtime", "AC Care for Long Daily Running Hours", "Extended operation increases filter loading, drainage demand and the value of preventive records."],
].map(([slug, name, summary]) => ({ slug, name, summary, category: "conditions" }));

const decisions = [
  ["ac-repair-or-replace", "Should You Repair or Replace an AC?", "Compare repair history, equipment age, efficiency, refrigerant, capacity and expected future use."],
  ["ac-service-or-deep-cleaning", "Regular AC Service vs Deep Cleaning", "Choose cleaning scope from airflow, dirt, blower, coil and drainage condition instead of labels alone."],
  ["ac-gas-filling-or-leak-repair", "AC Gas Filling vs Leak Repair", "Low refrigerant is a symptom; recurring loss needs leakage diagnosis before repeated refilling."],
  ["ac-amc-or-on-call-service", "AC AMC vs On-Call Service", "Compare predictable preventive visits with pay-as-needed support based on unit count and downtime risk."],
  ["split-ac-or-window-ac-service", "Split AC vs Window AC Service Needs", "The equipment layout changes access, drainage, airflow and installation checks."],
  ["cassette-ac-or-ductable-ac", "Cassette AC vs Ductable AC Maintenance", "Ceiling access, drainage, air distribution and occupied-area protection differ between these systems."],
  ["central-ac-or-multi-split", "Central AC vs Multi-Split Service Planning", "Zone control, shared equipment, access and fault mapping affect maintenance and diagnosis."],
  ["commercial-amc-quote-comparison", "How to Compare Commercial AC AMC Quotes", "Compare asset lists, visit frequency, tasks, parts, exclusions, response terms and reporting."],
  ["choose-ac-service-provider", "How to Choose an AC Service Provider", "Look for clear diagnosis, written scope, reachable contact details, real reviews and honest limitations."],
  ["prepare-for-ac-technician-visit", "How to Prepare for an AC Technician Visit", "Provide model details, symptoms, access, previous work and a safe clear area around the equipment."],
].map(([slug, name, summary]) => ({ slug, name, summary, category: "decisions" }));

const topics = [...problems, ...industries, ...systems, ...maintenance, ...conditions, ...decisions];

function esc(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function descriptionFor(topic) {
  return `${topic.name} for Mumbai homes and businesses. ${topic.summary} Learn safe checks, service planning and when professional diagnosis is appropriate.`.slice(0, 158);
}

function schemaFor({ url, title, description, heading, image, faqs, hubName, hubUrl }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      business,
      website,
      { "@type": "WebPage", "@id": `${url}#webpage`, url, name: title, description, isPartOf: { "@id": `${baseUrl}/#website` }, about: { "@id": `${baseUrl}/#business` }, mainEntity: { "@id": `${url}#article` }, subjectOf: { "@id": `${url}#faq` }, breadcrumb: { "@id": `${url}#breadcrumb` }, inLanguage: "en-IN" },
      { "@type": "Article", "@id": `${url}#article`, headline: heading, description, image, author: { "@id": `${baseUrl}/#business` }, publisher: { "@id": `${baseUrl}/#business` }, mainEntityOfPage: { "@id": `${url}#webpage` }, inLanguage: "en-IN" },
      { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` }, { "@type": "ListItem", position: 2, name: hubName, item: hubUrl }, { "@type": "ListItem", position: 3, name: heading, item: url }] },
      { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) },
    ],
  };
}

function shell({ title, description, canonical, schema, body, prefix = "" }) {
  return `<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${canonical}"><link rel="stylesheet" href="${prefix}assets/style.css"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest"><meta name="theme-color" content="#0497a7"><meta property="og:type" content="article"><meta property="og:site_name" content="Coldway Comforts"><meta property="og:url" content="${canonical}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:image" content="${baseUrl}/assets/brand/coldway-comforts-social.png"><meta name="twitter:card" content="summary_large_image"><script type="application/ld+json">${JSON.stringify(schema)}</script></head><body><div class="top-call"><span class="top-call-label">Call Now:</span><a href="tel:+919819213075">+91 98192 13075</a><a href="tel:+919653465441">+91 96534 65441</a><span class="top-call-text">AC &amp; Refrigerator Doorstep Service</span></div><nav class="nav"><a class="brand" href="/"><img src="${prefix}assets/brand/coldway-comforts-wordmark.png" alt="Coldway Comforts logo"></a><div class="menu"><a href="${prefix}services.html">Services</a><a href="${prefix}areas.html">Areas</a><a href="${prefix}about.html">About</a><a href="${prefix}contact.html">Contact</a></div></nav><main>${body}</main><div class="fixed-actions"><a class="call" href="tel:+919819213075">Call Now</a><button onclick="openWhatsApp()">WhatsApp</button><button onclick="saveContact()">Save Contact</button></div><div id="waModal" class="modal"><div class="modal-card"><button class="close" onclick="closeWhatsApp()">x</button><h3>Select WhatsApp Number</h3><p>Share your location, equipment and service requirement.</p><a target="_blank" href="https://wa.me/919819213075?text=Hello%20Coldway%20Comforts,%20I%20need%20service%20support">WhatsApp +91 98192 13075</a><a target="_blank" href="https://wa.me/919653465441?text=Hello%20Coldway%20Comforts,%20I%20need%20service%20support">WhatsApp +91 96534 65441</a></div></div><footer class="footer"><div class="footgrid"><div><h3>Coldway Comforts</h3><p>AC service, commercial HVAC maintenance and refrigerator support across Mumbai and Navi Mumbai.</p><p><b>Address:</b> Unit No. 60, Plot No. 7, New Tank, Bandar Road, Darukhana, Mazgaon, Mumbai - 400 010</p></div><div><h4>Contact</h4><p>+91 98192 13075<br>+91 96534 65441<br>ccoldwaycomforts@gmail.com</p></div><div><h4>Explore</h4><p><a href="${prefix}solutions.html">Cooling Guides</a><br><a href="${prefix}brands.html">Brand Support</a></p></div></div></footer><script src="${prefix}assets/script.js"></script></body></html>`;
}

function topicPage(topic) {
  const info = categoryInfo[topic.category];
  const url = `${baseUrl}/solutions/${topic.slug}.html`;
  const title = `${topic.name} | Coldway Mumbai`;
  const description = descriptionFor(topic);
  const image = `${baseUrl}/assets/services/${images[topic.category]}`;
  const faqs = [
    [`What information helps with ${topic.name.toLowerCase()}?`, "Share the brand, model, AC type, exact symptom, affected rooms, error indication and when the problem started."],
    ["Can I perform checks before booking service?", "You can confirm settings, power and accessible filters. Do not open live electrical parts, sealed refrigerant components or unsafe ceiling equipment."],
    ["Does Coldway Comforts cover Mumbai and Navi Mumbai?", "Yes. Service enquiries are accepted across the listed Mumbai and Navi Mumbai routes, subject to equipment, access and scheduling."],
  ];
  const points = info.points.map(([name, text]) => `<div class="service-point"><b>${esc(name)}</b>${esc(text)}</div>`).join("");
  const related = topics.filter((item) => item.category === topic.category && item.slug !== topic.slug).slice(0, 4).map((item) => `<a class="card" href="${item.slug}.html"><h3>${esc(item.name)}</h3><p>${esc(item.summary)}</p></a>`).join("");
  const faqHtml = faqs.map(([question, answer]) => `<details class="faq-item"><summary>${esc(question)}</summary><p>${esc(answer)}</p></details>`).join("");
  const body = `<article class="section guide-page"><div class="breadcrumb">Home / Cooling Guides / ${esc(topic.name)}</div><div class="eyebrow">${esc(info.label)}</div><h1>${esc(topic.name)}</h1><p class="lead">${esc(topic.summary)} ${esc(info.overview)}</p><div class="service-photo-panel"><img src="../assets/services/${images[topic.category]}" alt="${esc(topic.name)} inspection and service guide" loading="eager"></div><section class="content-panel"><h2>What to Check and Record</h2><div class="service-points">${points}</div></section><section class="content-panel"><h2>Service Planning in Mumbai</h2><p class="lead">For ${esc(topic.name.toLowerCase())}, useful diagnosis starts with the actual operating condition rather than a guessed part or repair. Mumbai heat, humidity, dust, building access and long daily running hours can change both the symptom and the suitable maintenance frequency.</p><p class="lead">Coldway Comforts provides independent inspection and service support. The technician should explain the observed issue and proposed scope before major repair, gas work, parts replacement or AMC approval.</p><div class="cta"><a class="btn primary" href="${info.service}">${esc(info.serviceName)}</a><a class="btn secondary" href="../request-service.html">Send Service Details</a></div></section><section class="content-panel"><h2>Related Cooling Topics</h2><div class="grid">${related}</div></section><section class="faq-section"><div class="eyebrow">Frequently Asked</div><h2>${esc(topic.name)} FAQs</h2><div class="faq-grid">${faqHtml}</div></section></article>`;
  return shell({ title, description, canonical: url, schema: schemaFor({ url, title, description, heading: topic.name, image, faqs, hubName: "Cooling Guides", hubUrl: `${baseUrl}/solutions.html` }), body, prefix: "../" });
}

function brandPage(brand) {
  const url = `${baseUrl}/brands/${brand.slug}.html`;
  const title = `${brand.brand} AC Service Support Mumbai | Coldway`;
  const description = `${brand.summary} Independent multi-brand service; not an authorised ${brand.brand} service centre.`.slice(0, 158);
  const faqs = [
    [`Is Coldway Comforts an authorised ${brand.brand} service centre?`, `No. Coldway Comforts is an independent multi-brand service provider and does not claim authorised ${brand.brand} status.`],
    [`What should I share for ${brand.brand} AC service?`, "Share the model number, AC type, error code or display photo, location and a clear description of the problem."],
    [`Which ${brand.brand} AC types can be assessed?`, "Enquiries can be reviewed for common residential and commercial configurations. Exact support depends on model, fault, parts and site access."],
  ];
  const related = brands.filter((item) => item.slug !== brand.slug).slice(0, 6).map((item) => `<a class="pill" href="${item.slug}.html">${esc(item.brand)}</a>`).join("");
  const faqHtml = faqs.map(([question, answer]) => `<details class="faq-item"><summary>${esc(question)}</summary><p>${esc(answer)}</p></details>`).join("");
  const body = `<article class="section guide-page"><div class="breadcrumb">Home / Brand Support / ${esc(brand.brand)}</div><div class="eyebrow">Independent Multi-Brand Service</div><h1>${esc(brand.name)}</h1><p class="lead">${esc(brand.summary)} Coldway Comforts is an independent service provider and is not presented as an authorised or official ${esc(brand.brand)} service centre.</p><div class="service-photo-panel"><img src="../assets/services/${images.brand}" alt="Technician providing independent ${esc(brand.brand)} AC service support" loading="eager"></div><section class="content-panel"><h2>Information to Share Before Service</h2><div class="service-points"><div class="service-point"><b>Model details</b>Send a photo of the model label, controller or remote and any displayed error code.</div><div class="service-point"><b>Equipment type</b>Confirm whether the unit is split, window, inverter, cassette, tower, ductable, central or multi-zone.</div><div class="service-point"><b>Current symptom</b>Describe cooling, airflow, noise, leakage, tripping, smell or control problems and when they began.</div><div class="service-point"><b>Previous work</b>Mention recent cleaning, gas filling, installation changes or part replacement.</div></div><div class="cta"><a class="btn primary" href="../request-service.html">Request ${esc(brand.brand)} Service</a><a class="btn secondary" href="tel:+919819213075">Call Now</a></div></section><section class="content-panel"><h2>Other Supported Brands</h2><div class="area-cloud">${related}</div></section><section class="faq-section"><div class="eyebrow">Brand Service Questions</div><h2>${esc(brand.brand)} Service FAQs</h2><div class="faq-grid">${faqHtml}</div></section></article>`;
  return shell({ title, description, canonical: url, schema: schemaFor({ url, title, description, heading: brand.name, image: `${baseUrl}/assets/services/${images.brand}`, faqs, hubName: "Brand Support", hubUrl: `${baseUrl}/brands.html` }), body, prefix: "../" });
}

for (const topic of topics) writeFileSync(path.join(solutionsDir, `${topic.slug}.html`), topicPage(topic));
for (const brand of brands) writeFileSync(path.join(brandsDir, `${brand.slug}.html`), brandPage(brand));

function cardList(items, folder) {
  return items.map((item) => `<a class="card" href="${folder}/${item.slug}.html"><h3>${esc(item.name ?? item.brand)}</h3><p>${esc(item.summary)}</p></a>`).join("");
}

const solutionGroups = Object.keys(categoryInfo).map((category) => {
  const info = categoryInfo[category];
  return `<section class="section content-band"><div class="eyebrow">${esc(info.label)}</div><h2>${esc(category === "problems" ? "AC Problems and Symptoms" : category === "industries" ? "Commercial Property Cooling" : category === "systems" ? "AC and HVAC Systems" : category === "maintenance" ? "Maintenance and AMC Planning" : category === "conditions" ? "Mumbai Operating Conditions" : "Service Decisions")}</h2><p class="sub">${esc(info.overview)}</p><div class="grid">${cardList(topics.filter((item) => item.category === category), "solutions")}</div></section>`;
}).join("");

const solutionsTitle = "AC Cooling Guides and Solutions | Coldway Mumbai";
const solutionsDescription = "Explore AC repair symptoms, HVAC systems, commercial cooling, AMC planning and Mumbai-specific air-conditioning guides from Coldway Comforts.";
const solutionsSchema = { "@context": "https://schema.org", "@graph": [business, website, { "@type": "CollectionPage", "@id": `${baseUrl}/solutions.html#webpage`, url: `${baseUrl}/solutions.html`, name: solutionsTitle, description: solutionsDescription, isPartOf: { "@id": `${baseUrl}/#website` }, about: { "@id": `${baseUrl}/#business` }, inLanguage: "en-IN" }] };
writeFileSync(path.join(root, "solutions.html"), shell({ title: solutionsTitle, description: solutionsDescription, canonical: `${baseUrl}/solutions.html`, schema: solutionsSchema, body: `<section class="section"><div class="eyebrow">Cooling Knowledge Centre</div><h1>AC and HVAC Solutions Library</h1><p class="lead">Practical information for cooling problems, equipment types, commercial properties, maintenance planning and service decisions across Mumbai and Navi Mumbai.</p></section>${solutionGroups}` }));

const brandsTitle = "AC Brands Service Support Mumbai | Coldway Comforts";
const brandsDescription = "Independent multi-brand AC service support in Mumbai for LG, Samsung, Daikin, Voltas, Blue Star, Carrier, Hitachi, Panasonic and other major brands.";
const brandsSchema = { "@context": "https://schema.org", "@graph": [business, website, { "@type": "CollectionPage", "@id": `${baseUrl}/brands.html#webpage`, url: `${baseUrl}/brands.html`, name: brandsTitle, description: brandsDescription, isPartOf: { "@id": `${baseUrl}/#website` }, about: { "@id": `${baseUrl}/#business` }, inLanguage: "en-IN" }] };
writeFileSync(path.join(root, "brands.html"), shell({ title: brandsTitle, description: brandsDescription, canonical: `${baseUrl}/brands.html`, schema: brandsSchema, body: `<section class="section"><div class="eyebrow">Independent Multi-Brand Support</div><h1>AC Brand Service Support in Mumbai</h1><p class="lead">Choose your equipment brand to see what information helps with independent service planning. Coldway Comforts does not claim to be an authorised service centre for these manufacturers.</p><div class="grid">${cardList(brands, "brands")}</div></section>` }));

const discoverySection = `<section id="search-guides" class="section content-band"><div class="eyebrow">Service Knowledge</div><h2>Find Help by Problem, System or Brand</h2><p class="sub">Use the cooling library to understand symptoms and maintenance needs, or open the brand-support directory before sending your equipment details.</p><div class="grid"><a class="card" href="solutions.html"><h3>AC &amp; HVAC Solutions</h3><p>Problems, systems, commercial properties, Mumbai conditions, AMC planning and service decisions.</p></a><a class="card" href="brands.html"><h3>AC Brand Support</h3><p>Independent service information for 15 major AC and refrigerator brands.</p></a><a class="card" href="request-service.html"><h3>Request Service</h3><p>Send the area, equipment type, brand, unit count and current problem through WhatsApp.</p></a></div></section>`;

for (const filename of ["index.html", "services.html"]) {
  const file = path.join(root, filename);
  let html = readFileSync(file, "utf8");
  if (/<section id="search-guides"/.test(html)) html = html.replace(/<section id="search-guides".*?<\/section>/s, discoverySection);
  else html = html.replace('<section id="request-service"', `${discoverySection}<section id="request-service"`);
  writeFileSync(file, html);
}

console.log(`Generated ${brands.length} brand pages, ${topics.length} solution pages and two content hubs.`);
