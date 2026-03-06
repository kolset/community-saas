import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

interface Activity {
  id: number;
  type: string;
  member: string;
  detail: string;
  time: string;
  badgeColor: "success" | "primary" | "info" | "warning" | "error";
}

const activityData: Activity[] = [
  {
    id: 1,
    type: "Check-in",
    member: "Erik Hansen",
    detail: "CrossFit WOD",
    time: "5 min ago",
    badgeColor: "success",
  },
  {
    id: 2,
    type: "Payment",
    member: "Ingrid Larsen",
    detail: "799 kr - Pluss",
    time: "12 min ago",
    badgeColor: "primary",
  },
  {
    id: 3,
    type: "Signup",
    member: "Marte Nilsen",
    detail: "Basis plan",
    time: "1 hour ago",
    badgeColor: "info",
  },
  {
    id: 4,
    type: "Booking",
    member: "Jonas Berg",
    detail: "Yoga 18:00",
    time: "2 hours ago",
    badgeColor: "warning",
  },
  {
    id: 5,
    type: "Check-in",
    member: "Sofie Andersen",
    detail: "HIIT Express",
    time: "3 hours ago",
    badgeColor: "success",
  },
  {
    id: 6,
    type: "Payment Failed",
    member: "Lars Haugen",
    detail: "999 kr - Premium",
    time: "4 hours ago",
    badgeColor: "error",
  },
  {
    id: 7,
    type: "Check-in",
    member: "Kristine Moe",
    detail: "Strength",
    time: "5 hours ago",
    badgeColor: "success",
  },
  {
    id: 8,
    type: "Booking",
    member: "Anders Dahl",
    detail: "CrossFit 07:00",
    time: "6 hours ago",
    badgeColor: "warning",
  },
];

export default function RecentActivity() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Activity
          </h3>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Type
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Member
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Detail
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Time
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {activityData.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge size="sm" color={activity.badgeColor}>
                    {activity.type}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {activity.member}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {activity.detail}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {activity.time}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
