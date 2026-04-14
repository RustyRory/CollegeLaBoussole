"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Tableau de bord", icon: "⊞" },
  { href: "/dashboard/users", label: "Utilisateurs", icon: "👥" },
  { href: "/dashboard/years", label: "Années scolaires", icon: "📅" },
  { href: "/dashboard/classes", label: "Classes", icon: "🏫" },
  { href: "/dashboard/lectures", label: "Cours", icon: "📚" },
  { href: "/dashboard/documents", label: "Documents", icon: "📄" },
  { href: "/dashboard/groups", label: "Groupes", icon: "🔗" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 flex-col border-r border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex h-16 items-center border-b border-zinc-200 px-4 dark:border-zinc-700">
        <img
          src="/assets/images/logo-light.svg"
          alt="Collège La Boussole"
          className="h-7 w-auto"
        />
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {nav.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white",
              )}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-zinc-200 p-3 dark:border-zinc-700">
        <p className="px-3 text-xs text-zinc-400">Administration</p>
      </div>
    </aside>
  );
}
