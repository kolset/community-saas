import type { Metadata } from "next";
import MembershipsPage from "@/components/fitness/MembershipsPage";

export const metadata: Metadata = {
  title: "Memberships | CrossFit Bjornsvik",
};

export default function Memberships() {
  return <MembershipsPage />;
}
