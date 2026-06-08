"use client";

import { useRef, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

type Props = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspectClass?: string;
};

export function ImageUpload({
  value,
  onChange,
  label = "Image",
  aspectClass = "aspect-video",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const token =
        typeof window !== "undefined"
          ? (localStorage.getItem("token") ?? "")
          : "";
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur upload");
      onChange(`${BASE_URL}${data.url}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </p>

      {value ? (
        <div
          className={`relative ${aspectClass} w-full overflow-hidden rounded-xl`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="h-full w-full object-cover" />
          <button
            onClick={() => onChange("")}
            className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white hover:bg-black/70"
          >
            Supprimer
          </button>
        </div>
      ) : (
        <div
          className={`${aspectClass} flex w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 text-zinc-400 hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:border-zinc-500`}
          onClick={() => inputRef.current?.click()}
        >
          <span className="text-sm">
            {uploading ? "Envoi en cours…" : "Cliquer pour choisir une image"}
          </span>
        </div>
      )}

      {!value && (
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
          disabled={uploading}
        />
      )}

      {value && (
        <button
          onClick={() => inputRef.current?.click()}
          className="text-xs text-zinc-500 underline hover:text-zinc-900 dark:hover:text-white self-start"
          disabled={uploading}
        >
          {uploading ? "Envoi…" : "Changer l'image"}
        </button>
      )}

      {value && (
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
          disabled={uploading}
        />
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
