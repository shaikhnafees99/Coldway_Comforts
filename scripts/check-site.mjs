import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const htmlFiles = [];
const errors = [];
const warnings = [];

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

walk(root);

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const rel = path.relative(root, file);

  if (!/<title>[^<]+<\/title>/i.test(html)) warnings.push(`${rel}: missing title`);
  if (!/<meta\s+name=["']description["']/i.test(html)) warnings.push(`${rel}: missing meta description`);
  if (!/<meta\s+name=["']viewport["']/i.test(html)) warnings.push(`${rel}: missing viewport`);
  if (!/<h1[\s>]/i.test(html)) warnings.push(`${rel}: missing h1`);

  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    const target = normalizeLink(match[1], file);
    if (target && !existsSync(target)) {
      errors.push(`${rel}: missing ${match[1]}`);
    }
  }
}

if (!existsSync(path.join(root, "CNAME"))) {
  errors.push("missing CNAME for custom GitHub Pages domain");
}

const sitemapPath = path.join(root, "sitemap.xml");
if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, "utf8");
  for (const match of sitemap.matchAll(/<loc>(https?:\/\/(?:www\.)?coldwaycomforts\.com\/[^<]*)<\/loc>/gi)) {
    const url = new URL(match[1]);
    const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
    const local = path.join(root, decodeURIComponent(pathname.slice(1)));
    if (!existsSync(local)) errors.push(`sitemap: missing ${url.pathname}`);
  }
} else {
  errors.push("missing sitemap.xml");
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
