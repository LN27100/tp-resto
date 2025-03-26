"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-emerald-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">
          <Link href="/">Boubou Régale</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:underline">Accueil</Link>
            </li>
            <li>
              <Link href="/recipes" className="hover:underline">Recettes</Link>
            </li>
            <li>
              <Link href="/auth/login" className="hover:underline">Connexion</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
