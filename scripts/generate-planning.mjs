/**
 * Génère les images SVG des plannings (version bureau + une par jour pour le
 * diaporama mobile) à partir des données ci-dessous.
 *
 * Usage : node scripts/generate-planning.mjs
 * Sortie : public/images/plannings/planning2026_*.svg
 *          public/images/plannings/planning2026_aqua_*.svg
 *
 * Pour la saison suivante : mettre à jour les données de PLANNINGS, relancer,
 * puis incrémenter `planning_v` dans src/context/image-context.tsx (les images
 * sont servies avec un cache immuable d'un an).
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "images", "plannings");

// Logo officiel (blanc sur transparent), embarqué en data URI pour que le SVG
// reste autonome une fois chargé via <img>.
const logoPng = await sharp(join(ROOT, "public", "images", "logo.png")).resize({ height: 220 }).png().toBuffer();
const LOGO_URI = `data:image/png;base64,${logoPng.toString("base64")}`;
const LOGO_RATIO = 1240 / 1328; // largeur / hauteur du logo source

const FONT = "'Montserrat','Segoe UI',Arial,sans-serif";

// Couleurs par famille de cours
const C = {
    w: "#ffffff", // cours collectifs
    y: "#e1c340", // smallgroups (jaune de la charte)
    g: "#9bd37a", // enfants / ados
    p: "#b5a0e0", // danse
    a: "#7cc4f0", // aqua adultes
    e: "#fbd4a0", // aqua enfants / bébés
};

/* ─── Données ─────────────────────────────────────────────────────────────────
 * Une entrée  = [nom, horaire, couleur]
 * Une ligne   = 1 à 3 entrées côte à côte, ou null si le jour n'a rien à cette
 *               ligne. Les index de lignes sont partagés entre les jours pour
 *               aligner la grille de la version bureau.
 * pauseApres  = index de la première ligne d'après-midi (trait de pause mobile)
 */

const PLANNINGS = {
    cours: {
        fichier: "planning2026",
        titre: "COURS COLLECTIFS & SMALLGROUPS & DANSE & COURS ENFANTS/ADOS",
        legende: [["COURS CO", "w"], ["SMALLGROUPS", "y"], ["ENFANTS/ADOS", "g"], ["DANSE", "p"]],
        legendeY: 682,
        pauseApres: 3,
        jours: {
            LUNDI: [
                [["SWISSBALL", "09h30-10h15", "w"], ["CARDIO BOXE", "09h30-10h15", "y"]],
                [["STRETCH", "10h15-11h15", "w"]],
                [["PILATES", "12h15-13h00", "w"]],
                null,
                null,
                [["PUMP", "18h00-18h45", "w"], ["CROSSTRAINING", "18h00-18h45", "y"]],
                [["ATTACK", "19h00-19h45", "w"], ["CROSSTRAINING", "19h00-19h45", "y"]],
                [["RPM", "20h00-20h45", "y"]],
                null,
            ],
            MARDI: [
                [["PPG", "09h30-10h15", "y"], ["ZUMBA", "09h30-10h15", "w"]],
                [["RPM", "10h30-11h15", "y"], ["STEP", "10h15-11h00", "w"]],
                null,
                null,
                null,
                [["CAF", "18h00-18h45", "w"], ["CARDIO BOXE", "18h00-18h45", "y"]],
                [["RPM", "19h00-19h45", "y"], ["CROSSTRAINING", "19h00-19h45", "y"]],
                [["PILATES", "20h00-20h45", "w"]],
                null,
            ],
            MERCREDI: [
                [["PILATES", "09h00-09h45", "w"]],
                [["RPM", "10h00-10h45", "y"]],
                [["PPG", "12h15-13h00", "y"]],
                [["PPG KID", "16h00-16h45", "g"]],
                [["PPG TEEN", "17h00-17h45", "g"]],
                [["STREET JAZZ", "18h00-19h00", "p"], ["RPM", "18h00-18h45", "y"]],
                [["SALSA 1", "19h00-20h00", "p"], ["PPG", "19h00-19h45", "y"]],
                [["SALSA 2", "20h00-21h00", "p"], ["PPG", "20h00-20h45", "y"]],
                null,
            ],
            JEUDI: [
                [["PILATES", "09h30-10h15", "w"]],
                [["PUMP", "10h30-11h15", "w"]],
                [["RPM", "12h15-13h00", "y"]],
                null,
                null,
                [["YOGA", "18h00-18h45", "w"], ["TRX", "18h00-18h45", "y"]],
                [["PUMP", "18h45-19h30", "w"]],
                [["RPM", "19h45-20h30", "y"], ["ROCK 2", "19h30-20h30", "p"]],
                [["ROCK 1", "20h30-21h30", "p"]],
            ],
            VENDREDI: [
                [["CARDIO BOXE", "09h30-10h15", "y"]],
                [["TRX", "10h30-11h15", "y"]],
                null,
                null,
                null,
                [["PPG", "18h00-18h45", "y"], ["CARDIO BOXE", "18h00-18h45", "y"]],
                [["PILATES", "19h00-19h45", "w"]],
                null,
                null,
            ],
            SAMEDI: [
                null,
                [["PUMP", "10h00-10h45", "w"], ["PPG", "10h00-10h45", "y"]],
                [["RPM", "11h00-11h45", "y"], ["PPG", "11h00-11h45", "y"]],
                null,
                null,
                null,
                null,
                null,
                null,
            ],
        },
    },

    aqua: {
        fichier: "planning2026_aqua",
        titre: "COURS AQUA ADULTES & ENFANTS",
        legende: [["ADULTES", "a"], ["ENFANTS/BÉBÉS", "e"]],
        legendeY: 450,
        pauseApres: 4,
        jours: {
            LUNDI: [
                [["AQUAGYM", "09h30-10h15", "a"]],
                [["AQUAMIX", "10h30-11h15", "a"]],
                null,
                [["AQUATRAINING", "12h15-13h00", "a"]],
                null,
                null,
                [["AQUAPOWER", "18h00-18h45", "a"]],
                [["AQUATRAINING", "19h00-19h45", "a"]],
            ],
            MARDI: [
                [["AQUAGYM", "09h30-10h15", "a"]],
                [["AQUABIKE", "10h30-11h15", "a"]],
                [["AQUATRAINING", "11h30-12h15", "a"]],
                null,
                null,
                null,
                [["AQUAMIX", "18h00-18h45", "a"]],
                [["AQUABIKE", "19h00-19h45", "a"]],
            ],
            MERCREDI: [
                [["AQUAGYM", "09h30-10h15", "a"]],
                [["AQUABIKE", "10h30-11h15", "a"]],
                [["BÉBÉS NAGEURS", "11h30-12h00", "e"]],
                null,
                [["NATATION 3-4 ANS", "17h00-17h30", "e"]],
                [["NATATION 5 ANS +", "17h30-18h00", "e"]],
                [["AQUABIKE", "18h00-18h45", "a"]],
                [["AQUATRAINING", "19h00-19h45", "a"]],
            ],
            JEUDI: [
                [["AQUAGYM", "09h30-10h15", "a"]],
                [["AQUAPOWER", "10h30-11h15", "a"]],
                [["AQUATRAINING", "11h30-12h15", "a"]],
                null,
                null,
                null,
                [["AQUAPOWER", "18h00-18h45", "a"]],
                [["AQUAMIX", "19h00-19h45", "a"]],
            ],
            VENDREDI: [
                [["AQUAGYM", "09h30-10h15", "a"]],
                [["AQUABIKE", "10h30-11h15", "a"]],
                null,
                [["AQUAPOWER", "12h15-13h00", "a"]],
                null,
                null,
                [["AQUATRAINING", "18h00-18h45", "a"]],
                null,
            ],
        },
    },
};

