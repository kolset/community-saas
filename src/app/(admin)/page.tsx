import type { Metadata } from "next";
import React from "react";
import { FitnessMetrics } from "@/components/fitness/FitnessMetrics";
import RetentionTarget from "@/components/fitness/RetentionTarget";
import MonthlyRevenueChart from "@/components/fitness/MonthlyRevenueChart";
import ClassAttendanceChart from "@/components/fitness/ClassAttendanceChart";
import QuickActions from "@/components/fitness/QuickActions";
import RecentActivity from "@/components/fitness/RecentActivity";

export const metadata: Metadata = {
  title: "CrossFit Bjornsvik | Admin Dashboard",
  description: "Fitness community management dashboard",
};

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <FitnessMetrics />
        <MonthlyRevenueChart />
      </div>
      <div className="col-span-12 xl:col-span-5">
        <RetentionTarget />
      </div>
      <div className="col-span-12">
        <ClassAttendanceChart />
      </div>
      <div className="col-span-12 xl:col-span-5">
        <QuickActions />
      </div>
      <div className="col-span-12 xl:col-span-7">
        <RecentActivity />
      </div>
    </div>
  );
}
