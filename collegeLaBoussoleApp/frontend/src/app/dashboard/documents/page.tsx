"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";

type Document = {
  _id: string;
  titre: string;
  url: string;
  type: "file" | "folder";
  tags: string[];
  createdAt: string;
};

const empty = { titre: "", url: "", type: "file", tags: "" };

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editDoc, setEditDoc] = useState<Document | null>(null);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const data = await apiFetch<Document[]>("/documents");
    setDocuments(data);
  }

  useEffect(() => {
    const fetchData = async () => {
      await load();
    };

    fetchData();
  }, []);

  function openCreate() {
    setEditDoc(null);
    setForm(empty);
    setError(null);
    setModalOpen(true);
  }

  function openEdit(d: Document) {
    setEditDoc(d);
    setForm({
      titre: d.titre,
      url: d.url,
      type: d.type,
      tags: d.tags.join(", "),
    });
    setError(null);
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const payload = {
      titre: form.titre,
      url: form.url,
      type: form.type,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    try {
      if (editDoc) {
        await apiFetch(`/documents/${editDoc._id}`, {
          method: "PATCH",
          body: payload,
        });
      } else {
        await apiFetch("/documents", { method: "POST", body: payload });
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce document ?")) return;
    await apiFetch(`/documents/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <>
      <SiteHeader title="Documents" />
      <main className="flex-1 p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            {documents.length} document(s)
          </p>
          <Button onClick={openCreate}>+ Nouveau document</Button>
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Titre
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Type
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Tags
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">
                  Créé le
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {documents.map((d) => (
                <tr
                  key={d._id}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                >
                  <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">
                    {d.titre}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={d.type === "folder" ? "warning" : "default"}
                    >
                      {d.type === "folder" ? "Dossier" : "Fichier"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-zinc-500">
                    {d.tags.length > 0 ? d.tags.join(", ") : "—"}
                  </td>
                  <td className="px-4 py-3 text-zinc-500">
                    {new Date(d.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(d)}
                        className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(d._id)}
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
        title={editDoc ? "Modifier le document" : "Nouveau document"}
      >
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}
            <Field>
              <FieldLabel htmlFor="d-titre">Titre</FieldLabel>
              <Input
                id="d-titre"
                required
                value={form.titre}
                onChange={(e) => setForm({ ...form, titre: e.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="d-url">URL / chemin</FieldLabel>
              <Input
                id="d-url"
                required
                placeholder="/uploads/fichier.pdf"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="d-type">Type</FieldLabel>
              <select
                id="d-type"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
              >
                <option value="file">Fichier</option>
                <option value="folder">Dossier</option>
              </select>
            </Field>
            <Field>
              <FieldLabel htmlFor="d-tags">
                Tags (séparés par des virgules)
              </FieldLabel>
              <Input
                id="d-tags"
                placeholder="règlement, important"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />
            </Field>
            <Button type="submit">{editDoc ? "Enregistrer" : "Créer"}</Button>
          </FieldGroup>
        </form>
      </Modal>
    </>
  );
}
