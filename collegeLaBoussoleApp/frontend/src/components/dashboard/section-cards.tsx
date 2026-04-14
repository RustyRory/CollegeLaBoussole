import {
  IconCalendar,
  IconFiles,
  IconSchool,
  IconUsers,
  IconUsersGroup,
  IconBook,
} from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Stats = {
  users: number;
  years: number;
  classes: number;
  lectures: number;
  documents: number;
  groups: number;
};

const cards = [
  {
    key: "users" as const,
    label: "Utilisateurs",
    icon: IconUsers,
    color: "text-blue-500",
  },
  {
    key: "years" as const,
    label: "Années scolaires",
    icon: IconCalendar,
    color: "text-green-500",
  },
  {
    key: "classes" as const,
    label: "Classes",
    icon: IconSchool,
    color: "text-orange-500",
  },
  {
    key: "lectures" as const,
    label: "Cours",
    icon: IconBook,
    color: "text-purple-500",
  },
  {
    key: "documents" as const,
    label: "Documents",
    icon: IconFiles,
    color: "text-rose-500",
  },
  {
    key: "groups" as const,
    label: "Groupes",
    icon: IconUsersGroup,
    color: "text-cyan-500",
  },
];

export function SectionCards({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-2 gap-4 px-4 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map(({ key, label, icon: Icon, color }) => (
        <Card key={key} className="gap-3 py-4">
          <CardHeader className="px-4 pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {label}
              </CardTitle>
              <Icon className={`size-4 ${color}`} />
            </div>
          </CardHeader>
          <CardContent className="px-4">
            <p className="text-3xl font-bold tabular-nums">{stats[key]}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
