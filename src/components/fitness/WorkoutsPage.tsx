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
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";

type WodType = "For Time" | "AMRAP" | "EMOM" | "Chipper" | "Strength";

interface Wod {
  id: string;
  name: string;
  date: string;
  type: WodType;
  description: string;
  movements: string[];
  scaling?: {
    rx: string;
    scaled: string;
  };
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  score: string;
  rx: boolean;
}

const todayWod: Wod = {
  id: "w1",
  name: "Fran",
  date: "2026-03-06",
  type: "For Time",
  description: "21-15-9 reps of:",
  movements: ["Thrusters (43/30 kg)", "Pull-ups"],
  scaling: {
    rx: "43/30 kg thrusters, strict pull-ups",
    scaled: "30/20 kg thrusters, ring rows",
  },
};

const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Erik Hansen", avatar: "/images/user/user-01.jpg", score: "2:53", rx: true },
  { rank: 2, name: "Magnus Vik", avatar: "/images/user/user-21.jpg", score: "3:12", rx: true },
  { rank: 3, name: "Jonas Berg", avatar: "/images/user/user-06.jpg", score: "3:28", rx: true },
  { rank: 4, name: "Sofie Andersen", avatar: "/images/user/user-07.jpg", score: "3:45", rx: false },
  { rank: 5, name: "Ingrid Larsen", avatar: "/images/user/user-02.jpg", score: "3:52", rx: true },
  { rank: 6, name: "Anders Dahl", avatar: "/images/user/user-10.jpg", score: "4:01", rx: false },
  { rank: 7, name: "Kristine Moe", avatar: "/images/user/user-09.jpg", score: "4:15", rx: true },
  { rank: 8, name: "Thomas Bakke", avatar: "/images/user/user-04.jpg", score: "4:22", rx: false },
  { rank: 9, name: "Hanna Solberg", avatar: "/images/user/user-11.jpg", score: "4:38", rx: true },
  { rank: 10, name: "Marte Nilsen", avatar: "/images/user/user-05.jpg", score: "4:55", rx: false },
];

const wodHistory: Wod[] = [
  { id: "w2", name: "Murph", date: "2026-03-05", type: "For Time", description: "For time:", movements: ["Run, Pull-ups, Push-ups, Squats, Run"] },
  { id: "w3", name: "AMRAP 20", date: "2026-03-04", type: "AMRAP", description: "20 min AMRAP:", movements: ["Wall Balls, Box Jumps, KB Swings"] },
  { id: "w4", name: "DT", date: "2026-03-03", type: "For Time", description: "5 rounds of:", movements: ["Deadlifts, Hang Cleans, Push Jerks"] },
  { id: "w5", name: "EMOM 16", date: "2026-03-02", type: "EMOM", description: "Every minute on the minute:", movements: ["Odd: Thrusters, Even: Burpees"] },
  { id: "w6", name: "Grace", date: "2026-03-01", type: "For Time", description: "30 reps for time:", movements: ["Clean & Jerk (61/43 kg)"] },
  { id: "w7", name: "The Chipper", date: "2026-02-28", type: "Chipper", description: "For time:", movements: ["Row, Double-unders, Toes-to-bar, Wall Balls, Cleans"] },
  { id: "w8", name: "Squat Day", date: "2026-02-27", type: "Strength", description: "Back Squat:", movements: ["5-5-3-3-1-1 rep scheme"] },
  { id: "w9", name: "Cindy", date: "2026-02-26", type: "AMRAP", description: "20 min AMRAP:", movements: ["Pull-ups, Push-ups, Air Squats"] },
];

const wodTypeBadgeColor: Record<WodType, "primary" | "success" | "warning" | "error" | "info"> = {
  "For Time": "primary",
  "AMRAP": "success",
  "EMOM": "warning",
  "Chipper": "error",
  "Strength": "info",
};

const rankBgClasses: Record<number, string> = {
  1: "bg-yellow-50 dark:bg-yellow-500/10",
  2: "bg-gray-50 dark:bg-gray-500/10",
  3: "bg-orange-50 dark:bg-orange-500/10",
};

const inputClasses =
  "h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800";

