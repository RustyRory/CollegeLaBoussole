"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
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

const statusBadge: Record<string, "success" | "default" | "warning"> = {
  active: "success",
  archived: "default",
  future: "warning",
};

const statusLabel: Record<string, string> = {
  active: "Active",
  archived: "Archivée",
  future: "À venir",
};

const empty = { name: "", startDate: "", endDate: "", status: "future" };

export default function YearsPage() {
  const [years, setYears] = useState<Year[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editYear, setEditYear] = useState<Year | null>(null);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const data = await apiFetch<Year[]>("/years");
    setYears(data);
  }

  useEffect(() => {
    const fetchData = async () => {
      await load();
    };

    fetchData();
  }, []);

  function openCreate() {
    setEditYear(null);
    setForm(empty);
    setError(null);
    setModalOpen(true);
  }

  function openEdit(y: Year) {
    setEditYear(y);
    setForm({
      name: y.name,
      startDate: y.startDate.slice(0, 10),
      endDate: y.endDate.slice(0, 10),
      status: y.status,
    });
    setError(null);
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      if (editYear) {
        await apiFetch(`/years/${editYear._id}`, {
          method: "PATCH",
          body: form,
        });
      } else {
        await apiFetch("/years", { method: "POST", body: form });
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette année scolaire ?")) return;
    await apiFetch(`/years/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <>
      <SiteHeader title="Années scolaires" />
      <main className="flex-1 p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-zinc-500">{years.length} année(s)</p>
          <Button onClick={openCreate}>+ Nouvelle année</Button>
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Nom
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Début
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Fin
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Statut
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {years.map((y) => (
                <tr
                  key={y._id}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                >
                  <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">
                    {y.name}
                  </td>
                  <td className="px-4 py-3 text-zinc-500">
                    {new Date(y.startDate).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-3 text-zinc-500">
                    {new Date(y.endDate).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusBadge[y.status]}>
                      {statusLabel[y.status]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/dashboard/years/${y._id}`}
                        className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                      >
                        Voir
                      </Link>
                      <button
                        onClick={() => openEdit(y)}
                        className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(y._id)}
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

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editYear ? "Modifier l'année" : "Nouvelle année scolaire"}
      >
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}
            <Field>
              <FieldLabel htmlFor="y-name">Nom</FieldLabel>
              <Input
                id="y-name"
                required
                placeholder="2025-2026"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="y-start">Début</FieldLabel>
                <Input
                  id="y-start"
                  type="date"
                  required
                  value={form.startDate}
                  onChange={(e) =>
                    setForm({ ...form, startDate: e.target.value })
                  }
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="y-end">Fin</FieldLabel>
                <Input
                  id="y-end"
                  type="date"
                  required
                  value={form.endDate}
                  onChange={(e) =>
                    setForm({ ...form, endDate: e.target.value })
                  }
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="y-status">Statut</FieldLabel>
              <select
                id="y-status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
              >
                <option value="future">À venir</option>
                <option value="active">Active</option>
                <option value="archived">Archivée</option>
              </select>
            </Field>
            <Button type="submit">{editYear ? "Enregistrer" : "Créer"}</Button>
          </FieldGroup>
        </form>
      </Modal>
    </>
  );
}
