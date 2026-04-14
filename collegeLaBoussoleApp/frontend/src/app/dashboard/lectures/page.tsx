"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/dashboard/site-header";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";

type Class = { _id: string; name: string };
type User = { _id: string; email: string };
type Lecture = {
  _id: string;
  name: string;
  classId: Class | string;
  teacherId: User | string;
  day: string;
  startTime: string;
  endTime: string;
};

const days = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
const empty = {
  name: "",
  classId: "",
  teacherId: "",
  day: "lundi",
  startTime: "",
  endTime: "",
};

export default function LecturesPage() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editLecture, setEditLecture] = useState<Lecture | null>(null);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const [l, c, u] = await Promise.all([
      apiFetch<Lecture[]>("/lectures"),
      apiFetch<Class[]>("/classes"),
      apiFetch<User[]>("/users"),
    ]);
    setLectures(l);
    setClasses(c);
    setTeachers(u);
  }

  useEffect(() => {
    const fetchData = async () => {
      await load();
    };

    fetchData();
  }, []);

  const className = (c: Class | string) => (typeof c === "object" ? c.name : c);
  const teacherEmail = (t: User | string) =>
    typeof t === "object" ? t.email : t;

  function openCreate() {
    setEditLecture(null);
    setForm(empty);
    setError(null);
    setModalOpen(true);
  }

  function openEdit(l: Lecture) {
    setEditLecture(l);
    setForm({
      name: l.name,
      classId: typeof l.classId === "object" ? l.classId._id : l.classId,
      teacherId:
        typeof l.teacherId === "object" ? l.teacherId._id : l.teacherId,
      day: l.day,
      startTime: l.startTime,
      endTime: l.endTime,
    });
    setError(null);
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      if (editLecture) {
        await apiFetch(`/lectures/${editLecture._id}`, {
          method: "PATCH",
          body: form,
        });
      } else {
        await apiFetch("/lectures", { method: "POST", body: form });
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce cours ?")) return;
    await apiFetch(`/lectures/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <>
      <SiteHeader title="Cours" />
      <main className="flex-1 p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-zinc-500">{lectures.length} cours</p>
          <Button onClick={openCreate}>+ Nouveau cours</Button>
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Matière
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Classe
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Enseignant
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Jour
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Horaire
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {lectures.map((l) => (
                <tr
                  key={l._id}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                >
                  <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">
                    {l.name}
                  </td>
                  <td className="px-4 py-3 text-zinc-500">
                    {className(l.classId)}
                  </td>
                  <td className="px-4 py-3 text-zinc-500">
                    {teacherEmail(l.teacherId)}
                  </td>
                  <td className="px-4 py-3 capitalize text-zinc-500">
                    {l.day}
                  </td>
                  <td className="px-4 py-3 text-zinc-500">
                    {l.startTime} – {l.endTime}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(l)}
                        className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(l._id)}
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
        title={editLecture ? "Modifier le cours" : "Nouveau cours"}
        className="max-w-lg"
      >
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}
            <Field>
              <FieldLabel htmlFor="l-name">Matière</FieldLabel>
              <Input
                id="l-name"
                required
                placeholder="Mathématiques"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="l-class">Classe</FieldLabel>
                <select
                  id="l-class"
                  required
                  value={form.classId}
                  onChange={(e) =>
                    setForm({ ...form, classId: e.target.value })
                  }
                  className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                >
                  <option value="">— Choisir —</option>
                  {classes.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field>
                <FieldLabel htmlFor="l-teacher">Enseignant</FieldLabel>
                <select
                  id="l-teacher"
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
            </div>
            <Field>
              <FieldLabel htmlFor="l-day">Jour</FieldLabel>
              <select
                id="l-day"
                value={form.day}
                onChange={(e) => setForm({ ...form, day: e.target.value })}
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm capitalize dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
              >
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="l-start">Début</FieldLabel>
                <Input
                  id="l-start"
                  type="time"
                  required
                  value={form.startTime}
                  onChange={(e) =>
                    setForm({ ...form, startTime: e.target.value })
                  }
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="l-end">Fin</FieldLabel>
                <Input
                  id="l-end"
                  type="time"
                  required
                  value={form.endTime}
                  onChange={(e) =>
                    setForm({ ...form, endTime: e.target.value })
                  }
                />
              </Field>
            </div>
            <Button type="submit">
              {editLecture ? "Enregistrer" : "Créer"}
            </Button>
          </FieldGroup>
        </form>
      </Modal>
    </>
  );
}