export default function WorkoutsPage() {
  const { isOpen, openModal, closeModal } = useModal();
  const [editingWod, setEditingWod] = useState<Wod | null>(null);
  const [formName, setFormName] = useState("");
  const [formType, setFormType] = useState<WodType>("For Time");
  const [formDescription, setFormDescription] = useState("");
  const [formMovements, setFormMovements] = useState("");
  const [formRx, setFormRx] = useState("");
  const [formScaled, setFormScaled] = useState("");

  const handleOpenCreate = () => {
    setEditingWod(null);
    setFormName("");
    setFormType("For Time");
    setFormDescription("");
    setFormMovements("");
    setFormRx("");
    setFormScaled("");
    openModal();
  };

  const handleOpenEdit = (wod: Wod) => {
    setEditingWod(wod);
    setFormName(wod.name);
    setFormType(wod.type);
    setFormDescription(wod.description);
    setFormMovements(wod.movements.join("\n"));
    setFormRx(wod.scaling?.rx || "");
    setFormScaled(wod.scaling?.scaled || "");
    openModal();
  };

  const handleSave = () => {
    // In a real app this would persist to backend
    closeModal();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            Workouts (WOD)
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Program and track daily workouts
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
        >
          + New WOD
        </button>
      </div>

      {/* Grid layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Today's WOD - Featured Card */}
        <div className="col-span-12">
          <div className="rounded-2xl border-2 border-brand-200 bg-brand-50/50 p-6 dark:border-brand-500/30 dark:bg-brand-500/10">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-sm font-medium text-brand-600 dark:text-brand-400">
                  Today&apos;s WOD
                </span>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  {todayWod.date}
                </span>
              </div>
              <Badge size="sm" color={wodTypeBadgeColor[todayWod.type]}>
                {todayWod.type}
              </Badge>
            </div>

            <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              {todayWod.name}
            </h3>

            <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
              {todayWod.description}
            </p>

            <ul className="mb-4 space-y-1">
              {todayWod.movements.map((movement, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-800 dark:text-white/80">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                  {movement}
                </li>
              ))}
            </ul>

            {todayWod.scaling && (
              <div className="flex flex-col gap-3 rounded-xl bg-white/60 p-4 dark:bg-white/[0.06] sm:flex-row sm:gap-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    RX
                  </span>
                  <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-300">
                    {todayWod.scaling.rx}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Scaled
                  </span>
                  <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-300">
                    {todayWod.scaling.scaled}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="col-span-12 lg:col-span-7">
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Leaderboard
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Top scores for today&apos;s WOD
              </p>
            </div>

            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="border-b border-gray-200 dark:border-gray-800">
                    <TableCell isHeader className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      Rank
                    </TableCell>
                    <TableCell isHeader className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      Name
                    </TableCell>
                    <TableCell isHeader className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      Score
                    </TableCell>
                    <TableCell isHeader className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      RX
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboard.map((entry) => (
                    <TableRow
                      key={entry.rank}
                      className={`border-b border-gray-100 dark:border-gray-800 ${rankBgClasses[entry.rank] || ""}`}
                    >
                      <TableCell className="px-6 py-4">
                        <span className={`text-sm font-bold ${entry.rank <= 3 ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
                          #{entry.rank}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                            <Image
                              src={entry.avatar}
                              alt={entry.name}
                              width={32}
                              height={32}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {entry.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm font-semibold text-gray-800 dark:text-white/90">
                        {entry.score}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        {entry.rx ? (
                          <Badge size="sm" color="success">RX</Badge>
                        ) : (
                          <Badge size="sm" color="light">Scaled</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* WOD History - takes remaining space on lg, full width below */}
        <div className="col-span-12 lg:col-span-5">
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                WOD History
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Past workouts
              </p>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {wodHistory.map((wod) => (
                <div
                  key={wod.id}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {wod.name}
                      </span>
                      <Badge size="sm" color={wodTypeBadgeColor[wod.type]}>
                        {wod.type}
                      </Badge>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
                      {wod.date} &middot; {wod.movements.join(", ")}
                    </p>
                  </div>
                  <div className="ml-3 flex flex-shrink-0 items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(wod)}
                      className="rounded-lg border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create/Edit WOD Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-lg p-6 lg:p-8">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {editingWod ? "Edit WOD" : "Create New WOD"}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Fran"
                className={inputClasses}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Type
              </label>
              <select
                value={formType}
                onChange={(e) => setFormType(e.target.value as WodType)}
                className={inputClasses}
              >
                <option value="For Time">For Time</option>
                <option value="AMRAP">AMRAP</option>
                <option value="EMOM">EMOM</option>
                <option value="Chipper">Chipper</option>
                <option value="Strength">Strength</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="e.g. 21-15-9 reps of:"
                rows={2}
                className={inputClasses + " h-auto"}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Movements (one per line)
              </label>
              <textarea
                value={formMovements}
                onChange={(e) => setFormMovements(e.target.value)}
                placeholder={"Thrusters (43/30 kg)\nPull-ups"}
                rows={3}
                className={inputClasses + " h-auto"}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                RX Scaling
              </label>
              <input
                type="text"
                value={formRx}
                onChange={(e) => setFormRx(e.target.value)}
                placeholder="e.g. 43/30 kg thrusters, strict pull-ups"
                className={inputClasses}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Scaled Option
              </label>
              <input
                type="text"
                value={formScaled}
                onChange={(e) => setFormScaled(e.target.value)}
                placeholder="e.g. 30/20 kg thrusters, ring rows"
                className={inputClasses}
              />
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
              {editingWod ? "Save Changes" : "Create WOD"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
