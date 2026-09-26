// Redacts confidential details from the JWPL dashboard screenshots before they
// enter the site. Originals stay in the parent folder and are never committed;
// only the redacted WebP output is written to src/assets/work/.
//
// Redaction uses solid ink bars (not blur) because blurred text can sometimes
// be recovered. Run with: npm run redact
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(root, '../..');
const out = path.resolve(root, '../src/assets/work');
const INK = '#1C1814';

/** @param {number} w @param {number} h @param {Array<[number, number, number, number]>} boxes */
function barsSvg(w, h, boxes) {
  const rects = boxes
    .map(([x, y, bw, bh]) => `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" fill="${INK}"/>`)
    .join('');
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${rects}</svg>`);
}

// Teams screen: every team tile name plus the team count.
/** @type {Array<[number, number, number, number]>} */
const teamTiles = [];
const cols = [450, 705, 960, 1216, 1471];
const rows = [300, 359, 418, 477, 536, 596, 655, 714];
for (const y of rows) for (const x of cols) teamTiles.push([x + 44, y + 12, 190, Math.min(26, 757 - (y + 12))]);

const jobs = [
  {
    file: 'jwpl_dashboard.png',
    name: 'jwpl-teams.webp',
    boxes: [...teamTiles, [1455, 254, 66, 20]],
  },
  {
    file: 'jwpl_dashboard_1.png',
    name: 'jwpl-compliance.webp',
    boxes: [
      // KPI card values and their sub-captions
      [440, 145, 215, 75], [710, 145, 215, 75], [980, 145, 215, 75], [1250, 145, 215, 75], [1520, 145, 215, 75],
      // Card headlines that carry counts / percentages
      [443, 292, 445, 32], [995, 295, 170, 30], [1395, 295, 140, 30],
      // Chart axis values
      [505, 518, 425, 24], [1392, 338, 42, 222],
    ],
  },
];

await mkdir(out, { recursive: true });
for (const job of jobs) {
  const input = sharp(path.join(src, job.file));
  const { width = 0, height = 0 } = await input.metadata();
  await input
    .composite([{ input: barsSvg(width, height, job.boxes), top: 0, left: 0 }])
    .webp({ quality: 82 })
    .toFile(path.join(out, job.name));
  console.log(`redacted ${job.file} -> ${job.name}`);
}
