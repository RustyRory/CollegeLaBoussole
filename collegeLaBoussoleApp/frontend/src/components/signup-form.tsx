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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("staff");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Erreur lors de la création du compte");
        return;
      }

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
                <img
                  src="/assets/images/logo-light.svg"
                  alt="Collège La Boussole"
                  className="h-10 w-auto"
                />
                <p className="text-balance text-sm text-zinc-500 dark:text-zinc-400">
                  Créer un nouveau compte
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
                  placeholder="prenom.nom@college.fr"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FieldDescription>
                  Adresse email professionnelle du membre du personnel.
                </FieldDescription>
              </Field>

              <Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirmation
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Field>
                </div>
                <FieldDescription>8 caractères minimum.</FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="role">Rôle</FieldLabel>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                >
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                  <option value="parent">Parent</option>
                  <option value="student">Élève</option>
                  <option value="other">Autre</option>
                </select>
              </Field>

              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Création..." : "Créer le compte"}
                </Button>
              </Field>

              <FieldDescription className="text-center text-xs">
                Déjà un compte ?{" "}
                <a
                  href="/login"
                  className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-white"
                >
                  Se connecter
                </a>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="relative hidden bg-white md:block">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
              <img
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
        En créant un compte, vous acceptez les{" "}
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
