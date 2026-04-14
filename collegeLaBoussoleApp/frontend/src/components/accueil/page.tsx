import {Button} from "@/components/ui/button";
import StatCard from "@/components/ui/StatCard";
import FaqItem from "@/components/ui/FaqItem";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-900 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="px-6 py-20 flex flex-col items-center text-center max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8 max-w-3xl">
          Un collège à taille humaine, qui redonne du sens à l'apprentissage.
        </h1>
        <Button asChild className="mb-16">Découvrir le projet</Button>
        
        {/* Les 2 grandes images du haut */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div className="flex flex-col gap-4">
            <div className="aspect-video bg-amber-100 rounded-2xl flex items-center justify-center">
              <span className="text-amber-600 text-3xl">🖼️</span>
            </div>
            <h3 className="font-semibold text-left">Texte d'accroche 1</h3>
            <p className="text-sm text-gray-500 text-left">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, ad maxime saepe hic vitae fugiat repellendus magni? Aspernatur aperiam sapiente eveniet provident obcaecati sequi ipsa!</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="aspect-video bg-amber-100 rounded-2xl flex items-center justify-center">
              <span className="text-amber-600 text-3xl">🖼️</span>
            </div>
            <h3 className="font-semibold text-left">Texte d'accroche 2</h3>
            <p className="text-sm text-gray-500 text-left">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, ad maxime saepe hic vitae fugiat repellendus magni? Aspernatur aperiam sapiente eveniet provident obcaecati sequi ipsa!</p>
          </div>
        </div>
      </section>

      {/* 2. PÉDAGOGIE SECTION */}
      <section className="bg-[#FAF7F2] py-20 px-6">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-8">Une pédagogie innovante pour les élèves d'aujourd'hui</h2>
          
          <div className="bg-amber-100/50 p-8 rounded-3xl w-full flex flex-col md:flex-row items-center gap-8 text-left mb-8">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-4">Garder l'élève au cœur de son apprentissage</h3>
              <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo consequuntur sit deleniti omnis quisquam nesciunt fuga hic debitis molestias exercitationem quam inventore, rerum nulla voluptas.</p>
              <a href="#" className="text-green-800 font-semibold hover:underline">Découvrir la pédagogie →</a>
            </div>
            <div className="w-full md:w-1/2 aspect-square bg-white rounded-2xl flex items-center justify-center shadow-sm">
               <span className="text-gray-400 text-3xl">🖼️</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATISTIQUES SECTION */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Des résultats probants qui parlent de nous-mêmes</h2>
        <p className="text-gray-500 mb-12">Découvrez en chiffres l'impact de notre accompagnement.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard number="99%" label="Taux de réussite" description="" />
          <StatCard number="25M+" label="Heures de cours" description="Dispensées par nos professeurs." />
          <StatCard number="180+" label="Élèves accompagnés" description="Depuis la création de l'établissement." />
          <StatCard number="75%" label="Mention Bien ou +" description="Obtenues par nos élèves au brevet." />
        </div>
      </section>

      {/* 4. ENCADREMENT SECTION */}
      <section className="py-20 px-6 max-w-5xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-12 text-center">Un encadrement de choix pour votre apprentissage</h2>
        <div className="w-full aspect-[21/9] bg-amber-100 rounded-3xl flex items-center justify-center mb-12">
           <span className="text-amber-600 text-5xl">🖼️</span>
        </div>
      </section>

      {/* 5. PARTENAIRES SECTION */}
      <section className="py-12 px-6 bg-gray-50 border-y border-gray-100 text-center">
        <h3 className="text-lg font-semibold mb-8">Nos partenaires de confiance</h3>
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="w-24 h-24 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-gray-400">🖼️</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-center">Vous avez des questions ?</h2>
        <p className="text-gray-500 mb-12 text-center">Nous vous répondons.</p>
        
        <div className="flex flex-col gap-2">
          <FaqItem question="Comment inscrire mon enfant ?" />
          <FaqItem question="Quels sont les tarifs de scolarité ?" />
          <FaqItem question="Proposez-vous une cantine scolaire ?" />
          <FaqItem question="Quelles sont les options disponibles (langues, sport) ?" />
        </div>
      </section>

      {/* 7. BOTTOM CTA SECTION */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto bg-green-50 rounded-3xl p-12">
          <h2 className="text-2xl font-bold mb-6">Maintenant que vous nous connaissez, avançons ensemble.</h2>
          <Button asChild>S'inscrire</Button>
        </div>
      </section>

    </div>
  );
}