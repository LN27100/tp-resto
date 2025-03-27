"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { use } from "react";
import '@/app/styles/global.css'; 


interface Recipe {
  id: string;
  name: string;
  description: string;
  difficulty: number;
  time: number;
  ingredients: { name: string; quantity: string }[];
  steps: { instruction: string; ingredients: string }[];
  imageUrl?: string;
}

export default function RecipeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); 
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${id}`);
        if (response.ok) {
          const data: Recipe = await response.json();
          setRecipe(data);
        } else {
          console.error("Erreur lors de la récupération de la recette. Statut:", response.status);
          const errorData = await response.json();
          console.error("Détails de l'erreur:", errorData);
        }
      } catch (error) {
        console.error("Erreur réseau:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRecipe();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!recipe) {
    return notFound();
  }

  return (
    <section className="py-10">
      <div className="flex justify-center mt-8 space-x-40">
        <div className="border-emerald-600 border bg-gray-700 p-6 rounded shadow-md w-full max-w-lg">
          <h2 className="flex justify-center text-3xl font-bubblegum font-bold">{recipe.name}</h2>
          {recipe.imageUrl && (
            <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-64 object-cover mt-4" />
          )}
          <p className="mt-4 text-gray-400">{recipe.description}</p>
          <div className="mt-6">
            <h3 className="text-2xl text-emerald-600 font-semibold">Ingrédients</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.name} - {ingredient.quantity}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="text-2xl text-emerald-600 font-semibold">Étapes</h3>
            <ol>
              {recipe.steps.map((step, index) => (
                <li key={index}>
                  {step.instruction}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