/* ─── Rendu ───────────────────────────────────────────────────────────────── */

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

// Largeur approximative d'un texte bold uppercase (pour réduire la police si trop long)
const fitFont = (text, size, maxW) => {
    const w = text.length * size * 0.72;
    return w > maxW ? Math.max(8, Math.floor(size * (maxW / w))) : size;
};

function carte(x, y, w, h, [nom, horaire, couleur], nomSize, horaireSize) {
    const cx = x + w / 2;
    const fs = fitFont(nom, nomSize, w - 14);
    const fh = fitFont(horaire, horaireSize, w - 10);
    return `<rect x="${x.toFixed(1)}" y="${y}" width="${w.toFixed(1)}" height="${h}" rx="9" fill="${C[couleur]}"/>
<text x="${cx.toFixed(1)}" y="${y + h / 2 - 4}" font-family=${JSON.stringify(FONT)} font-size="${fs}" font-weight="800" fill="#000" text-anchor="middle">${esc(nom)}</text>
<text x="${cx.toFixed(1)}" y="${y + h / 2 + horaireSize + 4}" font-family=${JSON.stringify(FONT)} font-size="${fh}" font-weight="600" fill="#000" text-anchor="middle">${esc(horaire)}</text>`;
}

function ligne(x, y, w, h, entrees, nomSize, horaireSize) {
    const gap = 5;
    const n = entrees.length;
    const cw = (w - gap * (n - 1)) / n;
    const shrink = n === 1 ? 1 : n === 2 ? 0.85 : 0.66;
    return entrees
        .map((e, i) => carte(x + i * (cw + gap), y, cw, h, e, Math.round(nomSize * shrink), Math.round(horaireSize * shrink)))
        .join("\n");
}

function logo(cx, y, h) {
    const w = h * LOGO_RATIO;
    return `<image x="${(cx - w / 2).toFixed(1)}" y="${y}" width="${w.toFixed(1)}" height="${h}" href="${LOGO_URI}"/>`;
}

/* ─── Version bureau (1440 × 810) ─────────────────────────────────────────── */

