"use client";
import { useState } from "react";
import PhoneFrame from "./PhoneFrame";
import TabBar from "./TabBar";
import HomeScreen from "./screens/HomeScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import WodScreen from "./screens/WodScreen";
import ShopScreen from "./screens/ShopScreen";
import ProfileScreen from "./screens/ProfileScreen";

export default function MobileSimulator() {
  const [activeTab, setActiveTab] = useState("home");

  const screens: Record<string, React.ReactNode> = {
    home: <HomeScreen />,
    schedule: <ScheduleScreen />,
    wod: <WodScreen />,
    shop: <ShopScreen />,
    profile: <ProfileScreen />,
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Mobile App Preview
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Preview how members experience the CrossFit Bjornsvik app
        </p>
      </div>
      <div className="flex justify-center py-8">
        <PhoneFrame>
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
              {screens[activeTab]}
            </div>
            <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
