"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/dashboard/site-header";
import { SectionCards } from "@/components/dashboard/section-cards";
import { apiFetch } from "@/lib/api";

type Stats = {
  users: number;
  years: number;
  classes: number;
  lectures: number;
  documents: number;
  groups: number;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    users: 0,
    years: 0,
    classes: 0,
    lectures: 0,
    documents: 0,
    groups: 0,
  });

  useEffect(() => {
    async function load() {
      const [users, years, classes, lectures, documents, groups] =
        await Promise.allSettled([
          apiFetch<unknown[]>("/users"),
          apiFetch<unknown[]>("/years"),
          apiFetch<unknown[]>("/classes"),
          apiFetch<unknown[]>("/lectures"),
          apiFetch<unknown[]>("/documents"),
          apiFetch<unknown[]>("/groups"),
        ]);

      setStats({
        users: users.status === "fulfilled" ? users.value.length : 0,
        years: years.status === "fulfilled" ? years.value.length : 0,
        classes: classes.status === "fulfilled" ? classes.value.length : 0,
        lectures: lectures.status === "fulfilled" ? lectures.value.length : 0,
        documents:
          documents.status === "fulfilled" ? documents.value.length : 0,
        groups: groups.status === "fulfilled" ? groups.value.length : 0,
      });
    }
    load();
  }, []);

  return (
    <>
      <SiteHeader title="Tableau de bord" />
      <div className="flex flex-1 flex-col gap-6 p-4">
        <SectionCards stats={stats} />
      </div>
    </>
  );
}
