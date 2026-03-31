import Image from "next/image";
import { Button } from "@/components/ui/button"; 

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start shadow-sm border-x">
        
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Bienvenue au Collège La Boussole
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            L interface est prête. Vous pouvez maintenant construire les outils pour les élèves et les professeurs.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          
          <Button asChild size="lg" className="rounded-full px-8">
            <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer">
               <Image
                className="mr-2 invert dark:invert-0"
                src="/vercel.svg"
                alt="Vercel logo"
                width={16}
                height={16}
              />
              Déployer
            </a>
          </Button>

          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
              Documentation
            </a>
          </Button>

        </div>
      </main>
    </div>
  );
}