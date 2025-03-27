import Image from "next/image";
import '@/app/styles/global.css'; 

export default function Home() {
  return (
    <section className="py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bubblegum font-bold">Découvrez la cuisine et les recettes atypiques du chef Boubou</h1>
      </div>
      
      <div className="flex justify-center mt-8">
        <Image
          src="/images/bourriquet_regale.jpg"
          alt="Photo du restaurant Boubou Régale"
          width={400}
          height={100}
          className="rounded-lg shadow-md"
        />
      </div>
      
      <div className="flex justify-center mt-8 space-x-40">
        <div className="border-emerald-600 border rounded-lg p-8 shadow-md w-96 text-left">
          <h2 className="flex justify-center text-xl text-emerald-600 font-semibold mb-4">Horaires</h2>
          <p className="text-lg"><strong >Lundi - Vendredi :</strong> 12h00 - 15h00, 19h00 - 22h00</p>
          <p className="text-lg"><strong>Samedi :</strong> 12h00 - 23h00</p>
          <p className="text-lg"><strong>Dimanche :</strong> Fermé</p>
        </div>
        <div className="border-emerald-600 border rounded-lg p-8 shadow-md w-96 text-left">
          <h2 className="flex justify-center text-xl text-emerald-600 font-semibold mb-3">Adresse</h2>
          <p className="text-slate-300 text-lg">123 Rue de la Gastronomie</p>
          <p className="text-slate-300 text-lg">75000 Paris</p>
          <p className="text-slate-300 text-lg">Tel: 01 02 03 04 05</p>


        </div>
      </div>
    </section>
  );
}
