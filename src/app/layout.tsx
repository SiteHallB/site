import type { Metadata } from "next";
import "@/styles/globals.css";

import NavigationBar from "@/components/navigation-bar";

export const metadata: Metadata = {
  title: "Hall B",
  description: "Le site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className="font-montserrat antialiased"
      >
        <NavigationBar/>
        {children}
      </body>
    </html>
  );
}
