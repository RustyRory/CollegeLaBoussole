"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "La pédagogie", href: "/pedagogie" },
  { label: "L'établissement", href: "/college" },
  { label: "Faire un don", href: "/don" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F5F0E8]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/logo.svg"
            alt="Collège La Boussole"
            width={80}
            height={32}
            className="h-8 w-auto"
            unoptimized
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[#C85A2A] ${
                pathname === link.href ? "text-[#C85A2A]" : "text-[#1C1410]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center justify-center rounded-full bg-[#C85A2A] px-5 py-2 text-sm font-medium text-white hover:bg-[#B04E24] transition-colors"
          >
            Nous contacter
          </Link>

          <button
            className="md:hidden p-2 rounded-md text-[#1C1410]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#F5F0E8] border-t border-[#E0D9CF] px-6 pb-4">
          <nav className="flex flex-col gap-4 pt-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href ? "text-[#C85A2A]" : "text-[#1C1410]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-[#C85A2A] px-5 py-2 text-sm font-medium text-white hover:bg-[#B04E24] transition-colors w-fit mt-2"
            >
              Nous contacter
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
