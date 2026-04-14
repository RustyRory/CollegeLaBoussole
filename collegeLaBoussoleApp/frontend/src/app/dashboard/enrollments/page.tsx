"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/dashboard/site-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";

type Year = { _id: string; name: string };
type Class = { _id: string; name: string };

type Enrollment = {
  _id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  parentEmail: string;
  requestedYearId: Year | string;
  status: "pending" | "approved" | "rejected";
  classId: Class | string | null;
  notes: string;
  createdAt: string;
};

const statusLabel: Record<string, string> = {
  pending: "En attente",
  approved: "Acceptée",
  rejected: "Refusée",
};

const statusVariant: Record<
  string,
  "default" | "success" | "warning" | "danger"
> = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
};

const emptyCreate = {
  firstName: "",
  lastName: "",
  birthDate: "",
  parentEmail: "",
  requestedYearId: "",
  notes: "",
};

const emptyReview = {
  status: "pending" as Enrollment["status"],
  classId: "",
  notes: "",
};

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [years, setYears] = useState<Year[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);

  // Modale création
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState(emptyCreate);
  const [createError, setCreateError] = useState<string | null>(null);

  // Modale révision (statut + classe)
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewTarget, setReviewTarget] = useState<Enrollment | null>(null);
  const [reviewForm, setReviewForm] = useState(emptyReview);
  const [reviewError, setReviewError] = useState<string | null>(null);

  // Filtre
  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");

  async function load() {
    const [e, y, c] = await Promise.all([
      apiFetch<Enrollment[]>("/enrollments"),
      apiFetch<Year[]>("/years"),
      apiFetch<Class[]>("/classes"),
    ]);
    setEnrollments(e);
    setYears(y);
    setClasses(c);
  }

  useEffect(() => {
    const fetchData = async () => {
      await load();
    };

    fetchData();
  }, []);

  // Création
  function openCreate() {
    setCreateForm(emptyCreate);
    setCreateError(null);
    setCreateOpen(true);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreateError(null);
    try {
      await apiFetch("/enrollments", { method: "POST", body: createForm });
      setCreateOpen(false);
      load();
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : "Erreur");
    }
  }

  // Révision (validation / refus / attribution de classe)
  function openReview(enrollment: Enrollment) {
    setReviewTarget(enrollment);
    setReviewForm({
      status: enrollment.status,
      classId:
        typeof enrollment.classId === "object" && enrollment.classId
          ? enrollment.classId._id
          : ((enrollment.classId as string) ?? ""),
      notes: enrollment.notes ?? "",
    });
    setReviewError(null);
    setReviewOpen(true);
  }

  async function handleReview(e: React.FormEvent) {
    e.preventDefault();
    if (!reviewTarget) return;
    setReviewError(null);
    try {
      await apiFetch(`/enrollments/${reviewTarget._id}`, {
        method: "PATCH",
        body: reviewForm,
      });
      setReviewOpen(false);
      load();
    } catch (err) {
      setReviewError(err instanceof Error ? err.message : "Erreur");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette candidature ?")) return;
    await apiFetch(`/enrollments/${id}`, { method: "DELETE" });
    load();
  }

  const yearName = (y: Year | string) => (typeof y === "object" ? y.name : y);
  const className = (c: Class | string | null) =>
    !c ? "—" : typeof c === "object" ? c.name : c;

  const filtered =
    filter === "all"
      ? enrollments
      : enrollments.filter((e) => e.status === filter);

  const counts = {
    pending: enrollments.filter((e) => e.status === "pending").length,
    approved: enrollments.filter((e) => e.status === "approved").length,
    rejected: enrollments.filter((e) => e.status === "rejected").length,
  };

  return (
    <>
      <SiteHeader title="Inscriptions" />
      <main className="flex-1 p-4">
        {/* Onglets filtre */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {(["all", "pending", "approved", "rejected"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                }`}
              >
                {f === "all" && `Toutes (${enrollments.length})`}
                {f === "pending" && `En attente (${counts.pending})`}
                {f === "approved" && `Acceptées (${counts.approved})`}
                {f === "rejected" && `Refusées (${counts.rejected})`}
              </button>
            ))}
          </div>
          <Button onClick={openCreate}>+ Nouvelle candidature</Button>
        </div>

        {/* Tableau */}
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Élève
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Date de naissance
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Email parent
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Année demandée
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Classe attribuée
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Statut
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Déposée le
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-8 text-center text-zinc-400"
                  >
                    Aucune candidature
                  </td>
                </tr>
              )}
              {filtered.map((e) => (
                <tr
                  key={e._id}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                >
                  <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">
                    {e.lastName.toUpperCase()} {e.firstName}
                  </td>
                  <td className="px-4 py-3 text-zinc-500">
                    {new Date(e.birthDate).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-3 text-zinc-500">{e.parentEmail}</td>
                  <td className="px-4 py-3 text-zinc-500">
                    {yearName(e.requestedYearId)}
                  </td>
                  <td className="px-4 py-3 text-zinc-500">
                    {className(e.classId)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant[e.status]}>
                      {statusLabel[e.status]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-zinc-500">
                    {new Date(e.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openReview(e)}
                        className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                      >
                        Traiter
                      </button>
                      <button
                        onClick={() => handleDelete(e._id)}
                        className="text-xs text-red-400 hover:text-red-600"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modale : nouvelle candidature */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Nouvelle candidature"
        className="max-w-lg"
      >
        <form onSubmit={handleCreate}>
          <FieldGroup>
            {createError && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {createError}
              </p>
            )}
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="enr-last">Nom</FieldLabel>
                <Input
                  id="enr-last"
                  required
                  placeholder="DUPONT"
                  value={createForm.lastName}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, lastName: e.target.value })
                  }
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="enr-first">Prénom</FieldLabel>
                <Input
                  id="enr-first"
                  required
                  placeholder="Marie"
                  value={createForm.firstName}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, firstName: e.target.value })
                  }
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="enr-birth">Date de naissance</FieldLabel>
              <Input
                id="enr-birth"
                type="date"
                required
                value={createForm.birthDate}
                onChange={(e) =>
                  setCreateForm({ ...createForm, birthDate: e.target.value })
                }
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="enr-email">
                Email du parent / responsable
              </FieldLabel>
              <Input
                id="enr-email"
                type="email"
                required
                placeholder="parent@exemple.fr"
                value={createForm.parentEmail}
                onChange={(e) =>
                  setCreateForm({ ...createForm, parentEmail: e.target.value })
                }
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="enr-year">
                Année scolaire souhaitée
              </FieldLabel>
              <select
                id="enr-year"
                required
                value={createForm.requestedYearId}
                onChange={(e) =>
                  setCreateForm({
                    ...createForm,
                    requestedYearId: e.target.value,
                  })
                }
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
              >
                <option value="">— Choisir —</option>
                {years.map((y) => (
                  <option key={y._id} value={y._id}>
                    {y.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field>
              <FieldLabel htmlFor="enr-notes">Notes (optionnel)</FieldLabel>
              <Input
                id="enr-notes"
                placeholder="Remarques sur la candidature..."
                value={createForm.notes}
                onChange={(e) =>
                  setCreateForm({ ...createForm, notes: e.target.value })
                }
              />
            </Field>
            <Button type="submit">Enregistrer la candidature</Button>
          </FieldGroup>
        </form>
      </Modal>

      {/* Modale : traitement de la candidature */}
      <Modal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        title={
          reviewTarget
            ? `${reviewTarget.lastName.toUpperCase()} ${reviewTarget.firstName}`
            : "Traiter la candidature"
        }
        className="max-w-lg"
      >
        <form onSubmit={handleReview}>
          <FieldGroup>
            {reviewError && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {reviewError}
              </p>
            )}
            <Field>
              <FieldLabel htmlFor="rev-status">Décision</FieldLabel>
              <select
                id="rev-status"
                value={reviewForm.status}
                onChange={(e) =>
                  setReviewForm({
                    ...reviewForm,
                    status: e.target.value as Enrollment["status"],
                  })
                }
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
              >
                <option value="pending">En attente</option>
                <option value="approved">Accepter</option>
                <option value="rejected">Refuser</option>
              </select>
            </Field>
            {reviewForm.status === "approved" && (
              <Field>
                <FieldLabel htmlFor="rev-class">
                  Attribuer une classe
                </FieldLabel>
                <select
                  id="rev-class"
                  value={reviewForm.classId}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, classId: e.target.value })
                  }
                  className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                >
                  <option value="">— Aucune classe —</option>
                  {classes.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </Field>
            )}
            <Field>
              <FieldLabel htmlFor="rev-notes">Notes internes</FieldLabel>
              <Input
                id="rev-notes"
                placeholder="Commentaire pour l'équipe..."
                value={reviewForm.notes}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, notes: e.target.value })
                }
              />
            </Field>
            <Button type="submit">Enregistrer la décision</Button>
          </FieldGroup>
        </form>
      </Modal>
    </>
  );
}
