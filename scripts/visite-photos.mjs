// Prépare les photos 360 de la visite virtuelle pour le web.
//
//   node scripts/visite-photos.mjs <dossier des photos exportées>
//
// Entrée : photos équirectangulaires 2:1 exportées depuis Insta360 Studio (JPG, 8K ou 11K).
// Sortie : public/visite/photos/<id>.jpg (6144 × 3072, lisible sur mobile)
//          public/visite/photos/vignettes/<id>.jpg (miniature de la galerie)
//          + un point ajouté dans public/visite/visite.json pour chaque nouvelle photo
//            (nom tiré du nom de fichier : « 02 Plateau muscu.jpg » -> id plateau-muscu, nom « Plateau muscu »).
// Les originaux ne sont pas modifiés : gardez-les, ce sont eux qu'on envoie à Google.

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

// sharp est fourni par Next.js (dépendance optionnelle), inutile de l'ajouter au projet.
const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", { paths: [path.dirname(require.resolve("next/package.json"))] }));

const LARGEUR = 6144; // 2 × 3072 : la plupart des téléphones affichent jusqu'à 8192 px de large
const VIGNETTE = { width: 320, height: 180 };

const source = process.argv[2];
if (!source) {
    console.error("Usage : node scripts/visite-photos.mjs <dossier des photos 360>");
    process.exit(1);
}

const racine = path.resolve(import.meta.dirname, "..", "public", "visite");
const fichierVisite = path.join(racine, "visite.json");
await mkdir(path.join(racine, "photos", "vignettes"), { recursive: true });

const visite = JSON.parse(await readFile(fichierVisite, "utf8"));

const slug = (s) =>
    s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
// « 02 Plateau muscu » -> « Plateau muscu » (le numéro sert seulement à l'ordre)
const nomLisible = (base) => base.replace(/^\d+[\s._-]*/, "").trim() || base;

const fichiers = (await readdir(source)).filter((f) => /\.jpe?g$/i.test(f)).sort();
if (fichiers.length === 0) console.warn("Aucun JPG trouvé dans", source);

for (const f of fichiers) {
    const base = path.parse(f).name;
    const nom = nomLisible(base);
    const id = slug(nom);
    const entree = sharp(path.join(source, f));
    const { width, height } = await entree.metadata();
    if (Math.abs(width / height - 2) > 0.01) {
        console.warn(`⚠ ${f} : ${width}×${height} n'est pas une photo 360 équirectangulaire (2:1), ignorée`);
        continue;
    }

    await entree.clone().resize({ width: Math.min(LARGEUR, width) })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(path.join(racine, "photos", `${id}.jpg`));
    // Vignette : bande centrale (horizon) de la photo
    const reduite = await entree.clone().resize({ width: 1280 }).toBuffer();
    await sharp(reduite)
        .extract({ left: 320, top: 200, width: 640, height: 240 })
        .resize(VIGNETTE).jpeg({ quality: 75 })
        .toFile(path.join(racine, "photos", "vignettes", `${id}.jpg`));

    if (!visite.points.some((p) => p.id === id)) {
        visite.points.push({ id, nom, photo: `photos/${id}.jpg`, vignette: `photos/vignettes/${id}.jpg`, liens: [] });
        console.log(`+ ${nom} (${id})`);
    } else {
        console.log(`↻ ${nom} (${id}) : photo remplacée, liens conservés`);
    }
}

visite.depart ??= visite.points[0]?.id;
await writeFile(fichierVisite, JSON.stringify(visite, null, 2) + "\n");
console.log(`\n${visite.points.length} point(s) dans visite.json. Placez les flèches : /visite/index.html?edition`);
