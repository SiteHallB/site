import type { Metadata } from "next";
import "@/styles/globals.css";

import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";

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
        className="antialiased"
      >
        <NavigationBar/>
        <div className="flex flex-col">
          {children}
          <Footer/>
        </div>
      </body>
    </html>
  );
}
