"use client"

import Hero from "@/components/root/hero";
import Valeurs from "@/components/root/valeurs";
import Concept from "@/components/root/concept";
import Histoire from "@/components/root/histoire";

import Clickable from "@/components/ui/clickable";

export default function Home() {
  return (
    <main className="flex flex-col bg-background-subdued space-y-[-1px]">
      <Hero/>
      <Valeurs/>
      <Concept/>
      <Histoire/>
      <Clickable 
        clickableType={{type: "button", onClick: () => console.log("yes")}}
        style={{variant: "navigationBar", color: "accent"}}
      >
        Je m'inscris
      </Clickable>
    </main>
  );
}