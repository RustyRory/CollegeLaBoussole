"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Le collège", href: "/college" },
  { label: "Pédagogie", href: "/pedagogie" },
  { label: "Faire un don", href: "/don" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/logo.svg"
            alt="Collège La Boussole"
            width={80}
            height={32}
            className="h-8 w-auto"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-green-800 ${
                pathname === link.href ? "text-green-800" : "text-zinc-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-md bg-green-800 px-4 py-2 text-sm font-medium text-white hover:bg-green-900 transition-colors"
        >
          Connexion
        </Link>
      </div>
    </nav>
  );
}
