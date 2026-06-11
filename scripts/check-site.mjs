import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const htmlFiles = [];
const errors = [];
const warnings = [];
const requiredRootFiles = [
  "CNAME",
  "favicon.png",
  "apple-touch-icon.png",
  "site.webmanifest",
  "robots.txt",
  "sitemap.xml",
];
const requiredAssetFiles = [
  "assets/brand/coldway-comforts-icon-512.png",
  "assets/brand/coldway-comforts-social.png",
  "assets/brand/coldway-comforts-wordmark.png",
];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name === ".git" || name === "node_modules") continue;
    const full = path.join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (name.endsWith(".html")) htmlFiles.push(full);
  }
}

function isExternal(value) {
  return /^(https?:|tel:|mailto:|sms:|whatsapp:|javascript:|data:|#)/i.test(value);
}

function normalizeLink(value, fromFile) {
  const clean = value.split("#")[0].split("?")[0].trim();
  if (!clean || isExternal(clean)) return null;
  const decoded = decodeURIComponent(clean);
  const base = decoded.startsWith("/")
    ? path.join(root, decoded.slice(1))
    : path.resolve(path.dirname(fromFile), decoded);
  return decoded.endsWith("/") ? path.join(base, "index.html") : base;
}

function nodeHasType(node, type) {
  const value = node?.["@type"];
  return Array.isArray(value) ? value.includes(type) : value === type;
}

function graphNodes(document) {
  return Array.isArray(document?.["@graph"]) ? document["@graph"] : [document];
}

walk(root);

for (const file of [...requiredRootFiles, ...requiredAssetFiles]) {
  if (!existsSync(path.join(root, file))) errors.push(`missing ${file}`);
}

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const rel = path.relative(root, file);
  const normalizedRel = rel.replaceAll(path.sep, "/");
  const schemaNodes = [];

  if (/washing-machine|doorstep-appliance/i.test(rel)) errors.push(`${rel}: stale service slug`);
  if (!/<title>[^<]+<\/title>/i.test(html)) warnings.push(`${rel}: missing title`);
  if (!/<meta\s+name=["']description["']/i.test(html)) warnings.push(`${rel}: missing meta description`);
  if (!/<meta\s+name=["']viewport["']/i.test(html)) warnings.push(`${rel}: missing viewport`);
  if (!/<h1[\s>]/i.test(html)) warnings.push(`${rel}: missing h1`);
  if (!/<link\s+rel=["']icon["']\s+href=["']\/favicon\.png["']/i.test(html)) {
    errors.push(`${rel}: missing root favicon link`);
  }
  if (!/<link\s+rel=["']manifest["']\s+href=["']\/site\.webmanifest["']/i.test(html)) {
    errors.push(`${rel}: missing web manifest link`);
  }
  if (/coldway-comforts-logo\.png/i.test(html)) errors.push(`${rel}: references old logo asset`);
  if (/https:\/\/www\.coldwaycomforts\.com/i.test(html)) errors.push(`${rel}: references www domain`);
  if (/Washing Machine|washing-machine/i.test(html)) errors.push(`${rel}: references old washing machine content`);
  if (/doorstep-appliance/i.test(html)) errors.push(`${rel}: references old doorstep appliance slug`);
  if (/appliance service/i.test(html)) errors.push(`${rel}: references generic appliance service copy`);

  for (const match of html.matchAll(/<script\s+type=["']application\/ld\+json["']>(.*?)<\/script>/gis)) {
    try {
      schemaNodes.push(...graphNodes(JSON.parse(match[1])));
    } catch (error) {
      errors.push(`${rel}: invalid JSON-LD (${error.message})`);
    }
  }

  if (!schemaNodes.some((node) => nodeHasType(node, "LocalBusiness"))) {
    errors.push(`${rel}: missing LocalBusiness schema`);
  }
  const business = schemaNodes.find((node) => nodeHasType(node, "LocalBusiness"));
  const offerNames = business?.hasOfferCatalog?.itemListElement
    ?.map((offer) => offer?.itemOffered?.name)
    .filter(Boolean) ?? [];
  for (const requiredOffer of [
    "Doorstep AC and Refrigerator Service",
    "Cassette AC Service",
    "Tower AC Service",
    "Central AC Service",
  ]) {
    if (!offerNames.includes(requiredOffer)) {
      errors.push(`${rel}: missing ${requiredOffer} in business offer schema`);
    }
  }

  if (/^(area|local|service)\//.test(normalizedRel)) {
    const service = schemaNodes.find((node) => nodeHasType(node, "Service") && /#service$/.test(node?.["@id"] ?? ""));
    if (!service) {
      errors.push(`${rel}: missing page-level Service schema`);
    } else {
      if (!service.areaServed?.name) errors.push(`${rel}: Service schema missing areaServed name`);
      if (service.provider?.["@id"] !== "https://coldwaycomforts.com/#business") {
        errors.push(`${rel}: Service schema missing Coldway provider`);
      }
    }
    const page = schemaNodes.find((node) => nodeHasType(node, "WebPage"));
    if (!page?.mainEntity?.["@id"]?.endsWith("#service")) {
      errors.push(`${rel}: WebPage schema missing Service mainEntity`);
    }
  }

  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    const target = normalizeLink(match[1], file);
    if (target && !existsSync(target)) {
      errors.push(`${rel}: missing ${match[1]}`);
    }
  }
}

const sitemapPath = path.join(root, "sitemap.xml");
if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, "utf8");
  if (/https:\/\/www\.coldwaycomforts\.com/i.test(sitemap)) errors.push("sitemap: references www domain");
  const sitemapLocs = new Set();
  for (const match of sitemap.matchAll(/<loc>(https?:\/\/coldwaycomforts\.com\/[^<]*)<\/loc>/gi)) {
    const url = new URL(match[1]);
    sitemapLocs.add(url.pathname === "/" ? "/index.html" : url.pathname);
    const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
    const local = path.join(root, decodeURIComponent(pathname.slice(1)));
    if (!existsSync(local)) errors.push(`sitemap: missing ${url.pathname}`);
  }
  for (const file of htmlFiles) {
    const rel = path.relative(root, file).replaceAll(path.sep, "/");
    if (rel === "404.html") continue;
    const pathname = rel === "index.html" ? "/index.html" : `/${rel}`;
    if (!sitemapLocs.has(pathname)) errors.push(`sitemap: missing URL for ${rel}`);
  }
} else {
  errors.push("missing sitemap.xml");
}

const robotsPath = path.join(root, "robots.txt");
if (existsSync(robotsPath)) {
  const robots = readFileSync(robotsPath, "utf8");
  if (!/Sitemap:\s*https:\/\/coldwaycomforts\.com\/sitemap\.xml/i.test(robots)) {
    errors.push("robots.txt: missing apex-domain sitemap URL");
  }
}

console.log(`Checked ${htmlFiles.length} HTML pages.`);
if (warnings.length) console.log(`Warnings: ${warnings.length}`);
if (errors.length) {
  console.error(`Errors: ${errors.length}`);
  for (const error of errors.slice(0, 50)) console.error(`- ${error}`);
  if (errors.length > 50) console.error(`- ...and ${errors.length - 50} more`);
  process.exit(1);
}

console.log("No broken internal links, assets, or sitemap targets found.");
