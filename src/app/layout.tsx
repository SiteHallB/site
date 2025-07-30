import type { Metadata } from "next";
import "@/styles/globals.css";

import Menu from "@/components/menu";
import Footer from "@/components/footer";
import PopUp from "@/components/ui/pop-up";

import { LinkProvider } from "@/context/link-context";

export const metadata: Metadata = {
    title: "Hall B",
    description: "Hall B",
    icons: {
        icon: '/favicon/favicon.ico',
        shortcut: '/favicon/favicon.ico',
        apple: '/favicon/apple-touch-icon.png',
    },
};

export default function RootLayout({
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="fr">
            <body className="antialiased">
                <LinkProvider
                    links={{
                        osteo: "", 
                        adresse: "https://maps.app.goo.gl/8NkxFXwWUCSQMxDLA", 
                        instagram: "https://www.instagram.com/hallb.fr/", 
                        facebook: "https://www.facebook.com/p/HALL-B-61576081445951/", 
                        avis: "https://maps.app.goo.gl/q6AxEJa8WjfwpBVw8", 
                        pannata: "https://www.panattasport.com/fr/", 
                        technogym: "https://www.technogym.com/fr-FR/", 
                        pallini: "https://www.pallini-sport.fr/", 
                    }}
                >
                <PopUp/>
                <Menu/>
                <div className="relative w-full">
                    {children}
                    <Footer/>
                </div>
                </LinkProvider>
            </body>
        </html>
    );
}
