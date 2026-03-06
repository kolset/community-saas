"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";

type PaymentStatus = "paid" | "failed" | "pending";
type PaymentMethod = "Vipps" | "Card" | "AvtaleGiro";
type PlanInterval = "month" | "session";

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: PlanInterval;
  features: string[];
  memberCount: number;
  active: boolean;
}

interface Payment {
  id: string;
  memberName: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  date: string;
  plan: string;
}

const initialPlans: Plan[] = [
  { id: "p1", name: "Drop-In", price: 199, interval: "session", features: ["Single class access", "No commitment"], memberCount: 12, active: true },
  { id: "p2", name: "Basis", price: 599, interval: "month", features: ["3x per week", "CrossFit classes", "Open gym"], memberCount: 45, active: true },
  { id: "p3", name: "Pluss", price: 799, interval: "month", features: ["Unlimited classes", "All class types", "Open gym"], memberCount: 98, active: true },
  { id: "p4", name: "Premium", price: 999, interval: "month", features: ["Unlimited classes", "Personal coaching", "Nutrition plan", "Priority booking"], memberCount: 67, active: true },
  { id: "p5", name: "Familie", price: 1499, interval: "month", features: ["2 adults", "Kids classes", "Unlimited access", "Family events"], memberCount: 25, active: true },
];

const payments: Payment[] = [
  { id: "pay1", memberName: "Erik Hansen", amount: 999, method: "Vipps", status: "paid", date: "2026-03-06", plan: "Premium" },
  { id: "pay2", memberName: "Ingrid Larsen", amount: 799, method: "Card", status: "paid", date: "2026-03-06", plan: "Pluss" },
  { id: "pay3", memberName: "Lars Haugen", amount: 999, method: "AvtaleGiro", status: "failed", date: "2026-03-05", plan: "Premium" },
  { id: "pay4", memberName: "Sofie Andersen", amount: 599, method: "Vipps", status: "paid", date: "2026-03-05", plan: "Basis" },
  { id: "pay5", memberName: "Magnus Vik", amount: 799, method: "Card", status: "pending", date: "2026-03-05", plan: "Pluss" },
  { id: "pay6", memberName: "Kristine Moe", amount: 1499, method: "AvtaleGiro", status: "paid", date: "2026-03-04", plan: "Familie" },
  { id: "pay7", memberName: "Thomas Bakke", amount: 999, method: "Vipps", status: "failed", date: "2026-03-04", plan: "Premium" },
  { id: "pay8", memberName: "Hanna Solberg", amount: 199, method: "Card", status: "paid", date: "2026-03-04", plan: "Drop-In" },
  { id: "pay9", memberName: "Anders Dahl", amount: 799, method: "Vipps", status: "paid", date: "2026-03-03", plan: "Pluss" },
  { id: "pay10", memberName: "Marte Nilsen", amount: 599, method: "AvtaleGiro", status: "failed", date: "2026-03-03", plan: "Basis" },
  { id: "pay11", memberName: "Jonas Berg", amount: 999, method: "Card", status: "paid", date: "2026-03-03", plan: "Premium" },
  { id: "pay12", memberName: "Nora Solberg", amount: 799, method: "Vipps", status: "paid", date: "2026-03-02", plan: "Pluss" },
  { id: "pay13", memberName: "Bjorn Haugen", amount: 1499, method: "AvtaleGiro", status: "pending", date: "2026-03-02", plan: "Familie" },
  { id: "pay14", memberName: "Astrid Moen", amount: 599, method: "Card", status: "paid", date: "2026-03-01", plan: "Basis" },
  { id: "pay15", memberName: "Henrik Lund", amount: 199, method: "Vipps", status: "paid", date: "2026-03-01", plan: "Drop-In" },
  { id: "pay16", memberName: "Camilla Hauge", amount: 999, method: "AvtaleGiro", status: "pending", date: "2026-03-01", plan: "Premium" },
];

const statusColorMap: Record<PaymentStatus, "success" | "error" | "warning"> = {
  paid: "success",
  failed: "error",
  pending: "warning",
};

const inputClasses =
  "h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800";

