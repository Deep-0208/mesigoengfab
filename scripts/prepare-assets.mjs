/**
 * One-off asset pipeline. Reads raw sources from assets-src/ and writes
 * optimised WebP/PNG/JPEG into public/ and app/.
 *
 * Sources:
 *   assets-src/indiamart/*   Company product photos and logo, downloaded from
 *                            Mesigo Eng Fab's IndiaMART catalogue and mesigoengfab.com.
 *   assets-src/frames/*.png  First and last frame of the assembly video, extracted
 *                            with ffmpeg (see README.md, "Assets").
 *
 * Run: npm run assets
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = 'assets-src/indiamart';
const OUT = 'public/images';
mkdirSync(`${OUT}/machinery`, { recursive: true });

// name -> [source file, output width, output height, crop?]
// Catalogue renders on white are trimmed and contained (not cropped) so the whole machine shows.
const photos = {
  // Cropped above the phone-camera watermark in the bottom-left corner.
  'machinery/u-trough-screw-conveyor': ['u-type-screw-conveyor.jpg', 720, 900, { left: 0, top: 0, width: 748, height: 860 }],
  'machinery/ss-screw-conveyor': ['ss-screw-conveyor.jpg', 720, 900],
  'machinery/cement-screw-conveyor': ['cement-screw-conveyor.jpg', 600, 800],
  'machinery/bucket-elevator': ['bucket-elevator.jpg', 720, 900, 'contain'],
  'machinery/ribbon-blender': ['ribbon-blender.jpg', 720, 540],
  'machinery/storage-hopper-bin': ['hopper-bin.jpg', 720, 540, 'contain'],
  'machinery/centrifugal-air-blower': ['workshop-2.jpg', 720, 540],
  'machinery/hydraulic-baling-press': ['baling-press.jpg', 720, 540, 'contain'],
  'machinery/inclined-screw-conveyor-workshop': ['inclined-screw-conveyor.webp', 1000, 750],
  'machinery/taper-screw-flights': ['taper-screw-conveyor.jpeg', 1000, 563],
  'machinery/ss-screw-conveyor-shaft': ['workshop-3.jpg', 600, 800],
  'machinery/ash-conditioner': ['ash-conditioner.jpg', 1000, 761],
};

for (const [name, [file, w, h, crop]] of Object.entries(photos)) {
  let img = sharp(`${SRC}/${file}`).rotate();
  // baling-press.jpg has a stray grey rule along its right edge; cut it before trimming.
  if (file === 'baling-press.jpg') img = sharp(await img.extract({ left: 0, top: 0, width: 630, height: 1000 }).toBuffer());
  if (crop === 'contain') img = sharp(await img.trim({ threshold: 20 }).toBuffer());
  else if (crop) img = sharp(await img.extract(crop).toBuffer());
  const info = await img
    .resize(
      crop === 'contain'
        ? { width: Math.round(w * 0.9), height: Math.round(h * 0.9), fit: 'contain', background: '#ffffff' }
        : { width: w, height: h, fit: 'cover', position: 'attention' },
    )
    .extend(crop === 'contain' ? { top: Math.round(h * 0.05), bottom: h - Math.round(h * 0.9) - Math.round(h * 0.05), left: Math.round(w * 0.05), right: w - Math.round(w * 0.9) - Math.round(w * 0.05), background: '#ffffff' } : { top: 0 })
    .webp({ quality: 74 })
    .toFile(`${OUT}/${name}.webp`);
  console.log(name, info.width, info.height, `${Math.round(info.size / 1024)} KB`);
}

// Assembly video poster = first frame, so autoplay starts without a visual jump.
await sharp('assets-src/frames/first.png').webp({ quality: 78 }).toFile(`${OUT}/mesigo-screw-conveyor-poster.webp`);
// Assembled state = last frame, used for reduced-motion and social sharing.
await sharp('assets-src/frames/last.png').webp({ quality: 78 }).toFile(`${OUT}/mesigo-screw-conveyor-assembled.webp`);
await sharp('assets-src/frames/last.png')
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(`${OUT}/og-mesigo-screw-conveyor.jpg`);

// Logo: the source wordmark strip is too low-resolution to read at header size,
// so the site uses the gear-and-skyline mark and sets the name as live text.
const mark = await sharp(`${SRC}/logo-site.png`).extract({ left: 0, top: 0, width: 470, height: 620 }).trim().png().toBuffer();
await sharp(mark).resize({ height: 160 }).png({ compressionLevel: 9 }).toFile(`${OUT}/mesigo-logo-mark.png`);
await sharp(`${SRC}/logo-site.png`).resize({ width: 600 }).png({ compressionLevel: 9 }).toFile(`${OUT}/mesigo-eng-fab-logo.png`);

const square = (size) =>
  sharp(mark)
    .resize(Math.round(size * 0.82), Math.round(size * 0.82), { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: Math.round(size * 0.09), bottom: size - Math.round(size * 0.82) - Math.round(size * 0.09),
      left: Math.round(size * 0.09), right: size - Math.round(size * 0.82) - Math.round(size * 0.09),
      background: { r: 247, g: 247, b: 246, alpha: 1 },
    })
    .flatten({ background: '#f7f7f6' })
    .png();
await square(512).toFile('app/icon.png');
await square(180).toFile('app/apple-icon.png');

// Dark-theme cut-outs: white catalogue backgrounds become transparent so the
// renders sit directly on the graphite panels. Alpha rises with distance from white.
for (const name of ['bucket-elevator', 'storage-hopper-bin', 'hydraulic-baling-press']) {
  const { data, info } = await sharp(`${OUT}/machinery/${name}.webp`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const lift = 255 - Math.min(data[i], data[i + 1], data[i + 2]);
    data[i + 3] = Math.max(0, Math.min(255, (lift - 14) * 7)); // near-white (JPEG noise) becomes fully clear
  }
  await sharp(data, { raw: info }).webp({ quality: 80, alphaQuality: 90 }).toFile(`${OUT}/machinery/${name}-cutout.webp`);
}

// Sample the video backdrop so the section background blends into the frame edges.
const { data } = await sharp('assets-src/frames/first.png').resize(16, 9, { kernel: 'cubic' }).raw().toBuffer({ resolveWithObject: true });
const px = (x, y) => '#' + [0, 1, 2].map((c) => data[(y * 16 + x) * 3 + c].toString(16).padStart(2, '0')).join('');
console.log('video corners', px(0, 0), px(15, 0), px(0, 8), px(15, 8), 'mid-top', px(8, 0));
