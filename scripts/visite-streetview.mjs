// Publie la visite virtuelle sur Google Maps / Street View (Street View Publish API),
// à partir du même visite.json que le site : mêmes points, mêmes liens.
//
//   node scripts/visite-streetview.mjs essai     <dossier des photos originales>   (rien n'est envoyé)
//   node scripts/visite-streetview.mjs publier   <dossier des photos originales>
//   node scripts/visite-streetview.mjs etat                                        (statut chez Google)
//   node scripts/visite-streetview.mjs supprimer --oui                             (retire tout de Google)
//
// Photos : les JPG ORIGINAUX exportés d'Insta360 Studio (pleine résolution, métadonnées 360 conservées),
// mêmes noms que pour scripts/visite-photos.mjs (« 02 Plateau muscu.jpg » -> point plateau-muscu).
//
// Réglages dans visite.json, bloc "streetview" :
//   origine    { lat, lng } : emplacement exact du point de départ (clic droit sur Google Maps -> coordonnées)
//   capCamera  degrés : direction boussole vers laquelle regarde la vue 0° des photos (mode édition du site)
//   placeId    identifiant Google de la salle (https://developers.google.com/maps/documentation/places/web-service/place-id)
//   distanceParDefaut  mètres entre deux points reliés quand le lien n'a pas de "distance" (4 par défaut)
//   niveau     facultatif, { "number": 0, "name": "RDC" } (name : 3 caractères max)
// Positions : calculées à partir des flèches (direction) et des distances ; un point peut forcer
// "position": { "x": mètres vers l'est, "y": mètres vers le nord } par rapport au départ.
//
// Fichiers privés (jamais commités) dans .streetview/ : client.json (identifiant OAuth « Application de bureau »
// téléchargé depuis Google Cloud), token.json (accès à votre compte), publie.json (point -> photo Google), plan.svg.

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { createServer } from "node:http";
import { createHash, randomBytes } from "node:crypto";
import { createRequire } from "node:module";
import { exec } from "node:child_process";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", { paths: [path.dirname(require.resolve("next/package.json"))] }));

const RACINE = path.resolve(import.meta.dirname, "..");
const FICHIER_VISITE = path.join(RACINE, "public", "visite", "visite.json");
const PRIVE = path.join(RACINE, ".streetview");
const API = "https://streetviewpublish.googleapis.com/v1";
const SCOPE = "https://www.googleapis.com/auth/streetviewpublish";

process.on("uncaughtException", (e) => { console.error(`\n✖ ${e.message}`); process.exit(1); });

const [commande, dossier] = process.argv.slice(2);
const visite = JSON.parse(await readFile(FICHIER_VISITE, "utf8"));
const reglages = visite.streetview ?? {};
await mkdir(PRIVE, { recursive: true });

const lireJson = async (f, defaut) => {
    try { return JSON.parse(await readFile(path.join(PRIVE, f), "utf8")); } catch { return defaut; }
};
const ecrireJson = (f, v) => writeFile(path.join(PRIVE, f), JSON.stringify(v, null, 2) + "\n");
const slug = (s) =>
    s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const nomLisible = (base) => base.replace(/^\d+[\s._-]*/, "").trim() || base;
const normaliser = (deg) => ((deg % 360) + 360) % 360;
const rad = (deg) => deg * Math.PI / 180;

// ——— Géométrie : position (mètres) de chaque point, par parcours des liens depuis le départ ———
function calculerPositions() {
    const cap = reglages.capCamera ?? 0;
    const pas = reglages.distanceParDefaut ?? 4;
    const parId = new Map(visite.points.map((p) => [p.id, p]));
    const depart = parId.get(visite.depart) ?? visite.points[0];
    const pos = new Map([[depart.id, depart.position ?? { x: 0, y: 0 }]]);
    const file = [depart.id];
    while (file.length) {
        const id = file.shift();
        for (const l of parId.get(id).liens ?? []) {
            if (pos.has(l.vers) || !parId.has(l.vers)) continue;
            const cible = parId.get(l.vers);
            // yaw affiché + capCamera = direction boussole du lien (photos prises caméra orientée pareil)
            const dir = rad(cap + l.yaw), d = l.distance ?? pas, o = pos.get(id);
            pos.set(l.vers, cible.position ?? { x: o.x + d * Math.sin(dir), y: o.y + d * Math.cos(dir) });
            file.push(l.vers);
        }
    }
    const orphelins = visite.points.filter((p) => !pos.has(p.id));
    for (const p of orphelins) if (p.position) pos.set(p.id, p.position);
    return { pos, orphelins: orphelins.filter((p) => !p.position) };
}

