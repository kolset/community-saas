import type { Metadata } from "next";
import AvtaleGiroPage from "@/components/fitness/AvtaleGiroPage";

export const metadata: Metadata = {
  title: "AvtaleGiro | CrossFit Bjornsvik",
};

export default function AvtaleGiroRoute() {
  return <AvtaleGiroPage />;
}