export default function MembershipsPage() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const { isOpen, openModal, closeModal } = useModal();
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formInterval, setFormInterval] = useState<PlanInterval>("month");
  const [formFeatures, setFormFeatures] = useState("");
  const [formActive, setFormActive] = useState(true);

  const failedCount = payments.filter((p) => p.status === "failed").length;

  const handleOpenCreate = () => {
    setEditingPlan(null);
    setFormName("");
    setFormPrice("");
    setFormInterval("month");
    setFormFeatures("");
    setFormActive(true);
    openModal();
  };

  const handleOpenEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setFormName(plan.name);
    setFormPrice(String(plan.price));
    setFormInterval(plan.interval);
    setFormFeatures(plan.features.join("\n"));
    setFormActive(plan.active);
    openModal();
  };

  const handleSave = () => {
    const features = formFeatures
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    if (editingPlan) {
      setPlans((prev) =>
        prev.map((p) =>
          p.id === editingPlan.id
            ? { ...p, name: formName, price: Number(formPrice), interval: formInterval, features, active: formActive }
            : p
        )
      );
    } else {
      const newPlan: Plan = {
        id: `p${Date.now()}`,
        name: formName,
        price: Number(formPrice),
        interval: formInterval,
        features,
        memberCount: 0,
        active: formActive,
      };
      setPlans((prev) => [...prev, newPlan]);
    }
    closeModal();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            Memberships & Billing
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage plans and track payments
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
        >
          + New Plan
        </button>
      </div>

      {/* Failed Payments Alert */}
      {failedCount > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-error-200 bg-error-50 p-4 dark:border-error-500/25 dark:bg-error-500/15">
          <div className="flex items-center gap-3">
            <svg
              className="h-5 w-5 text-error-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
            <span className="text-sm font-medium text-error-600 dark:text-error-400">
              {failedCount} failed payment{failedCount !== 1 ? "s" : ""} require attention
            </span>
          </div>
          <button className="rounded-lg border border-error-300 bg-white px-3 py-1.5 text-sm font-medium text-error-600 hover:bg-error-50 dark:border-error-500/30 dark:bg-transparent dark:text-error-400 dark:hover:bg-error-500/10">
            View Details
          </button>
        </div>
      )}

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                {plan.name}
              </h3>
              <button
                onClick={() => handleOpenEdit(plan)}
                className="rounded-lg border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
              >
                Edit
              </button>
            </div>

            <div className="mb-4">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {plan.price} kr
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                /{plan.interval === "month" ? "mnd" : "gang"}
              </span>
            </div>

            <ul className="mb-4 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <svg
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-success-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-100 pt-3 dark:border-gray-800">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {plan.memberCount} member{plan.memberCount !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Payments Table */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Payments
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {payments.length} transactions
          </p>
        </div>

        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-b border-gray-200 dark:border-gray-800">
                <TableCell isHeader className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Member
                </TableCell>
                <TableCell isHeader className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Plan
                </TableCell>
                <TableCell isHeader className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Amount
                </TableCell>
                <TableCell isHeader className="hidden px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 sm:table-cell">
                  Method
                </TableCell>
                <TableCell isHeader className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Status
                </TableCell>
                <TableCell isHeader className="hidden px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 md:table-cell">
                  Date
                </TableCell>
                <TableCell isHeader className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow
                  key={payment.id}
                  className="border-b border-gray-100 dark:border-gray-800"
                >
                  <TableCell className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-white/90">
                    {payment.memberName}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {payment.plan}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-white/90">
                    {payment.amount} kr
                  </TableCell>
                  <TableCell className="hidden px-6 py-4 sm:table-cell">
                    <Badge size="sm" color="light">
                      {payment.method}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge size="sm" color={statusColorMap[payment.status]}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden px-6 py-4 text-sm text-gray-600 dark:text-gray-400 md:table-cell">
                    {payment.date}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <button className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
                      View
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create/Edit Plan Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-lg p-6 lg:p-8">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {editingPlan ? "Edit Plan" : "Create New Plan"}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Plan Name
              </label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Premium"
                className={inputClasses}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Price (NOK)
              </label>
              <input
                type="number"
                value={formPrice}
                onChange={(e) => setFormPrice(e.target.value)}
                placeholder="e.g. 999"
                className={inputClasses}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Interval
              </label>
              <select
                value={formInterval}
                onChange={(e) => setFormInterval(e.target.value as PlanInterval)}
                className={inputClasses}
              >
                <option value="month">Per month (mnd)</option>
                <option value="session">Per session (gang)</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Features (one per line)
              </label>
              <textarea
                value={formFeatures}
                onChange={(e) => setFormFeatures(e.target.value)}
                placeholder={"Unlimited classes\nPersonal coaching\nNutrition plan"}
                rows={4}
                className={inputClasses + " h-auto"}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="plan-active"
                checked={formActive}
                onChange={(e) => setFormActive(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-700"
              />
              <label htmlFor="plan-active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Active
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={closeModal}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
            >
              {editingPlan ? "Save Changes" : "Create Plan"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