function versGps({ x, y }) {
    const { lat, lng } = reglages.origine;
    return { latitude: lat + y / 111320, longitude: lng + x / (111320 * Math.cos(rad(lat))) };
}

// Cap boussole du centre de chaque photo (le visualiseur affiche yaw 0 = centre de l'image + correction)
const capPhoto = (p) => normaliser((reglages.capCamera ?? 0) - (p.correction ?? 0));

// Liens dans les deux sens (Street View attend des connexions réciproques)
function connexions() {
    const c = new Map(visite.points.map((p) => [p.id, new Set()]));
    for (const p of visite.points) for (const l of p.liens ?? []) {
        if (!c.has(l.vers)) continue;
        c.get(p.id).add(l.vers);
        c.get(l.vers).add(p.id);
    }
    return c;
}

function planSvg(pos) {
    const pts = [...pos.values()];
    const minX = Math.min(...pts.map((p) => p.x)) - 3, maxX = Math.max(...pts.map((p) => p.x)) + 6; // place pour les noms
    const minY = Math.min(...pts.map((p) => p.y)) - 3, maxY = Math.max(...pts.map((p) => p.y)) + 3;
    const e = 30; // px par mètre
    const X = (x) => (x - minX) * e, Y = (y) => (maxY - y) * e;
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${(maxX - minX) * e}" height="${(maxY - minY) * e + 30}" font-family="sans-serif" font-size="12">`;
    svg += `<rect width="100%" height="100%" fill="#fff"/><text x="8" y="16">↑ Nord — 1 carreau = 1 m</text>`;
    for (let x = Math.ceil(minX); x <= maxX; x++) svg += `<line x1="${X(x)}" y1="0" x2="${X(x)}" y2="${Y(minY)}" stroke="#eee"/>`;
    for (let y = Math.ceil(minY); y <= maxY; y++) svg += `<line x1="0" y1="${Y(y)}" x2="${X(maxX)}" y2="${Y(y)}" stroke="#eee"/>`;
    for (const [a, cibles] of connexions()) for (const b of cibles) {
        if (a < b && pos.has(a) && pos.has(b)) svg += `<line x1="${X(pos.get(a).x)}" y1="${Y(pos.get(a).y)}" x2="${X(pos.get(b).x)}" y2="${Y(pos.get(b).y)}" stroke="#999" stroke-width="2"/>`;
    }
    for (const p of visite.points) {
        if (!pos.has(p.id)) continue;
        const { x, y } = pos.get(p.id), c = rad(capPhoto(p));
        svg += `<line x1="${X(x)}" y1="${Y(y)}" x2="${X(x) + 18 * Math.sin(c)}" y2="${Y(y) - 18 * Math.cos(c)}" stroke="#d33" stroke-width="2"/>`;
        svg += `<circle cx="${X(x)}" cy="${Y(y)}" r="6" fill="#f5c400" stroke="#111"/><text x="${X(x) + 9}" y="${Y(y) + 16}">${p.nom}</text>`;
    }
    return svg + `</svg>\n`;
}

async function trouverOriginaux() {
    if (!dossier) throw new Error("Indiquez le dossier des photos originales.");
    const fichiers = new Map();
    for (const f of (await readdir(dossier)).filter((f) => /\.jpe?g$/i.test(f))) {
        fichiers.set(slug(nomLisible(path.parse(f).name)), path.join(dossier, f));
    }
    return fichiers;
}

