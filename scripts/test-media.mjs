import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { site } from "../content/site.ts";
import { gallery } from "../content/gallery.ts";

const withdrawn = [
  "/actual/aid-volunteer-carrying-boxes-to-van.jpg",
  "/actual/team-volunteers-with-stacked-aid-boxes.jpg",
  "/actual/team-volunteers-with-stacked-aid-boxes-2.jpg",
  "/videos/aid-loading-van.mp4",
  "/videos/aid-loading-van-poster.jpg",
];
const privacyImage = "/actual/team-volunteers-with-stacked-aid-boxes-privacy.jpg";

for (const src of withdrawn) assert.ok(!existsSync(`public${src}`), `${src} must not ship`);
assert.equal(site.hero.image, privacyImage);
assert.equal(site.stepsImage, privacyImage);
assert.ok(gallery.items.some((item) => item.src === privacyImage));
assert.ok(gallery.items.every((item) => !withdrawn.includes(item.src)), "Withdrawn media must not appear in the gallery");

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}
for (const file of [...walk("app"), ...walk("content")].filter((path) => /\.(tsx?|txt)$/.test(path))) {
  const content = readFileSync(file, "utf8");
  for (const src of withdrawn) assert.ok(!content.includes(src), `${file} references ${src}`);
}
for (const src of [site.hero.image, site.mission.image, site.stepsImage, ...gallery.items.flatMap((item) => [item.src, item.poster].filter(Boolean))]) {
  assert.ok(existsSync(`public${src}`), `Missing asset: ${src}`);
}
for (const directory of ["app", "app/gallery"]) {
  for (const name of ["opengraph-image", "twitter-image"]) {
    assert.ok(!existsSync(`${directory}/${name}.jpg`), "Old share-card raster must not ship");
    assert.ok(existsSync(`${directory}/${name}.tsx`), "Brand-only share card is missing");
  }
}
console.log(`Media checks passed: ${gallery.items.length} gallery photos, no withdrawn assets, all referenced images exist.`);
