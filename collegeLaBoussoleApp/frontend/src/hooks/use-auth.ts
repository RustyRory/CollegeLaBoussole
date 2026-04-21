"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth(requiredRole?: string) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (!token) {
      router.replace("/login");
      return;
    }

    if (requiredRole && storedRole !== requiredRole) {
      router.replace("/login");
      return;
    }

    const id = requestAnimationFrame(() => {
      setRole(storedRole);
      setReady(true);
    });

    return () => cancelAnimationFrame(id);
  }, [router, requiredRole]);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  }

  return { ready, role, logout };
}
