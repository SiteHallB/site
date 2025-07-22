import Valeurs from "@/components/root/valeurs";
import Hero from "@/components/root/hero";


export default function Home() {
  return (
    <div className="flex flex-col bg-background-base">
      <Hero/>
      <Valeurs/>
    </div>
  );
}