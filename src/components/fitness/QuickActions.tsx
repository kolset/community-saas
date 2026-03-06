"use client";
import React from "react";

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
        Quick Actions
      </h3>
      <div className="flex flex-wrap items-center gap-3">
        <button className="rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600">
          New Member
        </button>
        <button className="rounded-lg bg-success-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-success-600">
          Create Class
        </button>
        <button className="rounded-lg bg-warning-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-warning-600">
          Log WOD
        </button>
      </div>
    </div>
  );
}
