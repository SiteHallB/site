"use client"

// import Hero from "@/components/root/hero";
// import Valeurs from "@/components/root/valeurs";
// import Concept from "@/components/root/concept";
// import Histoire from "@/components/root/histoire";

import { createContext, useContext } from "react";

import { useEffect } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import Hero from "@/components/root/otherHero";
import Concept from "@/components/root/otherConcept"

// gsap.registerPlugin(ScrollTrigger)

// export default function Home() {
//   return (
//     <main className="flex flex-col bg-background-subdued space-y-[-1px]">
//       <Hero/>
//       <Valeurs/>
//       <Concept/>
//       <Histoire/>
//     </main>
//   );
// }

export default function Home() {
    return (
        <main className="relative">
            <Hero/>
            <Concept/>
        </main>
    );
}