// ——— Vérifications communes à « essai » et « publier » ———
async function preparer() {
    const erreurs = [];
    if (!visite.points?.length) erreurs.push("visite.json ne contient aucun point.");
    if (!reglages.origine?.lat || !reglages.origine?.lng) erreurs.push('"streetview.origine" { lat, lng } manquant.');
    if (reglages.capCamera == null) erreurs.push('"streetview.capCamera" manquant (bouton « Orientation boussole » du mode édition).');
    if (!reglages.placeId) console.warn("⚠ Pas de placeId : les photos ne seront pas rattachées à la fiche de la salle.");
    if (erreurs.length) throw new Error(erreurs.join("\n"));

    const { pos, orphelins } = calculerPositions();
    if (orphelins.length) throw new Error(`Points non reliés au départ (ajoutez un lien ou une "position") : ${orphelins.map((p) => p.nom).join(", ")}`);
    const originaux = await trouverOriginaux();

    const lignes = [];
    for (const p of visite.points) {
        const fichier = originaux.get(p.id);
        if (!fichier) { erreurs.push(`Photo originale introuvable pour « ${p.nom} » (${p.id}).`); continue; }
        const meta = await sharp(fichier).metadata();
        if (!meta.xmp?.toString().includes("GPano")) erreurs.push(`« ${path.basename(fichier)} » n'a pas les métadonnées 360 (GPano) : réexporter depuis Insta360 Studio.`);
        const { latitude, longitude } = versGps(pos.get(p.id));
        lignes.push({ point: p.nom, x: +pos.get(p.id).x.toFixed(1), y: +pos.get(p.id).y.toFixed(1), cap: Math.round(capPhoto(p)),
            lat: latitude.toFixed(6), lng: longitude.toFixed(6), mpx: Math.round(meta.width * meta.height / 1e6) });
        p._fichier = fichier;
    }
    await writeFile(path.join(PRIVE, "plan.svg"), planSvg(pos));
    console.table(lignes);
    console.log(`Plan de contrôle : ${path.join(PRIVE, "plan.svg")} (vérifiez qu'il ressemble à la salle)`);
    if (erreurs.length) throw new Error(erreurs.join("\n"));
    return pos;
}

// ——— OAuth « application de bureau » (redirection locale + PKCE), aucun intermédiaire ———
async function jeton() {
    const client = (await lireJson("client.json", null))?.installed;
    if (!client) throw new Error(`Placez l'identifiant OAuth (type « Application de bureau ») dans ${path.join(PRIVE, "client.json")}. Voir docs/visite-virtuelle.md.`);
    const token = await lireJson("token.json", null);
    const demander = async (corps) => {
        const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", body: new URLSearchParams({ client_id: client.client_id, client_secret: client.client_secret, ...corps }) });
        const j = await r.json();
        if (!r.ok) throw new Error(`OAuth : ${j.error_description ?? j.error}`);
        return j;
    };
    if (token?.refresh_token) {
        try {
            return (await demander({ grant_type: "refresh_token", refresh_token: token.refresh_token })).access_token;
        } catch {
            // Accès expiré (7 jours en mode « test » de Google Cloud) ou révoqué : on redemande l'autorisation
            console.log("Accès Google expiré, nouvelle autorisation nécessaire.");
        }
    }

    const verifier = randomBytes(32).toString("base64url");
    const challenge = createHash("sha256").update(verifier).digest("base64url");
    const { code, redirect } = await new Promise((ok, ko) => {
        const serveur = createServer((req, res) => {
            const u = new URL(req.url, "http://127.0.0.1");
            if (!u.searchParams.has("code") && !u.searchParams.has("error")) { res.end(); return; }
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }).end("<p>C'est bon, vous pouvez fermer cet onglet et revenir au terminal.</p>");
            serveur.close();
            u.searchParams.has("code") ? ok({ code: u.searchParams.get("code"), redirect }) : ko(new Error(u.searchParams.get("error")));
        });
        let redirect;
        serveur.listen(0, "127.0.0.1", () => {
            redirect = `http://127.0.0.1:${serveur.address().port}`;
            const url = "https://accounts.google.com/o/oauth2/v2/auth?" + new URLSearchParams({
                client_id: client.client_id, redirect_uri: redirect, response_type: "code", scope: SCOPE,
                access_type: "offline", prompt: "consent", code_challenge: challenge, code_challenge_method: "S256",
            });
            console.log(`\nConnexion à votre compte Google (celui qui gère la fiche de la salle) :\n${url}\n`);
            if (process.platform === "win32") exec(`start "" "${url}"`);
        });
    });
    const j = await demander({ grant_type: "authorization_code", code, redirect_uri: redirect, code_verifier: verifier });
    await ecrireJson("token.json", { refresh_token: j.refresh_token });
    return j.access_token;
}

