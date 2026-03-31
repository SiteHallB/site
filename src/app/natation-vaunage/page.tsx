import { Metadata } from "next";

import NatationVaunage from "@/components/natation-vaunage/natation-vaunage";

export const metadata: Metadata = {
    title: "HALL B - Natation Enfant Vaunage", 
    description: "Cours de natation en vaunage - Piscine intérieure à Saint Dionisy.",
};

export default function Page() {
    return <NatationVaunage/>
}