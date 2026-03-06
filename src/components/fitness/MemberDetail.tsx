"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/badge/Badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

type MemberStatus = "active" | "paused" | "expired";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  plan: string;
  status: MemberStatus;
  joinedDate: string;
  lastCheckIn: string;
}

const membersData: Member[] = [
  { id: "m1", name: "Erik Hansen", email: "erik@mail.no", phone: "+47 912 34 567", avatar: "/images/user/user-01.jpg", plan: "Premium", status: "active", joinedDate: "2024-03-15", lastCheckIn: "2026-03-05" },
  { id: "m2", name: "Ingrid Larsen", email: "ingrid@mail.no", phone: "+47 923 45 678", avatar: "/images/user/user-02.jpg", plan: "Pluss", status: "active", joinedDate: "2024-06-01", lastCheckIn: "2026-03-06" },
  { id: "m3", name: "Olav Nilsen", email: "olav@mail.no", phone: "+47 934 56 789", avatar: "/images/user/user-03.jpg", plan: "Basis", status: "paused", joinedDate: "2024-01-10", lastCheckIn: "2026-01-20" },
  { id: "m4", name: "Kari Johansen", email: "kari@mail.no", phone: "+47 945 67 890", avatar: "/images/user/user-04.jpg", plan: "Premium", status: "active", joinedDate: "2023-11-22", lastCheckIn: "2026-03-06" },
  { id: "m5", name: "Lars Pedersen", email: "lars@mail.no", phone: "+47 956 78 901", avatar: "/images/user/user-05.jpg", plan: "Pluss", status: "expired", joinedDate: "2024-02-14", lastCheckIn: "2025-12-01" },
  { id: "m6", name: "Silje Berg", email: "silje@mail.no", phone: "+47 967 89 012", avatar: "/images/user/user-06.jpg", plan: "Premium", status: "active", joinedDate: "2024-07-03", lastCheckIn: "2026-03-05" },
  { id: "m7", name: "Magnus Vik", email: "magnus@mail.no", phone: "+47 978 90 123", avatar: "/images/user/user-07.jpg", plan: "Basis", status: "active", joinedDate: "2024-04-18", lastCheckIn: "2026-03-04" },
  { id: "m8", name: "Hilde Strand", email: "hilde@mail.no", phone: "+47 989 01 234", avatar: "/images/user/user-08.jpg", plan: "Pluss", status: "paused", joinedDate: "2024-05-25", lastCheckIn: "2026-02-10" },
  { id: "m9", name: "Thomas Bakke", email: "thomas@mail.no", phone: "+47 990 12 345", avatar: "/images/user/user-09.jpg", plan: "Premium", status: "active", joinedDate: "2023-09-01", lastCheckIn: "2026-03-06" },
  { id: "m10", name: "Marte Dahl", email: "marte@mail.no", phone: "+47 901 23 456", avatar: "/images/user/user-10.jpg", plan: "Basis", status: "expired", joinedDate: "2024-08-12", lastCheckIn: "2025-11-15" },
  { id: "m11", name: "Bjorn Haugen", email: "bjorn@mail.no", phone: "+47 912 34 568", avatar: "/images/user/user-11.jpg", plan: "Premium", status: "active", joinedDate: "2024-01-30", lastCheckIn: "2026-03-05" },
  { id: "m12", name: "Astrid Moen", email: "astrid@mail.no", phone: "+47 923 45 679", avatar: "/images/user/user-12.jpg", plan: "Pluss", status: "active", joinedDate: "2024-09-05", lastCheckIn: "2026-03-03" },
  { id: "m13", name: "Henrik Lund", email: "henrik@mail.no", phone: "+47 934 56 780", avatar: "/images/user/user-13.jpg", plan: "Basis", status: "paused", joinedDate: "2024-03-22", lastCheckIn: "2026-01-08" },
  { id: "m14", name: "Nora Solberg", email: "nora@mail.no", phone: "+47 945 67 891", avatar: "/images/user/user-14.jpg", plan: "Premium", status: "active", joinedDate: "2024-10-11", lastCheckIn: "2026-03-06" },
  { id: "m15", name: "Kristian Aasen", email: "kristian@mail.no", phone: "+47 956 78 902", avatar: "/images/user/user-15.jpg", plan: "Pluss", status: "active", joinedDate: "2024-06-20", lastCheckIn: "2026-03-04" },
  { id: "m16", name: "Emilie Fossum", email: "emilie@mail.no", phone: "+47 967 89 013", avatar: "/images/user/user-16.jpg", plan: "Basis", status: "expired", joinedDate: "2024-04-09", lastCheckIn: "2025-10-22" },
  { id: "m17", name: "Anders Ruud", email: "anders@mail.no", phone: "+47 978 90 124", avatar: "/images/user/user-17.jpg", plan: "Premium", status: "active", joinedDate: "2023-12-15", lastCheckIn: "2026-03-06" },
  { id: "m18", name: "Camilla Hauge", email: "camilla@mail.no", phone: "+47 989 01 235", avatar: "/images/user/user-18.jpg", plan: "Pluss", status: "paused", joinedDate: "2024-07-28", lastCheckIn: "2026-02-18" },
];

