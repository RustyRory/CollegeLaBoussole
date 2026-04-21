"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { SiteHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";

// ─── Types ───────────────────────────────────────────────────────────────────

type Year = { _id: string; name: string };
type UserRef = { _id: string; email: string; role: string };

type ClassDetail = {
  _id: string;
  name: string;
  yearId: Year;
  teacherId: UserRef;
};

type Student = {
  _id: string;
  profileId: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  isActive: boolean;
};

type Lecture = {
  _id: string;
  name: string;
  teacherId: UserRef | string;
  day: string;
  startTime: string;
  endTime: string;
};

type Tab = "info" | "students" | "lectures";

const days = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

const emptyLecture = {
  name: "",
  teacherId: "",
  day: "lundi",
  startTime: "",
  endTime: "",
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ClassDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [classe, setClasse] = useState<ClassDetail | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [unassigned, setUnassigned] = useState<Student[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [years, setYears] = useState<Year[]>([]);
  const [teachers, setTeachers] = useState<UserRef[]>([]);
  const [parents, setParents] = useState<UserRef[]>([]);

  const [tab, setTab] = useState<Tab>("info");

  // ── Formulaire infos classe ──
  const [infoForm, setInfoForm] = useState({
    name: "",
    yearId: "",
    teacherId: "",
  });
  const [infoSaving, setInfoSaving] = useState(false);
  const [infoError, setInfoError] = useState<string | null>(null);
  const [infoSuccess, setInfoSuccess] = useState(false);

  // ── Ajout élève existant ──
  const [addStudentId, setAddStudentId] = useState("");
  const [addStudentError, setAddStudentError] = useState<string | null>(null);

  // ── Création nouvel élève ──
  const [createStudentOpen, setCreateStudentOpen] = useState(false);
  const [createStudentForm, setCreateStudentForm] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    parentUserId: "",
  });
  const [createStudentError, setCreateStudentError] = useState<string | null>(
    null,
  );

  // ── Cours ──
  const [lectureModalOpen, setLectureModalOpen] = useState(false);
  const [editLecture, setEditLecture] = useState<Lecture | null>(null);
  const [lectureForm, setLectureForm] = useState(emptyLecture);
  const [lectureError, setLectureError] = useState<string | null>(null);

  // ─── Chargement ────────────────────────────────────────────────────────────

  async function load() {
    const [c, s, u, y, l, allUsers] = await Promise.all([
      apiFetch<ClassDetail>(`/classes/${id}`),
      apiFetch<Student[]>(`/classes/${id}/students`),
      apiFetch<Student[]>("/students/unassigned"),
      apiFetch<Year[]>("/years"),
      apiFetch<Lecture[]>(`/classes/${id}/lectures`),
      apiFetch<UserRef[]>("/users"),
    ]);
    setClasse(c);
    setStudents(s);
    setUnassigned(u);
    setYears(y);
    setLectures(l);
    setTeachers(
      allUsers.filter((u) => u.role === "staff" || u.role === "admin"),
    );
    setParents(allUsers.filter((u) => u.role === "parent"));
    setInfoForm({
      name: c.name,
      yearId: c.yearId._id,
      teacherId: c.teacherId._id,
    });
  }

  useEffect(() => {
    load();
  }, [id]);

  // ─── Infos classe ──────────────────────────────────────────────────────────

  async function handleInfoSave(e: React.FormEvent) {
    e.preventDefault();
    setInfoSaving(true);
    setInfoError(null);
    setInfoSuccess(false);
    try {
      await apiFetch(`/classes/${id}`, { method: "PATCH", body: infoForm });
      setInfoSuccess(true);
      load();
    } catch (err) {
      setInfoError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setInfoSaving(false);
    }
  }

  // ─── Élèves ────────────────────────────────────────────────────────────────

  async function handleAddStudent(e: React.FormEvent) {
    e.preventDefault();
    setAddStudentError(null);
    if (!addStudentId) return;
    try {
      await apiFetch(`/classes/${id}/students`, {
        method: "POST",
        body: { userId: addStudentId },
      });
      setAddStudentId("");
      load();
    } catch (err) {
      setAddStudentError(err instanceof Error ? err.message : "Erreur");
    }
  }

  async function handleCreateStudent(e: React.FormEvent) {
    e.preventDefault();
    setCreateStudentError(null);
    try {
      // 1. Créer l'élève
      const student = await apiFetch<Student>("/students", {
        method: "POST",
        body: createStudentForm,
      });
      // 2. L'inscrire directement dans la classe
      await apiFetch(`/classes/${id}/students`, {
        method: "POST",
        body: { userId: student._id },
      });
      setCreateStudentOpen(false);
      setCreateStudentForm({
        firstName: "",
        lastName: "",
        birthDate: "",
        parentUserId: "",
      });
      load();
    } catch (err) {
      setCreateStudentError(err instanceof Error ? err.message : "Erreur");
    }
  }

  async function handleRemoveStudent(userId: string) {
    if (!confirm("Retirer cet élève de la classe ?")) return;
    await apiFetch(`/classes/${id}/students/${userId}`, { method: "DELETE" });
    load();
  }

  // ─── Cours ─────────────────────────────────────────────────────────────────

  function openCreateLecture() {
    setEditLecture(null);
    setLectureForm(emptyLecture);
    setLectureError(null);
    setLectureModalOpen(true);
  }

  function openEditLecture(l: Lecture) {
    setEditLecture(l);
    setLectureForm({
      name: l.name,
      teacherId:
        typeof l.teacherId === "object" ? l.teacherId._id : l.teacherId,
      day: l.day,
      startTime: l.startTime,
      endTime: l.endTime,
    });
    setLectureError(null);
    setLectureModalOpen(true);
  }

  async function handleLectureSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLectureError(null);
    try {
      if (editLecture) {
        await apiFetch(`/classes/${id}/lectures/${editLecture._id}`, {
          method: "PATCH",
          body: lectureForm,
        });
      } else {
        await apiFetch(`/classes/${id}/lectures`, {
          method: "POST",
          body: lectureForm,
        });
      }
      setLectureModalOpen(false);
      load();
    } catch (err) {
      setLectureError(err instanceof Error ? err.message : "Erreur");
    }
  }

  async function handleDeleteLecture(lectureId: string) {
    if (!confirm("Supprimer ce cours ?")) return;
    await apiFetch(`/classes/${id}/lectures/${lectureId}`, {
      method: "DELETE",
    });
    load();
  }

  const teacherEmail = (t: Lecture["teacherId"]) =>
    typeof t === "object" ? t.email : t;

  // ─── Render ────────────────────────────────────────────────────────────────

  if (!classe) {
    return (
      <>
        <SiteHeader title="Chargement..." />
        <div className="flex flex-1 items-center justify-center p-8">
          <p className="text-sm text-muted-foreground">Chargement...</p>
        </div>
      </>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "info", label: "Informations" },
    { key: "students", label: `Élèves (${students.length})` },
    { key: "lectures", label: `Cours (${lectures.length})` },
  ];

  return (
    <>
      <SiteHeader title={classe.name}>
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
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                tab === key
                  ? "border-b-2 border-zinc-900 text-zinc-900 dark:border-white dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Onglet Informations ── */}
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
                  <FieldLabel htmlFor="c-name">Nom de la classe</FieldLabel>
                  <Input
                    id="c-name"
                    required
                    value={infoForm.name}
                    onChange={(e) =>
                      setInfoForm({ ...infoForm, name: e.target.value })
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="c-year">Année scolaire</FieldLabel>
                  <select
                    id="c-year"
                    required
                    value={infoForm.yearId}
                    onChange={(e) =>
                      setInfoForm({ ...infoForm, yearId: e.target.value })
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
                  <FieldLabel htmlFor="c-teacher">
                    Professeur principal
                  </FieldLabel>
                  <select
                    id="c-teacher"
                    required
                    value={infoForm.teacherId}
                    onChange={(e) =>
                      setInfoForm({ ...infoForm, teacherId: e.target.value })
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
                <Button type="submit" disabled={infoSaving}>
                  {infoSaving ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </FieldGroup>
            </form>
          </div>
        )}

        {/* ── Onglet Élèves ── */}
        {tab === "students" && (
          <div className="space-y-6">
            {/* Actions */}
            <div className="flex flex-wrap items-end gap-3">
              {/* Ajouter un élève sans classe */}
              <div className="flex flex-1 min-w-64 items-end gap-2">
                <div className="flex-1">
                  <p className="mb-1 text-xs font-medium text-zinc-500">
                    Élève sans classe
                  </p>
                  <select
                    value={addStudentId}
                    onChange={(e) => setAddStudentId(e.target.value)}
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                  >
                    <option value="">— Choisir —</option>
                    {unassigned.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.lastName.toUpperCase()} {s.firstName}
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  onClick={(e) =>
                    handleAddStudent(e as unknown as React.FormEvent)
                  }
                  disabled={!addStudentId}
                  variant="outline"
                >
                  Ajouter
                </Button>
              </div>
              {addStudentError && (
                <p className="text-sm text-red-600">{addStudentError}</p>
              )}

              {/* Créer un nouvel élève */}
              <Button onClick={() => setCreateStudentOpen(true)}>
                + Nouvel élève
              </Button>
            </div>

            {/* Liste des élèves */}
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
                      Statut
                    </th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {students.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-8 text-center text-zinc-400"
                      >
                        Aucun élève dans cette classe
                      </td>
                    </tr>
                  )}
                  {students.map((s) => (
                    <tr
                      key={s._id}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    >
                      <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">
                        {s.lastName.toUpperCase()} {s.firstName}
                      </td>
                      <td className="px-4 py-3 text-zinc-500">
                        {s.birthDate
                          ? new Date(s.birthDate).toLocaleDateString("fr-FR")
                          : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={s.isActive ? "success" : "danger"}>
                          {s.isActive ? "Actif" : "Inactif"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleRemoveStudent(s._id)}
                          className="text-xs text-red-400 hover:text-red-600"
                        >
                          Retirer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Onglet Cours ── */}
        {tab === "lectures" && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={openCreateLecture}>+ Nouveau cours</Button>
            </div>

            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
              <table className="w-full text-sm">
                <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-zinc-500">
                      Matière
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
                  {lectures.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-zinc-400"
                      >
                        Aucun cours pour cette classe
                      </td>
                    </tr>
                  )}
                  {lectures.map((l) => (
                    <tr
                      key={l._id}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    >
                      <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">
                        {l.name}
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
                            onClick={() => openEditLecture(l)}
                            className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDeleteLecture(l._id)}
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
          </div>
        )}
      </main>

      {/* ── Modale création élève ── */}
      <Modal
        open={createStudentOpen}
        onClose={() => setCreateStudentOpen(false)}
        title="Nouvel élève"
      >
        <form onSubmit={handleCreateStudent}>
          <FieldGroup>
            {createStudentError && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {createStudentError}
              </p>
            )}
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="s-last">Nom</FieldLabel>
                <Input
                  id="s-last"
                  required
                  placeholder="DUPONT"
                  value={createStudentForm.lastName}
                  onChange={(e) =>
                    setCreateStudentForm({
                      ...createStudentForm,
                      lastName: e.target.value,
                    })
                  }
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="s-first">Prénom</FieldLabel>
                <Input
                  id="s-first"
                  required
                  placeholder="Marie"
                  value={createStudentForm.firstName}
                  onChange={(e) =>
                    setCreateStudentForm({
                      ...createStudentForm,
                      firstName: e.target.value,
                    })
                  }
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="s-birth">Date de naissance</FieldLabel>
              <Input
                id="s-birth"
                type="date"
                required
                value={createStudentForm.birthDate}
                onChange={(e) =>
                  setCreateStudentForm({
                    ...createStudentForm,
                    birthDate: e.target.value,
                  })
                }
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="s-parent">
                Parent / responsable (optionnel)
              </FieldLabel>
              <select
                id="s-parent"
                value={createStudentForm.parentUserId}
                onChange={(e) =>
                  setCreateStudentForm({
                    ...createStudentForm,
                    parentUserId: e.target.value,
                  })
                }
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
              >
                <option value="">— Aucun —</option>
                {parents.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.email}
                  </option>
                ))}
              </select>
            </Field>
            <Button type="submit">Créer et inscrire dans la classe</Button>
          </FieldGroup>
        </form>
      </Modal>

      {/* ── Modale cours ── */}
      <Modal
        open={lectureModalOpen}
        onClose={() => setLectureModalOpen(false)}
        title={editLecture ? "Modifier le cours" : "Nouveau cours"}
        className="max-w-lg"
      >
        <form onSubmit={handleLectureSubmit}>
          <FieldGroup>
            {lectureError && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {lectureError}
              </p>
            )}
            <Field>
              <FieldLabel htmlFor="l-name">Matière</FieldLabel>
              <Input
                id="l-name"
                required
                placeholder="Mathématiques"
                value={lectureForm.name}
                onChange={(e) =>
                  setLectureForm({ ...lectureForm, name: e.target.value })
                }
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="l-teacher">Enseignant</FieldLabel>
              <select
                id="l-teacher"
                required
                value={lectureForm.teacherId}
                onChange={(e) =>
                  setLectureForm({ ...lectureForm, teacherId: e.target.value })
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
            <Field>
              <FieldLabel htmlFor="l-day">Jour</FieldLabel>
              <select
                id="l-day"
                value={lectureForm.day}
                onChange={(e) =>
                  setLectureForm({ ...lectureForm, day: e.target.value })
                }
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
                  value={lectureForm.startTime}
                  onChange={(e) =>
                    setLectureForm({
                      ...lectureForm,
                      startTime: e.target.value,
                    })
                  }
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="l-end">Fin</FieldLabel>
                <Input
                  id="l-end"
                  type="time"
                  required
                  value={lectureForm.endTime}
                  onChange={(e) =>
                    setLectureForm({ ...lectureForm, endTime: e.target.value })
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
