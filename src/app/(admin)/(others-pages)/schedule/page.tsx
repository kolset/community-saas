import type { Metadata } from "next";
import SchedulePage from "@/components/fitness/SchedulePage";

export const metadata: Metadata = {
  title: "Schedule | CrossFit Bjornsvik",
};

export default function Schedule() {
  return <SchedulePage />;
}
