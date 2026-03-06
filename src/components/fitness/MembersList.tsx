"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";

type MemberStatus = "active" | "paused" | "expired";

interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: string;
  status: MemberStatus;
  joinedDate: string;
  lastCheckIn: string;
}

const allMembers: Member[] = [
  { id: "m1", name: "Erik Hansen", email: "erik@mail.no", avatar: "/images/user/user-01.jpg", plan: "Premium", status: "active", joinedDate: "2024-03-15", lastCheckIn: "2026-03-05" },
  { id: "m2", name: "Ingrid Larsen", email: "ingrid@mail.no", avatar: "/images/user/user-02.jpg", plan: "Pluss", status: "active", joinedDate: "2024-06-01", lastCheckIn: "2026-03-06" },
  { id: "m3", name: "Olav Nilsen", email: "olav@mail.no", avatar: "/images/user/user-03.jpg", plan: "Basis", status: "paused", joinedDate: "2024-01-10", lastCheckIn: "2026-01-20" },
  { id: "m4", name: "Kari Johansen", email: "kari@mail.no", avatar: "/images/user/user-04.jpg", plan: "Premium", status: "active", joinedDate: "2023-11-22", lastCheckIn: "2026-03-06" },
  { id: "m5", name: "Lars Pedersen", email: "lars@mail.no", avatar: "/images/user/user-05.jpg", plan: "Pluss", status: "expired", joinedDate: "2024-02-14", lastCheckIn: "2025-12-01" },
  { id: "m6", name: "Silje Berg", email: "silje@mail.no", avatar: "/images/user/user-06.jpg", plan: "Premium", status: "active", joinedDate: "2024-07-03", lastCheckIn: "2026-03-05" },
  { id: "m7", name: "Magnus Vik", email: "magnus@mail.no", avatar: "/images/user/user-07.jpg", plan: "Basis", status: "active", joinedDate: "2024-04-18", lastCheckIn: "2026-03-04" },
  { id: "m8", name: "Hilde Strand", email: "hilde@mail.no", avatar: "/images/user/user-08.jpg", plan: "Pluss", status: "paused", joinedDate: "2024-05-25", lastCheckIn: "2026-02-10" },
  { id: "m9", name: "Thomas Bakke", email: "thomas@mail.no", avatar: "/images/user/user-09.jpg", plan: "Premium", status: "active", joinedDate: "2023-09-01", lastCheckIn: "2026-03-06" },
  { id: "m10", name: "Marte Dahl", email: "marte@mail.no", avatar: "/images/user/user-10.jpg", plan: "Basis", status: "expired", joinedDate: "2024-08-12", lastCheckIn: "2025-11-15" },
  { id: "m11", name: "Bjorn Haugen", email: "bjorn@mail.no", avatar: "/images/user/user-11.jpg", plan: "Premium", status: "active", joinedDate: "2024-01-30", lastCheckIn: "2026-03-05" },
  { id: "m12", name: "Astrid Moen", email: "astrid@mail.no", avatar: "/images/user/user-12.jpg", plan: "Pluss", status: "active", joinedDate: "2024-09-05", lastCheckIn: "2026-03-03" },
  { id: "m13", name: "Henrik Lund", email: "henrik@mail.no", avatar: "/images/user/user-13.jpg", plan: "Basis", status: "paused", joinedDate: "2024-03-22", lastCheckIn: "2026-01-08" },
  { id: "m14", name: "Nora Solberg", email: "nora@mail.no", avatar: "/images/user/user-14.jpg", plan: "Premium", status: "active", joinedDate: "2024-10-11", lastCheckIn: "2026-03-06" },
  { id: "m15", name: "Kristian Aasen", email: "kristian@mail.no", avatar: "/images/user/user-15.jpg", plan: "Pluss", status: "active", joinedDate: "2024-06-20", lastCheckIn: "2026-03-04" },
  { id: "m16", name: "Emilie Fossum", email: "emilie@mail.no", avatar: "/images/user/user-16.jpg", plan: "Basis", status: "expired", joinedDate: "2024-04-09", lastCheckIn: "2025-10-22" },
  { id: "m17", name: "Anders Ruud", email: "anders@mail.no", avatar: "/images/user/user-17.jpg", plan: "Premium", status: "active", joinedDate: "2023-12-15", lastCheckIn: "2026-03-06" },
  { id: "m18", name: "Camilla Hauge", email: "camilla@mail.no", avatar: "/images/user/user-18.jpg", plan: "Pluss", status: "paused", joinedDate: "2024-07-28", lastCheckIn: "2026-02-18" },
];

const ITEMS_PER_PAGE = 10;

const statusColorMap: Record<MemberStatus, "success" | "warning" | "error"> = {
  active: "success",
  paused: "warning",
  expired: "error",
};

export default function MembersList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | MemberStatus>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return allMembers.filter((m) => {
      const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || m.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleStatusFilter = (val: string) => {
    setStatusFilter(val as "all" | MemberStatus);
    setPage(1);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-5 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Members
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filtered.length} total members
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="h-11 rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="h-11 rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-gray-200 dark:border-gray-800">
              <TableCell isHeader className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Member
              </TableCell>
              <TableCell isHeader className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Email
              </TableCell>
              <TableCell isHeader className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Plan
              </TableCell>
              <TableCell isHeader className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Status
              </TableCell>
              <TableCell isHeader className="hidden px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 md:table-cell">
                Joined
              </TableCell>
              <TableCell isHeader className="hidden px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 lg:table-cell">
                Last Check-in
              </TableCell>
              <TableCell isHeader className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((member) => (
              <TableRow
                key={member.id}
                className="border-b border-gray-100 dark:border-gray-800"
              >
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {member.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {member.email}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {member.plan}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Badge
                    size="sm"
                    color={statusColorMap[member.status]}
                  >
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden px-6 py-4 text-sm text-gray-600 dark:text-gray-400 md:table-cell">
                  {member.joinedDate}
                </TableCell>
                <TableCell className="hidden px-6 py-4 text-sm text-gray-600 dark:text-gray-400 lg:table-cell">
                  {member.lastCheckIn}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Link
                    href={`/members/${member.id}`}
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  No members found.
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-800">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
