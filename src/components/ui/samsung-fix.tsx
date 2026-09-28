"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Mode sombre forcé de Samsung Internet
 * -------------------------------------
 * Ce navigateur ignore color-scheme et « assombrit » lui-même la page : fonds
 * CSS et images sont foncés (le jaune vire au marron, le logo blanc au gris),
 * le texte noir passe en blanc. Seuls le contenu des <canvas> et le texte en
 * background-clip:text restent intacts (testé sur téléphone, /test-samsung).
 *
 * Le script SAMSUNG_FIX_SCRIPT (dans <head>) pose la classe `sb-fix` sur <html>
 * pour Samsung Internet uniquement (?sbfix=1 pour tester ailleurs, ?sbfix=0 pour
 * désactiver). Sans cette classe, ces composants ne dessinent rien et restent
 * masqués : aucun effet sur les autres navigateurs. Styles : globals.css.
 */

export const SAMSUNG_FIX_SCRIPT =
    "try{var q=location.search;" +
    "if(/sbfix=1/.test(q)||(/SamsungBrowser/i.test(navigator.userAgent)&&!/sbfix=0/.test(q)))" +
    "document.documentElement.classList.add('sb-fix')}catch(e){}";

function isActive() {
    return document.documentElement.classList.contains("sb-fix");
}

function prepareCanvas(canvas: HTMLCanvasElement, width: number, height: number) {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    return ctx;
}

/**
 * Fond jaune peint dans un canvas, à placer en premier enfant d'un élément
 * `accentSurface` (le texte va dans un `accentInk`).
 */
export function AccentFill({ color = "#E1C340" }: { color?: string }) {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        const parent = canvas?.parentElement;
        if (!canvas || !parent || !isActive()) return;

        const draw = () => {
            const w = parent.clientWidth;
            const h = parent.clientHeight;
            const ctx = prepareCanvas(canvas, w, h);
            if (!ctx) return;
            // Rayons réels de l'élément (rounded-full = rayon « infini » → borné)
            const cs = getComputedStyle(parent);
            const max = Math.min(w, h) / 2;
            const r = (v: string) => Math.min(parseFloat(v) || 0, max);
            const tl = r(cs.borderTopLeftRadius), tr = r(cs.borderTopRightRadius);
            const br = r(cs.borderBottomRightRadius), bl = r(cs.borderBottomLeftRadius);
            ctx.beginPath();
            ctx.moveTo(tl, 0);
            ctx.arcTo(w, 0, w, h, tr);
            ctx.arcTo(w, h, 0, h, br);
            ctx.arcTo(0, h, 0, 0, bl);
            ctx.arcTo(0, 0, w, 0, tl);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
        };

        draw();
        const ro = new ResizeObserver(draw);
        ro.observe(parent);
        return () => ro.disconnect();
    }, [color]);

    return <canvas ref={ref} aria-hidden="true" className="accentFill" />;
}

/**
 * Enveloppe une image (ex. le logo) : sous Samsung, l'image est redessinée
 * dans un canvas superposé pour garder sa vraie luminosité.
 */
export function CanvasImage({ src, children }: { src: string; children: React.ReactNode }) {
    const wrapper = useRef<HTMLSpanElement>(null);
    const ref = useRef<HTMLCanvasElement>(null);
    const [drawn, setDrawn] = useState(false);

    useEffect(() => {
        const canvas = ref.current;
        const box = wrapper.current;
        if (!canvas || !box || !isActive()) return;

        const img = new Image();
        let ready = false;
        const draw = () => {
            if (!ready) return;
            const w = box.clientWidth;
            const h = box.clientHeight;
            const ctx = prepareCanvas(canvas, w, h);
            if (!ctx) return;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, 0, 0, w, h);
            setDrawn(true);
        };
        img.onload = () => { ready = true; draw(); };
        img.src = src;

        const ro = new ResizeObserver(draw);
        ro.observe(box);
        return () => ro.disconnect();
    }, [src]);

    return (
        <span ref={wrapper} className={"canvasImage" + (drawn ? " canvasImageDrawn" : "")}>
            {children}
            <canvas ref={ref} aria-hidden="true" className="canvasImageLayer" />
        </span>
    );
}
