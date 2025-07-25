import type { Metadata } from "next";
import "@/styles/globals.css";

import Menu from "@/components/menu";
import Transition from "@/components/transition";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Hall B",
  description: "Hall B",
  openGraph: {
    images: [
      {
        url: "https://res.cloudinary.com/dsm7uifdv/image/upload/v1753139358/logo-hallb_ksd6aa.png", 
        width: 1240,
        height: 1328,
        alt: ""
      }
    ]
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
                <Transition/>
                <div className="relative">
                    {children}
                    <Footer/>
                </div>
            </body>
        </html>
    );
}
