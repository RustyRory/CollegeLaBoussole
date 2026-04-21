"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Icon } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

type NavItem = {
  title: string;
  url: string;
  icon?: Icon;
};

export function Navbar({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-800 rounded-lg flex items-center justify-center text-white font-bold">
            B
          </div>
          <span className="font-bold text-xl tracking-tight text-zinc-900">
            La Boussole
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <Link
                key={item.title}
                href={item.url}
                className={`text-sm font-medium transition-colors hover:text-green-800 flex items-center gap-2 ${
                  isActive ? "text-green-800" : "text-zinc-600"
                }`}
              >
                {item.icon && <item.icon size={18} />}
                {item.title}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Si 'variant' cause toujours une erreur, essaie sans pour tester */}
          <Button variant="ghost" className="hidden sm:flex text-zinc-900">
            Connexion
          </Button>
          <Button className="bg-green-800 hover:bg-green-900 text-white">
            S'inscrire
          </Button>
        </div>
      </div>
    </nav>
  );
}