async function api(acces, methode, chemin, corps) {
    const r = await fetch(`${API}${chemin}`, {
        method: methode,
        headers: { Authorization: `Bearer ${acces}`, "Content-Type": "application/json" },
        body: corps === undefined ? undefined : JSON.stringify(corps),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(`${methode} ${chemin} : ${r.status} ${j.error?.message ?? ""}`);
    return j;
}

function pose(p, pos) {
    const q = { heading: capPhoto(p), latLngPair: versGps(pos.get(p.id)) };
    if (reglages.niveau) q.level = reglages.niveau;
    return q;
}

// ——— Commandes ———
if (commande === "essai") {
    await preparer();
    console.log("\nEssai terminé : rien n'a été envoyé. Pour publier : commande « publier ».");
} else if (commande === "publier") {
    const pos = await preparer();
    const acces = await jeton();
    const publie = await lireJson("publie.json", {});

    // 1. Envoi des photos qui ne sont pas encore chez Google
    for (const p of visite.points.filter((p) => !publie[p.id])) {
        process.stdout.write(`↑ ${p.nom}… `);
        const { uploadUrl } = await api(acces, "POST", "/photo:startUpload", {});
        const envoi = await fetch(uploadUrl, { method: "POST", headers: { Authorization: `Bearer ${acces}`, "Content-Type": "image/jpeg" }, body: await readFile(p._fichier) });
        if (!envoi.ok) throw new Error(`Envoi de ${p.nom} : ${envoi.status} ${await envoi.text()}`);
        const photo = await api(acces, "POST", "/photo", {
            uploadReference: { uploadUrl },
            pose: pose(p, pos),
            ...(reglages.placeId ? { places: [{ placeId: reglages.placeId }] } : {}),
        });
        publie[p.id] = photo.photoId.id;
        await ecrireJson("publie.json", publie); // sauvegarde au fil de l'eau : une reprise ne renvoie pas les photos
        console.log("ok");
    }

    // 2. Positions, orientations et liens de toutes les photos (y compris déjà publiées)
    const liens = connexions();
    for (const p of visite.points) {
        await api(acces, "PUT", `/photo/${publie[p.id]}?updateMask=pose.heading,pose.latLngPair${reglages.niveau ? ",pose.level" : ""},connections${reglages.placeId ? ",places" : ""}`, {
            photoId: { id: publie[p.id] },
            pose: pose(p, pos),
            connections: [...liens.get(p.id)].map((id) => ({ target: { id: publie[id] } })),
            ...(reglages.placeId ? { places: [{ placeId: reglages.placeId }] } : {}),
        });
        console.log(`↻ ${p.nom} : ${liens.get(p.id).size} lien(s)`);
    }
    console.log("\nPublié. Google vérifie puis affiche les photos (de quelques heures à quelques jours). Suivi : commande « etat ».");
} else if (commande === "etat") {
    const acces = await jeton();
    const publie = await lireJson("publie.json", {});
    const lignes = [];
    for (const p of visite.points) {
        if (!publie[p.id]) { lignes.push({ point: p.nom, statut: "non publié" }); continue; }
        const ph = await api(acces, "GET", `/photo/${publie[p.id]}?view=BASIC`);
        lignes.push({ point: p.nom, statut: ph.mapsPublishStatus ?? "?", transfert: ph.transferStatus ?? "", vues: ph.viewCount ?? 0, lien: ph.shareLink ?? "" });
    }
    console.table(lignes);
} else if (commande === "supprimer") {
    const publie = await lireJson("publie.json", {});
    const ids = Object.values(publie);
    if (!ids.length) { console.log("Rien à supprimer."); process.exit(0); }
    if (!process.argv.includes("--oui")) {
        console.log(`${ids.length} photo(s) seraient retirées de Google Maps. Relancer avec --oui pour confirmer.`);
        process.exit(0);
    }
    const acces = await jeton();
    await api(acces, "POST", "/photos:batchDelete", { photoIds: ids });
    await ecrireJson("publie.json", {});
    console.log(`${ids.length} photo(s) supprimée(s) de Google.`);
} else {
    console.log("Commandes : essai <dossier> | publier <dossier> | etat | supprimer --oui");
}
