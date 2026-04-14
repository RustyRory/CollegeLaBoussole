"use client";

import { useAuth } from "@/hooks/useAuth";

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  const { role, logout } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-6 dark:border-zinc-700 dark:bg-zinc-900">
      <h1 className="text-lg font-semibold text-zinc-900 dark:text-white">
        {title}
      </h1>
      <div className="flex items-center gap-4">
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {role}
        </span>
        <button
          onClick={logout}
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        >
          Déconnexion
        </button>
      </div>
    </header>
  );
}
