"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";

type Group = {
  _id: string;
  name: string;
  type: string;
};

const typeLabel: Record<string, string> = {
  class: "Classe",
  staff: "Personnel",
  parents: "Parents",
  year: "Année",
  custom: "Personnalisé",
  other: "Autre",
};

const empty = { name: "", type: "custom" };

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editGroup, setEditGroup] = useState<Group | null>(null);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const data = await apiFetch<Group[]>("/groups");
    setGroups(data);
  }

  useEffect(() => {
    const fetchData = async () => {
      await load();
    };

    fetchData();
  }, []);

  function openCreate() {
    setEditGroup(null);
    setForm(empty);
    setError(null);
    setModalOpen(true);
  }

  function openEdit(g: Group) {
    setEditGroup(g);
    setForm({ name: g.name, type: g.type });
    setError(null);
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      if (editGroup) {
        await apiFetch(`/groups/${editGroup._id}`, {
          method: "PATCH",
          body: form,
        });
      } else {
        await apiFetch("/groups", { method: "POST", body: form });
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce groupe ?")) return;
    await apiFetch(`/groups/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <>
      <SiteHeader title="Groupes" />
      <main className="flex-1 p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-zinc-500">{groups.length} groupe(s)</p>
          <Button onClick={openCreate}>+ Nouveau groupe</Button>
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Nom
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Type
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {groups.map((g) => (
                <tr
                  key={g._id}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                >
                  <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">
                    {g.name}
                  </td>
                  <td className="px-4 py-3">
                    <Badge>{typeLabel[g.type] ?? g.type}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(g)}
                        className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(g._id)}
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
        title={editGroup ? "Modifier le groupe" : "Nouveau groupe"}
      >
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}
            <Field>
              <FieldLabel htmlFor="g-name">Nom</FieldLabel>
              <Input
                id="g-name"
                required
                placeholder="Parents 6ème A"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="g-type">Type</FieldLabel>
              <select
                id="g-type"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
              >
                {Object.entries(typeLabel).map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </Field>
            <Button type="submit">{editGroup ? "Enregistrer" : "Créer"}</Button>
          </FieldGroup>
        </form>
      </Modal>
    </>
  );
}
