"use client";

import HomePage from "@/components/home-page";
import { IconHome, IconLayoutDashboard } from "@tabler/icons-react";
import { Navbar } from "@/components/site-header";

export default function App() {
  const menuItems = [
    { title: "Accueil", url: "/", icon: IconHome },
    { title: "Dashboard", url: "/dashboard", icon: IconLayoutDashboard },
  ];

  return (
    <>
      <Navbar items={menuItems} />
      <HomePage />
    </>
  );
}
