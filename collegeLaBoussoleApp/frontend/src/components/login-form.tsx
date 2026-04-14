"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Erreur de connexion");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", email);
      router.push("/dashboard");
    } catch {
      setError("Impossible de contacter le serveur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <Image
                  src="/assets/images/logo-light.svg"
                  alt="Collège La Boussole"
                  className="h-10 w-auto"
                />
                <p className="text-balance text-sm text-zinc-500 dark:text-zinc-400">
                  Connectez-vous à votre espace
                </p>
              </div>

              {error && (
                <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  {error}
                </div>
              )}

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="college@laboussole.fr"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>

              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Connexion..." : "Se connecter"}
                </Button>
              </Field>

              <FieldDescription className="text-center text-xs">
                Accès réservé au personnel du collège.
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="relative hidden bg-white md:block">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
              <Image
                src="/assets/images/logo.svg"
                alt="Collège La Boussole"
                className="h-20 w-auto"
              />
              <p className="text-sm text-zinc-400">
                Plateforme numérique du Collège La Boussole
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center text-xs">
        En vous connectant, vous acceptez les{" "}
        <a
          href="#"
          className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-white"
        >
          conditions d&apos;utilisation
        </a>
        .
      </FieldDescription>
    </div>
  );
}
