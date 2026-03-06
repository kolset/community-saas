"use client";

const tabs = [
  { id: "home", label: "Home", icon: "\u{1F3E0}" },
  { id: "schedule", label: "Schedule", icon: "\u{1F4C5}" },
  { id: "wod", label: "WOD", icon: "\u{1F3CB}\u{FE0F}" },
  { id: "profile", label: "Profile", icon: "\u{1F464}" },
];

export default function TabBar({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  return (
    <div className="flex items-center justify-around px-4 pb-6 pt-2" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="flex flex-col items-center gap-0.5"
        >
          <span className="text-[22px]">{tab.icon}</span>
          <span className={`text-[10px] font-medium ${activeTab === tab.id ? "text-blue-500" : "text-gray-400"}`}>
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}
