"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import {
  avtaleGiroData,
  avtaleGiroStats,
  avtaleGiroFunnel,
  incentiveTiers,
  avtaleGiroMessages,
} from "@/data/mock-avtalegiro";
import type { AvtaleGiroStatus } from "@/data/mock-avtalegiro";

const statusBadgeColor: Record<AvtaleGiroStatus, "success" | "warning" | "error" | "light"> = {
  active: "success",
  pending: "warning",
  failed: "error",
  not_enrolled: "light",
};

const statusLabel: Record<AvtaleGiroStatus, string> = {
  active: "Active",
  pending: "Pending",
  failed: "Failed",
  not_enrolled: "Not enrolled",
};

type SubTab = "overview" | "incentives" | "messages";

export default function AvtaleGiroPage() {
  const [subTab, setSubTab] = useState<SubTab>("overview");
  const [sendingMessage, setSendingMessage] = useState<string | null>(null);

  const handleSendMessage = (id: string) => {
    setSendingMessage(id);
    setTimeout(() => setSendingMessage(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          AvtaleGiro
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage direct debit enrollment, incentives, and member messaging
        </p>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800 w-fit">
        {(["overview", "incentives", "messages"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setSubTab(t)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              subTab === t
                ? "bg-white text-gray-900 shadow-theme-xs dark:bg-gray-900 dark:text-white"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* ===== OVERVIEW ===== */}
      {subTab === "overview" && (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
              <p className="text-sm text-gray-500 dark:text-gray-400">Enrollment Rate</p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{avtaleGiroStats.enrollmentRate}%</p>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className="h-full rounded-full bg-success-500"
                  style={{ width: `${avtaleGiroStats.enrollmentRate}%` }}
                />
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
              <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
              <p className="mt-1 text-2xl font-bold text-success-600 dark:text-success-400">{avtaleGiroStats.enrolled}</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Auto-debiting monthly</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending / Failed</p>
              <p className="mt-1 text-2xl font-bold text-warning-600 dark:text-warning-400">{avtaleGiroStats.pending + avtaleGiroStats.failed}</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Needs follow-up</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
              <p className="text-sm text-gray-500 dark:text-gray-400">Not Enrolled</p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{avtaleGiroStats.notEnrolled}</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Convert to AvtaleGiro</p>
            </div>
          </div>

          {/* Conversion Banner */}
          {avtaleGiroStats.notEnrolled > 0 && (
            <div className="flex flex-col gap-4 rounded-xl border border-brand-200 bg-brand-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-brand-500/25 dark:bg-brand-500/10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-500/20">
                  <svg className="h-5 w-5 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {avtaleGiroStats.notEnrolled} members not on AvtaleGiro
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Members on AvtaleGiro have 3x lower churn. Send enrollment invites to increase retention.
                  </p>
                </div>
              </div>
              <button className="rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 whitespace-nowrap">
                Send Invites
              </button>
            </div>
          )}

          {/* Table */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                AvtaleGiro Enrollment
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {avtaleGiroStats.total} members
              </p>
            </div>
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="border-b border-gray-200 dark:border-gray-800">
                    <TableCell isHeader className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Member</TableCell>
                    <TableCell isHeader className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Status</TableCell>
                    <TableCell isHeader className="hidden px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 md:table-cell">Plan</TableCell>
                    <TableCell isHeader className="hidden px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 sm:table-cell">Bank Ref</TableCell>
                    <TableCell isHeader className="hidden px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 lg:table-cell">Amount</TableCell>
                    <TableCell isHeader className="hidden px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 lg:table-cell">Next Debit</TableCell>
                    <TableCell isHeader className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Action</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {avtaleGiroData.map((entry) => (
                    <TableRow key={entry.memberId} className="border-b border-gray-100 dark:border-gray-800">
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                            <Image src={entry.avatar} alt={entry.memberName} width={32} height={32} className="h-full w-full object-cover" />
                          </div>
                          <span className="text-sm font-medium text-gray-800 dark:text-white/90">{entry.memberName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <Badge size="sm" color={statusBadgeColor[entry.status]}>
                          {statusLabel[entry.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden px-6 py-4 text-sm text-gray-600 dark:text-gray-400 md:table-cell">
                        {entry.plan}
                      </TableCell>
                      <TableCell className="hidden px-6 py-4 text-sm font-mono text-gray-500 dark:text-gray-400 sm:table-cell">
                        {entry.bankRef || "\u2014"}
                      </TableCell>
                      <TableCell className="hidden px-6 py-4 text-sm font-medium text-gray-800 dark:text-white/90 lg:table-cell">
                        {entry.amount > 0 ? `${entry.amount} kr` : "\u2014"}
                      </TableCell>
                      <TableCell className="hidden px-6 py-4 text-sm text-gray-500 dark:text-gray-400 lg:table-cell">
                        {entry.nextDebit ? new Date(entry.nextDebit).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "\u2014"}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        {entry.status === "not_enrolled" && (
                          <button className="rounded-lg border border-brand-300 bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-600 hover:bg-brand-100 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-400 dark:hover:bg-brand-500/20">
                            Send invite
                          </button>
                        )}
                        {entry.status === "failed" && (
                          <button className="rounded-lg border border-error-300 bg-error-50 px-3 py-1.5 text-xs font-medium text-error-600 hover:bg-error-100 dark:border-error-500/30 dark:bg-error-500/10 dark:text-error-400 dark:hover:bg-error-500/20">
                            Retry
                          </button>
                        )}
                        {entry.status === "pending" && (
                          <button className="rounded-lg border border-warning-300 bg-warning-50 px-3 py-1.5 text-xs font-medium text-warning-600 hover:bg-warning-100 dark:border-warning-500/30 dark:bg-warning-500/10 dark:text-warning-400 dark:hover:bg-warning-500/20">
                            Remind
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      )}

      {/* ===== INCENTIVES ===== */}
      {subTab === "incentives" && (
        <>
          {/* Conversion Funnel */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Conversion Funnel</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Track how invites convert to AvtaleGiro signups</p>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Last 30 days</span>
            </div>

            <div className="space-y-4">
              {avtaleGiroFunnel.map((step, i) => {
                const dropoff = i > 0
                  ? Math.round(((avtaleGiroFunnel[i - 1].count - step.count) / avtaleGiroFunnel[i - 1].count) * 100)
                  : 0;
                const isLast = i === avtaleGiroFunnel.length - 1;
                return (
                  <div key={step.label}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-800 dark:text-white/90">{step.label}</span>
                        {i > 0 && dropoff > 0 && (
                          <span className="text-xs text-gray-400 dark:text-gray-500">-{dropoff}% drop</span>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-gray-800 dark:text-white/90">{step.count}</span>
                    </div>
                    <div className="h-8 w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                      <div
                        className={`flex h-full items-center justify-end rounded-lg pr-3 transition-all ${
                          isLast
                            ? "bg-success-500"
                            : i === 0
                            ? "bg-gray-300 dark:bg-gray-600"
                            : "bg-brand-400 dark:bg-brand-500"
                        }`}
                        style={{ width: `${Math.max(step.percentage, 8)}%` }}
                      >
                        {step.percentage > 15 && (
                          <span className="text-xs font-medium text-white">{step.percentage}%</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4 dark:border-gray-800">
              <svg className="h-4 w-4 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
              </svg>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Overall conversion rate:{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {avtaleGiroFunnel[avtaleGiroFunnel.length - 1].percentage}%
                </span>{" "}
                from invite to signup
              </p>
            </div>
          </div>

          {/* Incentive Tiers */}
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Incentive Tiers</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Members earn better perks for signing up faster</p>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {incentiveTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`relative rounded-2xl border bg-white p-6 dark:bg-white/[0.03] ${tier.bgColor}`}
                >
                  {tier.level === 3 && (
                    <span className="absolute right-4 top-4 rounded-full bg-warning-100 px-2.5 py-0.5 text-xs font-semibold text-warning-600 dark:bg-warning-500/20 dark:text-warning-400">
                      Best Value
                    </span>
                  )}

                  <div className="mb-4 flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tier.badgeColor}`}>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white">{tier.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{tier.description}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{tier.deadline}</span>
                  </div>

                  <ul className="space-y-2.5">
                    {tier.perks.map((perk, pi) => (
                      <li key={pi} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <svg className={`mt-0.5 h-4 w-4 flex-shrink-0 ${tier.textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ===== MESSAGES ===== */}
      {subTab === "messages" && (
        <>
          {/* Message Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Sent</p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                {avtaleGiroMessages.reduce((acc, m) => acc + m.sentCount, 0)}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg Open Rate</p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(avtaleGiroMessages.reduce((acc, m) => acc + m.openRate, 0) / avtaleGiroMessages.length)}%
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg Conversion</p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(avtaleGiroMessages.reduce((acc, m) => acc + m.conversionRate, 0) / avtaleGiroMessages.length)}%
              </p>
            </div>
          </div>

          {/* Header + Create */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">In-App Message Templates</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Automated nudges sent to members not on AvtaleGiro</p>
            </div>
            <button className="rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 whitespace-nowrap">
              + New Template
            </button>
          </div>

          {/* Message Cards */}
          <div className="space-y-4">
            {avtaleGiroMessages.map((msg) => {
              const isSending = sendingMessage === msg.id;
              return (
                <div
                  key={msg.id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1 min-w-0">
                      {/* Title row */}
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90">{msg.name}</h4>
                        <Badge
                          size="sm"
                          color={msg.status === "active" ? "success" : msg.status === "draft" ? "light" : "warning"}
                        >
                          {msg.status.charAt(0).toUpperCase() + msg.status.slice(1)}
                        </Badge>
                        {msg.tierRef !== "all" && (
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                            {msg.tierRef}
                          </span>
                        )}
                      </div>

                      {/* Subject */}
                      <p className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">{msg.subject}</p>

                      {/* Body */}
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{msg.body}</p>

                      {/* Stats row */}
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                          </svg>
                          {msg.sentCount} sent
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                          {msg.openRate}% opened
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                          </svg>
                          {msg.conversionRate}% converted
                        </span>
                        {msg.lastSent && (
                          <span className="flex items-center gap-1">
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Last sent {new Date(msg.lastSent).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleSendMessage(msg.id)}
                        disabled={isSending}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                          isSending
                            ? "border-success-300 bg-success-50 text-success-600 dark:border-success-500/30 dark:bg-success-500/10 dark:text-success-400"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
                        }`}
                      >
                        {isSending ? (
                          <>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            Sent!
                          </>
                        ) : (
                          <>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                            </svg>
                            Send to {avtaleGiroStats.notEnrolled}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
