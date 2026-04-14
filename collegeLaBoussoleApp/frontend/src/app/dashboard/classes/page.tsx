"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/dashboard/site-header";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";

type Year = { _id: string; name: string };
type User = { _id: string; email: string };
type Class = {
  _id: string;
  name: string;
  yearId: Year | string;
  teacherId: User | string;
};

const empty = { name: "", yearId: "", teacherId: "" };

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [years, setYears] = useState<Year[]>([]);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editClass, setEditClass] = useState<Class | null>(null);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const [c, y, u] = await Promise.all([
      apiFetch<Class[]>("/classes"),
      apiFetch<Year[]>("/years"),
      apiFetch<User[]>("/users"),
    ]);
    setClasses(c);
    setYears(y);
    setTeachers(u);
  }

  useEffect(() => {
    const fetchData = async () => {
      await load();
    };

    fetchData();
  }, []);

  function yearName(y: Year | string) {
    return typeof y === "object" ? y.name : y;
  }
  function teacherEmail(t: User | string) {
    return typeof t === "object" ? t.email : t;
  }

  function openCreate() {
    setEditClass(null);
    setForm(empty);
    setError(null);
    setModalOpen(true);
  }

  function openEdit(c: Class) {
    setEditClass(c);
    setForm({
      name: c.name,
      yearId: typeof c.yearId === "object" ? c.yearId._id : c.yearId,
      teacherId:
        typeof c.teacherId === "object" ? c.teacherId._id : c.teacherId,
    });
    setError(null);
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      if (editClass) {
        await apiFetch(`/classes/${editClass._id}`, {
          method: "PATCH",
          body: form,
        });
      } else {
        await apiFetch("/classes", { method: "POST", body: form });
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette classe ?")) return;
    await apiFetch(`/classes/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <>
      <SiteHeader title="Classes" />
      <main className="flex-1 p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-zinc-500">{classes.length} classe(s)</p>
          <Button onClick={openCreate}>+ Nouvelle classe</Button>
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Classe
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Année
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Professeur principal
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {classes.map((c) => (
                <tr
                  key={c._id}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                >
                  <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">
                    {c.name}
                  </td>
                  <td className="px-4 py-3 text-zinc-500">
                    {yearName(c.yearId)}
                  </td>
                  <td className="px-4 py-3 text-zinc-500">
                    {teacherEmail(c.teacherId)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/dashboard/classes/${c._id}`}
                        className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                      >
                        Voir
                      </Link>
                      <button
                        onClick={() => openEdit(c)}
                        className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
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
        title={editClass ? "Modifier la classe" : "Nouvelle classe"}
      >
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}
            <Field>
              <FieldLabel htmlFor="c-name">Nom</FieldLabel>
              <Input
                id="c-name"
                required
                placeholder="6ème A"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="c-year">Année scolaire</FieldLabel>
              <select
                id="c-year"
                required
                value={form.yearId}
                onChange={(e) => setForm({ ...form, yearId: e.target.value })}
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
              <FieldLabel htmlFor="c-teacher">Professeur principal</FieldLabel>
              <select
                id="c-teacher"
                required
                value={form.teacherId}
                onChange={(e) =>
                  setForm({ ...form, teacherId: e.target.value })
                }
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
              >
                <option value="">— Choisir —</option>
                {teachers.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.email}
                  </option>
                ))}
              </select>
            </Field>
            <Button type="submit">{editClass ? "Enregistrer" : "Créer"}</Button>
          </FieldGroup>
        </form>
      </Modal>
    </>
  );
}
