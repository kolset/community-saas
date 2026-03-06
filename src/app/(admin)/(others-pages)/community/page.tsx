import type { Metadata } from "next";
import CommunityPage from "@/components/fitness/CommunityPage";

export const metadata: Metadata = {
  title: "Community | CrossFit Bjornsvik",
};

export default function Community() {
  return <CommunityPage />;
}
