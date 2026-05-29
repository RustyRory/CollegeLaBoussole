import { Mail } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="pt-16 pb-4 text-center px-6">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#1C1410]/12 bg-white/60 px-1 pr-4 py-1 mb-10">
          <div className="w-7 h-7 rounded-full bg-[#1E3A2F] flex items-center justify-center shrink-0">
            <Mail size={13} className="text-white" strokeWidth={2} />
          </div>
          <span className="text-xs text-[#1C1410]/70 font-medium">
            Collège en recherche de donations pour se développer
          </span>
        </div>
        <h1 className="fraunces text-5xl md:text-6xl lg:text-7xl leading-tight">
          Contactez-nous, nous répondrons{" "}
          <em className="text-[#C85A2A]">à votre demande au plus vite !</em>
        </h1>
      </div>
    </section>
  );
}
