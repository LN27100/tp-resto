"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AddRecipeModal from "@/components/AddRecipeModal";
import '@/app/styles/global.css'; 

interface Recipe {
  id: string;
  name: string;
  description: string;
  difficulty: number;
  time: number;
  ingredients: { name: string; quantity: string }[];
  steps: { instruction: string; ingredients: string }[];
}

export default function RecipesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/recipes");
        if (response.ok) {
          const data: Recipe[] = await response.json();
          setRecipes(data);
        } else {
          console.error("Erreur lors de la récupération des recettes");
        }
      } catch (error) {
        console.error("Erreur réseau:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchRecipes();
    }
  }, [session]);

  if (status === "loading" || loading) {
    return <p>Loading...</p>;
  }

  if (!session) {
    router.push("/auth");
    return null;
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="py-10">
      <button
        onClick={openModal}
        className="cursor-pointer bg-emerald-700 hover:bg-emerald-500 text-white px-4 py-2 rounded mt-4"
      >
        Ajouter une recette
      </button>
            <div className="flex justify-center mt-8 space-x-40">
            <div className="border-emerald-600 border bg-gray-700 p-6 rounded shadow-md w-full max-w-lg">

      <h2 className="flex justify-center text-2xl text-emerald-500 font-bubblegum font-bold text-center">Nos Recettes</h2>
      
      
      <div className="mt-6 space-y-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="text-center">
            <Link href={`/recipes/${recipe.id}`} className="bg-grey-600 hover:bg-slate-600 p-2">
              {recipe.name}
            </Link>
          </div>
        ))}
      </div>
      {isModalOpen && <AddRecipeModal closeModal={closeModal} />}
      </div>
      </div>
    </section>
  );
}
