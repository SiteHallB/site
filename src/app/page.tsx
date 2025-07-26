"use client"

import Hero from "@/components/root/otherHero";
import Concept from "@/components/root/otherConcept2";
import SeanceGratuite from "@/components/root/seance-gratuite";
import Histoire from "@/components/root/otherHistoire";
import Valeurs from "@/components/root/valeurs";

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
            <SeanceGratuite/>
            <Histoire/>
            {/* <Valeurs/> */}
        </main>
    );
}