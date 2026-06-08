"use client";

import * as React from "react";
import {
  IconCalendar,
  IconFiles,
  IconHelp,
  IconSchool,
  IconSettings,
  IconUsers,
  IconUsersGroup,
  IconDashboard,
  IconBook,
  IconClipboardList,
  IconWorld,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/dashboard/nav-main";
import { NavSecondary } from "@/components/dashboard/nav-secondary";
import { NavUser } from "@/components/dashboard/nav-user";

const navMain = [
  { title: "Tableau de bord", url: "/dashboard", icon: IconDashboard },
  { title: "Utilisateurs", url: "/dashboard/users", icon: IconUsers },
  { title: "Années scolaires", url: "/dashboard/years", icon: IconCalendar },
  { title: "Classes", url: "/dashboard/classes", icon: IconSchool },
  { title: "Cours", url: "/dashboard/lectures", icon: IconBook },
  { title: "Documents", url: "/dashboard/documents", icon: IconFiles },
  { title: "Groupes", url: "/dashboard/groups", icon: IconUsersGroup },
  {
    title: "Inscriptions",
    url: "/dashboard/enrollments",
    icon: IconClipboardList,
  },
  { title: "Site web", url: "/dashboard/website", icon: IconWorld },
];

const navSecondary = [
  { title: "Paramètres", url: "/dashboard/settings", icon: IconSettings },
  { title: "Aide", url: "/dashboard/help", icon: IconHelp },
];

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: { name: string; email: string; role: string };
};

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/logo.svg"
                    alt="La Boussole"
                    width={120}
                    height={32}
                    className="h-8 w-auto dark:hidden"
                    priority
                  />
                  <Image
                    src="/images/logo-light.svg"
                    alt="La Boussole"
                    width={120}
                    height={32}
                    className="hidden h-8 w-auto dark:block"
                    priority
                  />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
