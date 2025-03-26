import Image from "next/image";

export default function Home() {
  return (
    <section className="py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Découvrez la cuisine et les recettes atypiques du chef Boubou</h1>
      </div>
      <div className="flex justify-center mt-8">
        <Image
          src="/images/bourriquet_regale.jpg"
          alt="Photo du restaurant Boubou Régale"
          width={200}
          height={100}
          className="rounded-lg shadow-md"
        />
      </div>
      <div className="text-center mt-8">
        <a href="/recipes" className="bg-emerald-600 text-white px-6 py-2 rounded">
          Voir les recettes
        </a>
      </div>
      <div className="flex justify-center mt-8 space-x-40">
        <div className="border rounded-lg p-8 shadow-md w-96 text-left">
          <h2 className="text-2xl font-semibold mb-4">Horaires</h2>
          <p className="text-lg"><strong>Lundi - Vendredi :</strong> 12h00 - 15h00, 19h00 - 22h00</p>
          <p className="text-lg"><strong>Samedi :</strong> 12h00 - 23h00</p>
          <p className="text-lg"><strong>Dimanche :</strong> Fermé</p>
        </div>
        <div className="text-left">
          <h2 className="text-2xl font-semibold mb-4">Adresse</h2>
          <p className="text-gray-400 text-lg">123 Rue de la Gastronomie, 75000 Paris</p>
        </div>
      </div>
    </section>
  );
}
