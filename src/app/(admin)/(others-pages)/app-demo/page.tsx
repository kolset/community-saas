import type { Metadata } from "next";
import MobileSimulator from "@/components/mobile-simulator/MobileSimulator";

export const metadata: Metadata = {
  title: "App Demo | CrossFit Bjornsvik",
};

export default function AppDemo() {
  return <MobileSimulator />;
}
