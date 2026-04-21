"use client";

import HomePage from "@/components/home-page";
import { Navbar } from "@/components/dashboard/nav-main";
import { IconHome, IconLayoutDashboard } from "@tabler/icons-react";

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
