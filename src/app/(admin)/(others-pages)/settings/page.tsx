import type { Metadata } from "next";
import SettingsPage from "@/components/fitness/SettingsPage";

export const metadata: Metadata = {
  title: "Settings | CrossFit Bjornsvik",
};

export default function Settings() {
  return <SettingsPage />;
}
