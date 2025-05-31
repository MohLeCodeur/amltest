// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import Header from "./Header"; 
// ASSUREZ-VOUS QUE LE NOM DU FICHIER EST CORRECT (ConnectionContext ou ConnexionContext)
import { ConnectionProvider } from "@/context/ConnectionContext"; 

const poppins = Poppins({ subsets: ["latin"], weight: ['400', '600', '800'] });

export const metadata: Metadata = {
  title: "Trust Wallet",
  description: "The AML Check platform automates AML/KYC procedures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/trustwallet.png" type="image/png" />
      </head>
      <body className={poppins.className}>
        <ConnectionProvider> 
          <Header /> 
          <ThirdwebProvider>
            {/* PAS DE <main> ici pour l'instant, laissons page.tsx gérer sa propre structure principale */}
            {children} 
          </ThirdwebProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}