import { notFound } from "next/navigation";

const recipes = [
  { id: 1, name: "Spaghetti Carbonara", description: "Un classique ita-lien." },
  { id: 2, name: "Poulet Basquaise", description: "Un plat savoureux du sud-ouest." },
];

export default function RecipeDetail({ params }: { params: { id: string } }) {
  const recipe = recipes.find((r) => r.id.toString() === params.id);

  if (!recipe) return notFound();

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold">{recipe.name}</h2>
      <p className="mt-4 text-gray-600">{recipe.description}</p>
    </section>
  );
}
