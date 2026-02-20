import fs from "node:fs";
import path from "node:path";

const DEFAULT_SITE_URL = "https://www.atelierdesignsystem.com";
const DEFAULT_SOURCE = path.resolve("src", "App.tsx");
const DEFAULT_OUT = path.resolve("public", "sitemap.xml");

function parseArgs(argv) {
  const args = {
    siteUrl: DEFAULT_SITE_URL,
    source: DEFAULT_SOURCE,
    out: DEFAULT_OUT,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i];
    const value = argv[i + 1];

    if (key === "--site" && value) {
      args.siteUrl = value;
      i += 1;
      continue;
    }
    if (key === "--source" && value) {
      args.source = value;
      i += 1;
      continue;
    }
    if (key === "--out" && value) {
      args.out = value;
      i += 1;
      continue;
    }
  }

  return args;
}

function normalizeSiteUrl(siteUrl) {
  return siteUrl.replace(/\/+$/, "");
}

function extractRoutePaths(appTsxSource) {
  const routePathRegex = /<Route\b[^>]*\bpath\s*=\s*{?\s*(["'])(.*?)\1\s*}?/g;
  const found = new Set();

  for (const match of appTsxSource.matchAll(routePathRegex)) {
    const routePath = match[2]?.trim();
    if (!routePath) continue;
    if (routePath === "*") continue;
    if (!routePath.startsWith("/")) continue;
    if (routePath.includes(":") || routePath.includes("*")) continue;
    found.add(routePath);
  }

  return Array.from(found).sort((a, b) => a.localeCompare(b));
}

function buildSitemapXml({ siteUrl, paths, lastmod }) {
  const normalizedSiteUrl = normalizeSiteUrl(siteUrl);
  const urlEntries = paths
    .map((routePath) => {
      const loc = routePath === "/" ? `${normalizedSiteUrl}/` : `${normalizedSiteUrl}${routePath}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    })
    .join("\n");

  return [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
    urlEntries,
    "</urlset>",
    "",
  ].join("\n");
}

function main() {
  const { siteUrl, source, out } = parseArgs(process.argv.slice(2));

  const appTsx = fs.readFileSync(source, "utf-8");
  const paths = extractRoutePaths(appTsx);
  if (paths.length === 0) {
    throw new Error(`No <Route path=...> entries found in ${source}`);
  }

  const lastmod = new Date().toISOString().slice(0, 10);
  const xml = buildSitemapXml({ siteUrl, paths, lastmod });
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, xml, "utf-8");

  // eslint-disable-next-line no-console
  console.log(`Generated ${out} with ${paths.length} routes.`);
}

main();