const paymentHistory = [
  { date: "2026-03-01", amount: "599 kr", method: "Visa ****4821", status: "Paid" },
  { date: "2026-02-01", amount: "599 kr", method: "Visa ****4821", status: "Paid" },
  { date: "2026-01-01", amount: "599 kr", method: "Visa ****4821", status: "Paid" },
  { date: "2025-12-01", amount: "599 kr", method: "Visa ****4821", status: "Paid" },
  { date: "2025-11-01", amount: "599 kr", method: "Visa ****4821", status: "Failed" },
];

const badges = [
  { emoji: "💯", label: "100 WODs" },
  { emoji: "🔥", label: "6-Month Streak" },
  { emoji: "🏋️", label: "Murph Finisher" },
  { emoji: "👑", label: "PR King" },
];

const statusColorMap: Record<MemberStatus, "success" | "warning" | "error"> = {
  active: "success",
  paused: "warning",
  expired: "error",
};

export default function MemberDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const member = membersData.find((m) => m.id === id);

  if (!member) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-white/[0.03]">
        <p className="text-gray-500 dark:text-gray-400">Member not found.</p>
        <Link
          href="/members"
          className="mt-4 inline-block text-sm font-medium text-brand-500 hover:text-brand-600"
        >
          Back to Members
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Back link */}
      <Link
        href="/members"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Members
      </Link>

      <div className="grid grid-cols-12 gap-6">
        {/* Profile Card */}
        <div className="col-span-12 lg:col-span-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 overflow-hidden rounded-full">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white/90">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {member.email}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {member.phone}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Badge size="sm" color="info">
                  {member.plan}
                </Badge>
                <Badge size="sm" color={statusColorMap[member.status]}>
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </Badge>
              </div>
              <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
                Member since {member.joinedDate}
              </p>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-12 lg:col-span-8">
          {/* Stats Grid */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Check-ins</p>
              <p className="mt-1 text-2xl font-semibold text-gray-800 dark:text-white/90">156</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Streak</p>
              <p className="mt-1 text-2xl font-semibold text-gray-800 dark:text-white/90">12 days</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
              <p className="text-sm text-gray-500 dark:text-gray-400">Badges Earned</p>
              <p className="mt-1 text-2xl font-semibold text-gray-800 dark:text-white/90">4</p>
            </div>
          </div>

          {/* Badges Grid */}
          <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h4 className="mb-4 text-sm font-semibold text-gray-800 dark:text-white/90">
              Badges
            </h4>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {badges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-4 text-center dark:border-gray-800 dark:bg-white/[0.03]"
                >
                  <span className="text-2xl">{badge.emoji}</span>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment History */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                Payment History
              </h4>
            </div>
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="border-b border-gray-200 dark:border-gray-800">
                    <TableCell isHeader className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      Date
                    </TableCell>
                    <TableCell isHeader className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      Amount
                    </TableCell>
                    <TableCell isHeader className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      Method
                    </TableCell>
                    <TableCell isHeader className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      Status
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment, idx) => (
                    <TableRow
                      key={idx}
                      className="border-b border-gray-100 dark:border-gray-800"
                    >
                      <TableCell className="px-6 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {payment.date}
                      </TableCell>
                      <TableCell className="px-6 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {payment.amount}
                      </TableCell>
                      <TableCell className="px-6 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {payment.method}
                      </TableCell>
                      <TableCell className="px-6 py-3">
                        <Badge
                          size="sm"
                          color={payment.status === "Paid" ? "success" : "error"}
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
