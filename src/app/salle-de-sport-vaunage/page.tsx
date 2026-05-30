import { Metadata } from "next";

import SalleDeSportPage from "@/components/local/salle-de-sport-page";
import { getCommune } from "@/components/local/communes-data";

const commune = getCommune("salle-de-sport-vaunage")!;

export const metadata: Metadata = {
    title: commune.metaTitle,
    description: commune.metaDescription,
    alternates: { canonical: `https://www.hallb.fr/${commune.slug}` },
    openGraph: {
        title: commune.metaTitle,
        description: commune.metaDescription,
        url: `https://www.hallb.fr/${commune.slug}`,
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return <SalleDeSportPage commune={commune} />;
}
