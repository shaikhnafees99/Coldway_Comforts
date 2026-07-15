import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const baseUrl = "https://coldwaycomforts.com";
const defaultLastmod = "2026-07-15";
const htmlFiles = [];
const localServiceSlugs = [
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

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name === ".git" || name === "node_modules") continue;
    const full = path.join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (name.endsWith(".html")) htmlFiles.push(full);
  }
}

function isIndexable(file) {
  const html = readFileSync(file, "utf8");
  return !/<meta\s+name=["']robots["'][^>]*noindex/i.test(html);
}

function pageUrl(rel) {
  return rel === "index.html" ? `${baseUrl}/` : `${baseUrl}/${rel}`;
}

function urlEntry(url, priority) {
  return [
    "<url>",
    `<loc>${url}</loc>`,
    `<lastmod>${defaultLastmod}</lastmod>`,
    "<changefreq>weekly</changefreq>",
    `<priority>${priority}</priority>`,
    "</url>",
  ].join("");
}

function writeUrlset(file, entries) {
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    "</urlset>",
    "",
  ].join("\n");

  writeFileSync(path.join(root, file), xml);
}

function writeSitemapIndex(files) {
  const entries = files.map((file) => [
    "<sitemap>",
    `<loc>${baseUrl}/${file}</loc>`,
    `<lastmod>${defaultLastmod}</lastmod>`,
    "</sitemap>",
  ].join(""));

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    "</sitemapindex>",
    "",
  ].join("\n");

  writeFileSync(path.join(root, "sitemap.xml"), xml);
}

walk(root);

const pages = htmlFiles
  .map((file) => path.relative(root, file).replaceAll(path.sep, "/"))
  .filter((rel) => rel !== "404.html")
  .filter((rel) => isIndexable(path.join(root, rel)))
  .sort();

const groups = new Map([
  ["sitemap-core.xml", []],
  ["sitemap-areas.xml", []],
  ["sitemap-services.xml", []],
]);

for (const rel of pages) {
  if (rel.startsWith("area/")) {
    groups.get("sitemap-areas.xml").push(urlEntry(pageUrl(rel), "0.7"));
  } else if (rel.startsWith("service/")) {
    groups.get("sitemap-services.xml").push(urlEntry(pageUrl(rel), "0.8"));
  } else if (rel.startsWith("local/")) {
    const basename = path.basename(rel, ".html");
    const serviceSlug = localServiceSlugs.find((slug) => basename.startsWith(`${slug}-`));
    if (!serviceSlug) throw new Error(`Unknown local service page pattern: ${rel}`);
    const file = `sitemap-local-${serviceSlug}.xml`;
    if (!groups.has(file)) groups.set(file, []);
    groups.get(file).push(urlEntry(pageUrl(rel), "0.5"));
  } else {
    groups.get("sitemap-core.xml").push(urlEntry(pageUrl(rel), rel === "index.html" ? "1.0" : "0.8"));
  }
}

const sitemapFiles = [...groups.entries()]
  .filter(([, entries]) => entries.length)
  .sort(([a], [b]) => {
    const order = ["sitemap-core.xml", "sitemap-services.xml", "sitemap-areas.xml"];
    const aIndex = order.indexOf(a);
    const bIndex = order.indexOf(b);
    if (aIndex !== -1 || bIndex !== -1) return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
    return a.localeCompare(b);
  });

for (const [file, entries] of sitemapFiles) writeUrlset(file, entries);
writeSitemapIndex(sitemapFiles.map(([file]) => file));

console.log(`Generated sitemap index and ${sitemapFiles.length} child sitemaps for ${pages.length} pages.`);
