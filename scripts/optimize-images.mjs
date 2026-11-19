// Optimizes the source photography into /public/images and writes a typed manifest.
// Run: npm run images
// Input:  source-images/<section>/<key>.jpg  + source-images/g*.json (metadata from sourcing)
//         Entries with "source": "Client" are the team's own photos: committed, never credited to Pexels.
//         Optional per entry: "grade": false skips the warm grade, "crop": {left, top, width, height} cuts a region first.
// Output: public/images/<section>/<key>.webp + .avif, data/images.generated.json
import { readFile, writeFile, mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SRC = path.join(ROOT, "source-images");
const OUT = path.join(ROOT, "public", "images");

// Max output width per section. Hero is full-bleed, cards are smaller.
const WIDTH = { hero: 2400, cta: 2000, journeys: 2000, pages: 2000, atlas: 1800, how: 1600, styles: 1200, destinations: 1200, team: 1400 };

// A shared warm, slightly filmic grade so every photo reads as one story.
// Gentle warm shift, a touch less saturation, lifted blacks.
const WARM = [
  [1.035, 0.02, 0.0],
  [0.0, 1.0, 0.0],
  [0.0, 0.015, 0.94],
];

async function isFresh(input, outputs) {
  try {
    const src = (await stat(input)).mtimeMs;
    for (const o of outputs) if ((await stat(o)).mtimeMs < src) return false;
    return true;
  } catch {
    return false;
  }
}

function parseFocal(text = "") {
  const t = text.toLowerCase();
  const pair = t.match(/(\d{1,3})%\s+(\d{1,3})%/);
  if (pair) return `${pair[1]}% ${pair[2]}%`;
  let x = 50;
  let y = 50;
  const px = t.match(/~?(\d{1,3})(?:-\d{1,3})?%\s*x/) || t.match(/~(\d{1,3})%/);
  const py = t.match(/~?(\d{1,3})%\s*y/);
  if (px) x = Number(px[1]);
  else if (/left third/.test(t)) x = 33;
  else if (/center-left|left of center/.test(t)) x = 42;
  else if (/center-right|center right|right of center/.test(t)) x = 60;
  else if (/^right/.test(t)) x = 75;
  if (py) y = Number(py[1]);
  else if (/^top/.test(t)) y = 25;
  else if (/^bottom/.test(t)) y = 70;
  return `${x}% ${y}%`;
}

async function readJson(file, fallback) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch {
    return fallback;
  }
}

async function main() {
  const files = (await readdir(SRC)).filter((f) => /^g\d+\.json$/.test(f)).sort();
  const manifest = {};
  const credits = [];
  // Raw Pexels downloads are gitignored. When one is missing, keep its last good output instead of dropping it.
  const previous = await readJson(path.join(ROOT, "data", "images.generated.json"), {});
  const previousCredits = await readJson(path.join(ROOT, "data", "credits.generated.json"), []);
  for (const f of files) {
    const entries = JSON.parse(await readFile(path.join(SRC, f), "utf8"));
    for (const e of entries) {
      const id = `${e.section}/${e.key}`;
      const input = path.join(ROOT, e.file);
      try {
        await stat(input);
      } catch {
        if (previous[id]) {
          manifest[id] = previous[id];
          const credit = previousCredits.find((c) => c.id === id);
          if (credit) credits.push(credit);
          process.stdout.write(`= ${id} (no source, kept existing output)\n`);
        } else {
          console.warn(`! missing source for ${id}`);
        }
        continue;
      }
      const max = WIDTH[e.section] ?? 1600;
      await mkdir(path.join(OUT, e.section), { recursive: true });
      const webp = path.join(OUT, e.section, `${e.key}.webp`);
      const avif = path.join(OUT, e.section, `${e.key}.avif`);
      const fresh = await isFresh(input, [webp, avif]);
      let base = sharp(input).rotate();
      if (e.crop) base = sharp(await base.toBuffer()).extract(e.crop);
      base = base.resize({ width: max, withoutEnlargement: true });
      // Real people keep their real skin tones: client photos can opt out of the grade.
      if (e.grade !== false) base = base.recomb(WARM).modulate({ saturation: 0.96 }).linear(0.97, 4);
      // Skip the slow encode when outputs are newer than the source.
      const buf = fresh ? await readFile(webp) : await base.toBuffer();
      const meta = await sharp(buf).metadata();
      if (!fresh) {
        await sharp(buf).webp({ quality: 80, effort: 5 }).toFile(webp);
        await sharp(buf).avif({ quality: 52, effort: 4 }).toFile(avif);
      }
      const blur = await sharp(buf).resize(16).webp({ quality: 40 }).toBuffer();
      manifest[id] = {
        src: `/images/${e.section}/${e.key}.webp`,
        avif: `/images/${e.section}/${e.key}.avif`,
        width: meta.width,
        height: meta.height,
        blur: `data:image/webp;base64,${blur.toString("base64")}`,
        alt: e.alt,
        position: parseFocal(e.focal),
      };
      if (e.source !== "Client") credits.push({ id, section: e.section, photographer: e.photographer, pageUrl: e.pageUrl, license: e.license, source: e.source });
      process.stdout.write(`✓ ${id} ${meta.width}x${meta.height}\n`);
    }
  }
  await mkdir(path.join(ROOT, "data"), { recursive: true });
  await writeFile(path.join(ROOT, "data", "images.generated.json"), JSON.stringify(manifest, null, 2));
  await writeFile(path.join(ROOT, "data", "credits.generated.json"), JSON.stringify(credits, null, 2));
  console.log(`\n${Object.keys(manifest).length} images written.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
