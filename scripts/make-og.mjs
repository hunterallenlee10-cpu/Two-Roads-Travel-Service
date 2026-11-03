// Renders /public/og-image.png (1200x630) and /app/apple-icon.png with Playwright + sharp.
// Run: npm run og (needs network for Google Fonts)
import { createRequire } from "node:module";
import { readFile } from "node:fs/promises";
import path from "node:path";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const sharp = require("sharp");

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const b64 = async (p) => (await readFile(path.join(ROOT, p))).toString("base64");

const left = await b64("public/images/hero/unwind.webp");
const right = await b64("public/images/hero/discover.webp");

const html = `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,300&family=Manrope:wght@600&display=block" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;background:#0E2A33;font-family:Fraunces,serif;color:#F4EFE6;position:relative}
.half{position:absolute;top:0;bottom:0;width:50%;background-size:cover;background-position:center}
.l{left:0;background-image:url(data:image/webp;base64,${left})}
.r{right:0;background-image:url(data:image/webp;base64,${right})}
.shade{position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(14,42,51,.55),rgba(14,42,51,.25) 70%),linear-gradient(to top,rgba(14,42,51,.75),transparent 45%)}
.seam{position:absolute;left:600px;top:0;bottom:0;width:1.5px;background:rgba(244,239,230,.85);box-shadow:0 0 18px 3px rgba(229,138,94,.7)}
h1{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;font-weight:300;font-size:104px;line-height:.95;letter-spacing:-.035em;text-align:center;font-variation-settings:"opsz" 144;text-shadow:0 2px 40px rgba(14,42,51,.5)}
h1 em{font-style:italic}
.mark{position:absolute;left:48px;bottom:40px;display:flex;align-items:center;gap:14px;font-size:30px;letter-spacing:-.02em}
.mark small{display:block;font-family:Manrope,sans-serif;font-size:11px;letter-spacing:.34em;text-transform:uppercase;margin-top:4px;opacity:.85}
.tag{position:absolute;right:48px;bottom:46px;font-family:Manrope,sans-serif;font-size:13px;letter-spacing:.22em;text-transform:uppercase;opacity:.9}
</style></head><body>
<div class="half l"></div><div class="half r"></div><div class="shade"></div><div class="seam"></div>
<h1><span>We get you.</span><em>And we get you there.</em></h1>
<div class="mark"><svg width="38" height="38" viewBox="0 0 32 32" fill="none"><path d="M16 30.5V19.5" stroke="#F4EFE6" stroke-width="1.75" stroke-linecap="round"/><path d="M16 19.5C16 13.5 8.5 12 7 2.5" stroke="#F4EFE6" stroke-width="1.75" stroke-linecap="round"/><path d="M16 19.5C16 13.5 23.5 12 25 2.5" stroke="#D2683A" stroke-width="1.75" stroke-linecap="round"/></svg><div>Two <em>Roads</em><small>Travel Service</small></div></div>
<div class="tag">Choose your road</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot({ type: "png" });
await browser.close();
await sharp(png).png({ compressionLevel: 9, palette: false }).toFile(path.join(ROOT, "public", "og-image.png"));

const svg = await readFile(path.join(ROOT, "app", "icon.svg"));
await sharp(svg, { density: 600 }).resize(180, 180).flatten({ background: "#0E2A33" }).png().toFile(path.join(ROOT, "app", "apple-icon.png"));
console.log("og-image.png and apple-icon.png written");
