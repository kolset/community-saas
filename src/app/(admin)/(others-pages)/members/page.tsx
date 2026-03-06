import type { Metadata } from "next";
import MembersList from "@/components/fitness/MembersList";

export const metadata: Metadata = {
  title: "Members | CrossFit Bjornsvik",
};

export default function MembersPage() {
  return <MembersList />;
}
