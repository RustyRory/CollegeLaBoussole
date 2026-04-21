"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-zinc-700">
            Nom complet
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Jean Dupont"
            required
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-zinc-700">
            Adresse email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jean.dupont@example.fr"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-zinc-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Votre message..."
          required
          value={form.message}
          onChange={handleChange}
          className="border-input placeholder:text-muted-foreground flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:opacity-50 resize-none"
        />
      </div>

      {status === "success" && (
        <p className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
          Votre message a bien été envoyé. Nous vous répondrons rapidement.
        </p>
      )}
      {status === "error" && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
          Une erreur est survenue. Veuillez réessayer.
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="self-start bg-green-800 hover:bg-green-900 text-white px-8"
      >
        {status === "loading" ? "Envoi en cours..." : "Envoyer le message"}
      </Button>
    </form>
  );
}
