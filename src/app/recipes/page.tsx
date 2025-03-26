import Link from "next/link";

const recipes = [
  { id: 1, name: "Omelette couverture" },
  { id: 2, name: "Brocolis clown" },
  { id: 3, name: "Le chat à plat" },
  { id: 4, name: "Pizza smiley" },
  { id: 5, name: "Nounouille le lion" },
  { id: 6, name: "Bonhomme de riz" },
  { id: 7, name: "Carotte poisson" },



];

export default function RecipesPage() {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-center">Nos Recettes</h2>
      <div className="mt-6 space-y-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="text-center">
            <Link href={`/recipes/${recipe.id}`} className="text-emerald-500 hover:underline">
              {recipe.name}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
