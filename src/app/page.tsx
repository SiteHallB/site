import Hero from "@/components/root/hero";
import Valeurs from "@/components/root/valeurs";
import Concept from "@/components/root/concept";


export default function Home() {
  return (
    <main className="flex flex-col bg-background-subdued space-y-[-1px]">
      <Hero/>
      <Valeurs/>
      <Concept/>
    </main>
  );
}