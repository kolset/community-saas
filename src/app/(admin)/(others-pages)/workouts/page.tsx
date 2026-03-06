import type { Metadata } from "next";
import WorkoutsPage from "@/components/fitness/WorkoutsPage";

export const metadata: Metadata = {
  title: "Workouts | CrossFit Bjornsvik",
};

export default function Workouts() {
  return <WorkoutsPage />;
}
