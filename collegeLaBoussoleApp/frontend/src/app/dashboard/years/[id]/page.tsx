"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";

type Year = {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: "active" | "archived" | "future";
};

type ClassInYear = {
  _id: string;
  name: string;
  teacherId: { _id: string; email: string } | string;
  studentCount: number;
};

const statusLabel: Record<string, string> = {
  active: "Active",
  archived: "Archivée",
  future: "À venir",
};

const statusVariant: Record<string, "success" | "default" | "warning"> = {
  active: "success",
  archived: "default",
  future: "warning",
};

type Tab = "info" | "classes";

export default function YearDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [year, setYear] = useState<Year | null>(null);
  const [classes, setClasses] = useState<ClassInYear[]>([]);
  const [tab, setTab] = useState<Tab>("info");

  // Formulaire info
  const [infoForm, setInfoForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "future",
  });
  const [infoSaving, setInfoSaving] = useState(false);
  const [infoError, setInfoError] = useState<string | null>(null);
  const [infoSuccess, setInfoSuccess] = useState(false);

  async function load() {
    const [y, c] = await Promise.all([
      apiFetch<Year>(`/years/${id}`),
      apiFetch<ClassInYear[]>(`/years/${id}/classes`),
    ]);
    setYear(y);
    setClasses(c);
    setInfoForm({
      name: y.name,
      startDate: y.startDate.slice(0, 10),
      endDate: y.endDate.slice(0, 10),
      status: y.status,
    });
  }

  useEffect(() => {
    load();
  }, [id]);

  async function handleInfoSave(e: React.FormEvent) {
    e.preventDefault();
    setInfoSaving(true);
    setInfoError(null);
    setInfoSuccess(false);
    try {
      await apiFetch(`/years/${id}`, { method: "PATCH", body: infoForm });
      setInfoSuccess(true);
      load();
    } catch (err) {
      setInfoError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setInfoSaving(false);
    }
  }

  const teacherEmail = (t: ClassInYear["teacherId"]) =>
    typeof t === "object" ? t.email : t;

  const totalStudents = classes.reduce((sum, c) => sum + c.studentCount, 0);

  if (!year) {
    return (
      <>
        <SiteHeader title="Chargement..." />
        <div className="flex flex-1 items-center justify-center p-8">
          <p className="text-sm text-muted-foreground">Chargement...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <SiteHeader title={year.name}>
        <button
          onClick={() => router.back()}
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
        >
          ← Retour
        </button>
      </SiteHeader>

      <main className="flex-1 p-4">
        {/* Onglets */}
        <div className="mb-6 flex gap-1 border-b border-zinc-200 dark:border-zinc-700">
          {(["info", "classes"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                tab === t
                  ? "border-b-2 border-zinc-900 text-zinc-900 dark:border-white dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              {t === "info" && "Informations"}
              {t === "classes" &&
                `Classes (${classes.length}) · ${totalStudents} élève${totalStudents !== 1 ? "s" : ""}`}
            </button>
          ))}
        </div>

        {/* Onglet Informations */}
        {tab === "info" && (
          <div className="max-w-lg">
            <form onSubmit={handleInfoSave}>
              <FieldGroup>
                {infoError && (
                  <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                    {infoError}
                  </p>
                )}
                {infoSuccess && (
                  <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-600">
                    Modifications enregistrées.
                  </p>
                )}
                <Field>
                  <FieldLabel htmlFor="y-name">Nom</FieldLabel>
                  <Input
                    id="y-name"
                    required
                    placeholder="2025-2026"
                    value={infoForm.name}
                    onChange={(e) =>
                      setInfoForm({ ...infoForm, name: e.target.value })
                    }
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field>
                    <FieldLabel htmlFor="y-start">Début</FieldLabel>
                    <Input
                      id="y-start"
                      type="date"
                      required
                      value={infoForm.startDate}
                      onChange={(e) =>
                        setInfoForm({ ...infoForm, startDate: e.target.value })
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="y-end">Fin</FieldLabel>
                    <Input
                      id="y-end"
                      type="date"
                      required
                      value={infoForm.endDate}
                      onChange={(e) =>
                        setInfoForm({ ...infoForm, endDate: e.target.value })
                      }
                    />
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="y-status">Statut</FieldLabel>
                  <select
                    id="y-status"
                    value={infoForm.status}
                    onChange={(e) =>
                      setInfoForm({ ...infoForm, status: e.target.value })
                    }
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                  >
                    <option value="future">À venir</option>
                    <option value="active">Active</option>
                    <option value="archived">Archivée</option>
                  </select>
                </Field>
                <Button type="submit" disabled={infoSaving}>
                  {infoSaving ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </FieldGroup>
            </form>
          </div>
        )}

        {/* Onglet Classes */}
        {tab === "classes" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-500">
                {classes.length} classe{classes.length !== 1 ? "s" : ""} ·{" "}
                {totalStudents} élève{totalStudents !== 1 ? "s" : ""} au total
              </p>
              <Link href="/dashboard/classes">
                <Button variant="outline" size="sm">
                  Gérer les classes
                </Button>
              </Link>
            </div>

            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
              <table className="w-full text-sm">
                <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-zinc-500">
                      Classe
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-zinc-500">
                      Professeur principal
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-zinc-500">
                      Élèves
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-zinc-500">
                      Statut
                    </th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {classes.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-zinc-400"
                      >
                        Aucune classe pour cette année
                      </td>
                    </tr>
                  )}
                  {classes.map((c) => (
                    <tr
                      key={c._id}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    >
                      <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">
                        {c.name}
                      </td>
                      <td className="px-4 py-3 text-zinc-500">
                        {teacherEmail(c.teacherId)}
                      </td>
                      <td className="px-4 py-3 text-zinc-500">
                        <Badge
                          variant={c.studentCount > 0 ? "default" : "outline"}
                        >
                          {c.studentCount} élève
                          {c.studentCount !== 1 ? "s" : ""}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={statusVariant[year.status]}>
                          {statusLabel[year.status]}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/dashboard/classes/${c._id}`}
                          className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                        >
                          Voir la classe →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
