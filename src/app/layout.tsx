import type { Metadata } from "next";
import "@/styles/globals.css";

import Menu from "@/components/menu";
import Transition from "@/components/transition";
import Footer from "@/components/footer";

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
                <Menu/>
                {/* <Transition/> */}
                <div className="relative w-full">
                    {children}
                    <Footer/>
                </div>
            </body>
        </html>
    );
}
