import React, { useState } from 'react';

export default function VideoBackground({ videoId }: { videoId: string }) {
  const [loaded, setLoaded] = useState(false);

  const params = new URLSearchParams({
    autoplay:        '1',       // autoplay
    mute:            '1',       // muet
    loop:            '1',       // loop
    playlist:        videoId,   // pour le loop
    controls:        '0',       // pas de contrôles
    modestbranding:  '1',       // pas de logo
    rel:             '0',       // pas de suggestions
    iv_load_policy:  '3',       // pas d’annotations
    disablekb:       '1',       // désactive le clavier
    start:           '1',       // saute la 1re seconde (overlay YouTube)
    vq:              'hd1080',  // hint 1080p
  }).toString();

  const src = `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* overlay noir tant que l’iframe n’est pas ready */}
      {!loaded && <div className="absolute inset-0 bg-black z-10" />}
      <iframe
        className="absolute top-0 left-0 w-full h-full object-cover object-center"
        src={src}
        frameBorder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        title="Background video"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

// "use client"

// import videoData from "@/interface/videos.json"
// import { useEffect, useState, useRef } from "react";

// export default function VideoBackground({ id }: { id: string }) {
//     const [isLoaded, setIsLoaded] = useState(false);

//     const video = videoData.find(v => v.id === id);
//     if (video === undefined) {
//         console.log("Aucune vidéo de présentation")
//         return;
//     }

//     return (
//         <div className="min-w-full h-full overflow-hidden">
//             <video src={video.path}
//                 poster="/images/concept.jpg"
//                 playsInline
//                 muted
//                 autoPlay
//                 loop
//                 className="size-full object-cover object-center"
//             />
//         </div>
//     );
// }