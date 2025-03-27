"use client";

import { SessionProvider } from "next-auth/react"; 
import "@/app/styles/global.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen">
        <SessionProvider>
          <Header />
          <main className="flex-grow container mx-auto p-4">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
