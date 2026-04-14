"use client";

import * as React from "react";
import { useAuth } from "@/hooks/useAuth";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ready } = useAuth("admin");
  const [user, setUser] = React.useState({
    name: "Admin",
    email: "",
    role: "admin",
  });

  React.useEffect(() => {
    const email = localStorage.getItem("email") ?? "";
    const role = localStorage.getItem("role") ?? "admin";
    const name = email ? email.split("@")[0] : "Admin";
    setUser({ name, email, role });
  }, []);

  if (!ready) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
