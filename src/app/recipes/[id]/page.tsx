import { notFound } from "next/navigation";

const recipes = [
  { id: 1, name: "Omelette couverture", description: "La douceur de l'ours recouvert d'une succulente omelette" },
  { id: 2, name: "Brocolis clown", description: "Un peu d'humour pour faire passer le vert !" },
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
