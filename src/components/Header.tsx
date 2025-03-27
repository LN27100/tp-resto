"use client";
import Link from "next/link";
import Image from "next/image";
import '@/app/styles/global.css'; 

export default function Header() {
  return (
    <header className="bg-emerald-800 text-white py-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image
            src="/images/logo-boubou.png"
            alt="logo Boubou Régale"
            width={80}
            height={30}
            className="-ml-10 mt-1 scale-120" 
          />
          <h1 className="text-3xl font-bubblegum font-bold">
          Boubou Régale
          </h1>
        </div>
        <nav>
          <ul className="flex text-xl space-x-6">
            <li>
              <Link href="/" className="hover:bg-emerald-700 p-2">Accueil</Link>
            </li>
            <li>
              <Link href="/recipes" className="hover:bg-emerald-700 p-2">Recettes</Link>
            </li>
            <li>
              <Link href="/auth" className="hover:bg-emerald-700 p-2">Connexion</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