function genBureau(p) {
    const W = 1440, H = 810;
    const marge = 36, colGap = 14;
    const jours = Object.keys(p.jours);

    // Sur 6 colonnes la grille occupe toute la largeur ; avec moins de jours on
    // la centre, ce qui laisse la place de la légende à droite.
    const colW = (W - 2 * marge - 5 * colGap) / 6;
    const gridW = jours.length * colW + (jours.length - 1) * colGap;
    const x0 = jours.length === 6 ? marge : Math.round((W - gridW) / 2);

    const rowY0 = 182, rowH = 56, rowGap = 11;

    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="1920" height="1080">
<rect width="${W}" height="${H}" fill="#000"/>
<text x="${W / 2}" y="88" font-family=${JSON.stringify(FONT)} font-size="30" font-weight="800" fill="#fff" letter-spacing="1" text-anchor="middle">${esc(p.titre)}</text>
${logo(84, 28, 72)}
${logo(W - 84, 28, 72)}
<line x1="${x0}" y1="166" x2="${x0 + gridW}" y2="166" stroke="#fff" stroke-width="2"/>`;

    jours.forEach((jour, j) => {
        const x = x0 + j * (colW + colGap);
        s += `\n<text x="${(x + colW / 2).toFixed(1)}" y="152" font-family=${JSON.stringify(FONT)} font-size="26" font-weight="700" fill="#fff" letter-spacing="3" text-anchor="middle">${jour}</text>`;
        p.jours[jour].forEach((row, r) => {
            if (!row) return;
            s += "\n" + ligne(x, rowY0 + r * (rowH + rowGap), colW, rowH, row, 16, 13);
        });
    });

    let ly = p.legendeY;
    for (const [label, c] of p.legende) {
        s += `\n<text x="${W - marge - 46}" y="${ly + 13}" font-family=${JSON.stringify(FONT)} font-size="16" font-weight="600" fill="#9ca3af" text-anchor="end">${esc(label)}</text>
<rect x="${W - marge - 36}" y="${ly}" width="36" height="17" rx="4" fill="${C[c]}"/>`;
        ly += 28;
    }

    return s + "\n</svg>\n";
}

/* ─── Versions mobiles, une par jour (810 × 1013) ─────────────────────────── */

function genJour(p, jour) {
    const W = 810, H = 1013;
    const x0 = 50, contentW = W - 2 * x0;

    const matin = p.jours[jour].slice(0, p.pauseApres).filter(Boolean);
    const apresMidi = p.jours[jour].slice(p.pauseApres).filter(Boolean);
    const rows = [...matin, ...apresMidi];
    const n = rows.length;
    const avecPause = matin.length > 0 && apresMidi.length > 0;

    const zoneY = 210, zoneH = 700;
    const gap = 16, pauseH = 48;
    const cardH = Math.min(110, (zoneH - (n - 1) * gap - (avecPause ? pauseH : 0)) / n);
    const blockH = n * cardH + (n - 1) * gap + (avecPause ? pauseH : 0);
    let y = zoneY + (zoneH - blockH) / 2;

    const trait = (py) => `<line x1="${x0}" y1="${py}" x2="${W - x0}" y2="${py}" stroke="#fff" stroke-width="2"/>`;

    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="1080" height="1350">
<rect width="${W}" height="${H}" fill="#000"/>
<text x="${W / 2}" y="125" font-family=${JSON.stringify(FONT)} font-size="58" font-weight="800" fill="#fff" letter-spacing="6" text-anchor="middle">${jour}</text>
<rect x="${W / 2 - 60}" y="147" width="120" height="5" rx="2.5" fill="${C.y}"/>`;

    rows.forEach((row, i) => {
        if (avecPause && i === matin.length) {
            s += "\n" + trait(Math.round(y + pauseH / 2 - gap / 2));
            y += pauseH;
        }
        s += "\n" + ligne(x0, Math.round(y), contentW, Math.round(cardH), row, 27, 21);
        y += cardH + gap;
    });

    // Légende : deux entrées par ligne
    let ly = 945;
    for (let i = 0; i < p.legende.length; i += 2) {
        let lx = W / 2 - 290;
        for (const [label, c] of p.legende.slice(i, i + 2)) {
            s += `\n<rect x="${lx}" y="${ly}" width="30" height="16" rx="4" fill="${C[c]}"/>
<text x="${lx + 40}" y="${ly + 13}" font-family=${JSON.stringify(FONT)} font-size="17" font-weight="600" fill="#9ca3af">${esc(label)}</text>`;
            lx += 300;
        }
        ly += 30;
    }

    return s + "\n</svg>\n";
}

/* ─── Écriture ────────────────────────────────────────────────────────────── */

mkdirSync(OUT, { recursive: true });
for (const p of Object.values(PLANNINGS)) {
    writeFileSync(join(OUT, `${p.fichier}_bureau.svg`), genBureau(p));
    for (const jour of Object.keys(p.jours)) {
        writeFileSync(join(OUT, `${p.fichier}_${jour.toLowerCase()}.svg`), genJour(p, jour));
    }
    console.log(`${p.fichier} : 1 bureau + ${Object.keys(p.jours).length} jours`);
}
console.log("Plannings générés dans", OUT);
