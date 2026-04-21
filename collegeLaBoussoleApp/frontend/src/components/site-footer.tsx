import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Le collège", href: "/college" },
  { label: "Pédagogie", href: "/pedagogie" },
  { label: "Faire un don", href: "/don" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", icon: "f" },
  { label: "Instagram", href: "#", icon: "in" },
  { label: "LinkedIn", href: "#", icon: "li" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white px-6 py-12">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Logo + description */}
          <div className="flex flex-col gap-3 max-w-xs">
            <Image
              src="/images/logo.svg"
              alt="Collège La Boussole"
              width={80}
              height={32}
              className="h-8 w-auto"
            />
            <p className="text-sm text-gray-500">
              Un collège à taille humaine qui redonne du sens à l'apprentissage.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400 mb-1">
              Navigation
            </p>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-zinc-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400 mb-1">
              Contact
            </p>
            <p className="text-sm text-gray-600">
              contact@collegelaboussole.org
            </p>
            <p className="text-sm text-gray-600">01 23 45 67 89</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-100 pt-6">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Collège La Boussole. Tous droits
            réservés.
          </p>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-500 hover:bg-green-800 hover:text-white transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            <Link
              href="#"
              className="text-xs text-gray-400 hover:text-zinc-700 transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="#"
              className="text-xs text-gray-400 hover:text-zinc-700 transition-colors"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
