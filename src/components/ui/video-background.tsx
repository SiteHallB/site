"use client";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type Props = {
  // MP4 progressif (H.264, sans audio, faststart) : qualité fixe dès la 1re image.
  // Pas de HLS : sur une boucle de 15-25 s, l'ABR démarrait en 360p et n'avait
  // pas le temps de monter avant la fin — la boucle rejouait ensuite le flou.
  src: string;
  poster?: string;
  className: string;
  // Media query qui détermine si CE flux doit être chargé (ex. "(min-width: 768px)").
  // Évite de télécharger les deux vidéos (mobile + desktop) du hero en même temps.
  activeQuery?: string;
};

export default function BackgroundVideo({
  src,
  poster,
  className,
  activeQuery,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);
  const [showPoster, setShowPoster] = useState(true); // overlay visible tant que la vidéo ne joue pas

  // Ne renseigne la src que si ce flux correspond à la taille d'écran active.
  useEffect(() => {
    const mql = activeQuery ? window.matchMedia(activeQuery) : null;
    const update = () => {
      if (!mql || mql.matches) setActive(true);
    };
    update();
    mql?.addEventListener("change", update);
    return () => mql?.removeEventListener("change", update);
  }, [activeQuery]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !active) return;

    // iOS/Safari : ces flags AVANT le chargement
    video.muted = true;
    video.playsInline = true;

    const onPlaying = () => setShowPoster(false);
    const onCanPlay = () => {
      // autoplay refusé (mode économie d'énergie…) → l'overlay reste, pas de crash
      video.play().catch(() => {});
    };
    video.addEventListener("playing", onPlaying);
    video.addEventListener("canplay", onCanPlay);
    if (!video.paused) setShowPoster(false);

    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("canplay", onCanPlay);
    };
  }, [active, src]);

  if (failed) {
    // Fallback image simple
    return (
      <div className={clsx(className, "absolute inset-0")}>
        {poster && (
          <img
            src={poster}
            alt=""
            className="w-full h-full object-cover pointer-events-none select-none"
            draggable={false}
          />
        )}
      </div>
    );
  }

  return (
    <div className={clsx(className, "absolute inset-0")}>
      {/* Overlay poster fiable (indépendant de <video poster>), fondu une fois la vidéo lancée */}
      {poster && (
        <img
          src={poster}
          alt=""
          className={clsx(
            "absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-10 transition-opacity duration-700",
            showPoster ? "opacity-100" : "opacity-0"
          )}
          draggable={false}
        />
      )}

      <video
        ref={videoRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        src={active ? src : undefined}
        autoPlay
        muted
        playsInline
        loop
        controls={false}
        controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
        disablePictureInPicture
        preload={active ? "auto" : "none"}
        onError={() => {
          if (active) setFailed(true);
        }}
      />
    </div>
  );
}
