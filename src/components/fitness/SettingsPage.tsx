"use client";

import React, { useState } from "react";
import Image from "next/image";
import Badge from "@/components/ui/badge/Badge";
import Switch from "@/components/form/switch/Switch";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

interface GymData {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

interface Coach {
  id: string;
  name: string;
  avatar: string;
  specialties: string[];
  classesPerWeek: number;
}

const initialGymData: GymData = {
  name: "CrossFit Bjornsvik",
  address: "Strandgaten 42, 5013 Bergen",
  phone: "+47 555 12 345",
  email: "post@crossfitbjornsvik.no",
  website: "www.crossfitbjornsvik.no",
};

const hours = [
  { day: "Monday - Friday", hours: "06:00 - 21:00" },
  { day: "Saturday", hours: "08:00 - 18:00" },
  { day: "Sunday", hours: "10:00 - 16:00" },
];

const coaches: Coach[] = [
  { id: "co1", name: "Magnus Vik", avatar: "/images/user/user-21.jpg", specialties: ["CrossFit", "Olympic Lifting"], classesPerWeek: 12 },
  { id: "co2", name: "Silje Haugen", avatar: "/images/user/user-22.jpg", specialties: ["Yoga", "Mobility"], classesPerWeek: 8 },
  { id: "co3", name: "Ole Kristiansen", avatar: "/images/user/user-23.jpg", specialties: ["HIIT", "Conditioning"], classesPerWeek: 10 },
  { id: "co4", name: "Nina Berg", avatar: "/images/user/user-24.jpg", specialties: ["Strength", "Powerlifting"], classesPerWeek: 6 },
  { id: "co5", name: "Petter Strand", avatar: "/images/user/user-25.jpg", specialties: ["CrossFit", "Endurance"], classesPerWeek: 9 },
];

const inputClasses =
  "h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90";

const labelClasses =
  "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400";

export default function SettingsPage() {
  const [gymData, setGymData] = useState<GymData>(initialGymData);

  const handleChange = (field: keyof GymData, value: string) => {
    setGymData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Settings
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage gym profile, hours, payments, and staff
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Gym Profile + Opening Hours */}
        <div className="col-span-12 space-y-6 lg:col-span-7">
          {/* Gym Profile */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
              Gym Profile
            </h3>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4"
            >
              <div>
                <label className={labelClasses}>Name</label>
                <input
                  type="text"
                  value={gymData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>Address</label>
                <input
                  type="text"
                  value={gymData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>Phone</label>
                <input
                  type="text"
                  value={gymData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>Email</label>
                <input
                  type="email"
                  value={gymData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>Website</label>
                <input
                  type="text"
                  value={gymData.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Opening Hours */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
              Opening Hours
            </h3>
            <div className="space-y-3">
              {hours.map((item) => (
                <div
                  key={item.day}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 dark:bg-white/[0.04]"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.day}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Payment + Notifications */}
        <div className="col-span-12 space-y-6 lg:col-span-5">
          {/* Payment Settings */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
              Payment Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Payment Provider
                </span>
                <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Vipps
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Currency
                </span>
                <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                  NOK
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Auto-billing
                </span>
                <Badge color="success" size="sm">
                  Enabled
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Failed payment retry
                </span>
                <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                  3 attempts
                </span>
              </div>
            </div>
          </div>

          {/* Notification Toggles */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
              Notifications
            </h3>
            <div className="space-y-5">
              <Switch
                label="New member signup"
                defaultChecked={true}
              />
              <Switch
                label="Failed payment alert"
                defaultChecked={true}
              />
              <Switch
                label="Class reminder (24h before)"
                defaultChecked={true}
              />
              <Switch
                label="Weekly report"
                defaultChecked={false}
              />
            </div>
          </div>
        </div>

        {/* Full-Width: Coaches Table */}
        <div className="col-span-12">
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Staff / Coaches
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {coaches.length} coaches on staff
              </p>
            </div>
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="border-b border-gray-200 dark:border-gray-800">
                    <TableCell
                      isHeader
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                    >
                      Coach
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                    >
                      Specialties
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                    >
                      Classes/Week
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coaches.map((coach) => (
                    <TableRow
                      key={coach.id}
                      className="border-b border-gray-100 dark:border-gray-800"
                    >
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                            <Image
                              src={coach.avatar}
                              alt={coach.name}
                              width={40}
                              height={40}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {coach.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {coach.specialties.map((s) => (
                            <Badge key={s} size="sm" color="light">
                              {s}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {coach.classesPerWeek}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <button className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
                          Edit
                        </button>
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
