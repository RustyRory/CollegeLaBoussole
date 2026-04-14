"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/dashboard/site-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";

type User = {
  _id: string;
  email: string;
  role: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
};

const roleBadge: Record<string, "default" | "success" | "warning" | "danger"> =
  {
    admin: "danger",
    staff: "warning",
    parent: "success",
    student: "default",
    other: "outline" as "default",
  };

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [form, setForm] = useState({ email: "", password: "", role: "staff" });
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const data = await apiFetch<User[]>("/users");
    setUsers(data);
  }

  useEffect(() => {
    const fetchData = async () => {
      await load();
    };

    fetchData();
  }, []);

  function openCreate() {
    setEditUser(null);
    setForm({ email: "", password: "", role: "staff" });
    setError(null);
    setModalOpen(true);
  }

  function openEdit(u: User) {
    setEditUser(u);
    setForm({ email: u.email, password: "", role: u.role });
    setError(null);
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      if (editUser) {
        await apiFetch(`/users/${editUser._id}`, {
          method: "PATCH",
          body: { role: form.role },
        });
      } else {
        await apiFetch("/users", {
          method: "POST",
          body: { email: form.email, password: form.password, role: form.role },
        });
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    }
  }

  async function toggleActive(u: User) {
    await apiFetch(`/users/${u._id}`, {
      method: "PATCH",
      body: { isActive: !u.isActive },
    });
    load();
  }

  return (
    <>
      <SiteHeader title="Utilisateurs" />
      <main className="flex-1 p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-zinc-500">{users.length} utilisateur(s)</p>
          <Button onClick={openCreate}>+ Nouvel utilisateur</Button>
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Rôle
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Statut
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Créé le
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                >
                  <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">
                    {u.email}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={roleBadge[u.role] ?? "default"}>
                      {u.role}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={u.isActive ? "success" : "danger"}>
                      {u.isActive ? "Actif" : "Inactif"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-zinc-500">
                    {new Date(u.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(u)}
                        className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => toggleActive(u)}
                        className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                      >
                        {u.isActive ? "Désactiver" : "Activer"}
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
        title={editUser ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
      >
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}
            {!editUser && (
              <Field>
                <FieldLabel htmlFor="u-email">Email</FieldLabel>
                <Input
                  id="u-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Field>
            )}
            {!editUser && (
              <Field>
                <FieldLabel htmlFor="u-password">Mot de passe</FieldLabel>
                <Input
                  id="u-password"
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </Field>
            )}
            <Field>
              <FieldLabel htmlFor="u-role">Rôle</FieldLabel>
              <select
                id="u-role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
              >
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
                <option value="parent">Parent</option>
                <option value="student">Élève</option>
                <option value="other">Autre</option>
              </select>
            </Field>
            <Button type="submit">{editUser ? "Enregistrer" : "Créer"}</Button>
          </FieldGroup>
        </form>
      </Modal>
    </>
  );
}
