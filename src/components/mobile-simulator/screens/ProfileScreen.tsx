"use client";
import Image from "next/image";

const stats = [
  { label: "WODs", value: "156" },
  { label: "Streak", value: "12d" },
  { label: "PRs", value: "23" },
];

const badges = [
  { emoji: "\u{1F4AF}", name: "100 WODs" },
  { emoji: "\u{1F525}", name: "6-Month Streak" },
  { emoji: "\u{1F3C6}", name: "Murph Finisher" },
  { emoji: "\u{1F451}", name: "PR King" },
  { emoji: "\u{1F305}", name: "Early Bird" },
  { emoji: "\u{1F4AA}", name: "First Pull-up" },
];

const prs = [
  { movement: "Back Squat", weight: "140 kg", date: "Feb 2026" },
  { movement: "Deadlift", weight: "180 kg", date: "Mar 2026" },
  { movement: "Clean & Jerk", weight: "105 kg", date: "Jan 2026" },
  { movement: "Snatch", weight: "82 kg", date: "Feb 2026" },
  { movement: "Fran", weight: "2:53", date: "Mar 2026" },
];

export default function ProfileScreen() {
  return (
    <div className="bg-white min-h-full" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
      {/* Profile Header */}
      <div className="flex flex-col items-center px-4 pt-4 pb-3">
        <Image src="/images/user/user-01.jpg" alt="Erik Hansen" width={80} height={80} className="w-20 h-20 rounded-full object-cover" />
        <h1 className="mt-2 text-[20px] font-bold text-black">Erik Hansen</h1>
        <p className="text-[13px] text-gray-500">Member since Mar 2024</p>
      </div>

      {/* Stats Row */}
      <div className="flex justify-center gap-8 px-4 py-3 mx-4 rounded-xl bg-gray-50">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center">
            <span className="text-[20px] font-bold text-black">{s.value}</span>
            <span className="text-[11px] text-gray-500">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Membership Card */}
      <div className="mx-4 mt-4 p-4 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 text-white">
        <p className="text-[11px] uppercase tracking-wider text-gray-400">Membership</p>
        <p className="text-[18px] font-bold mt-0.5">Premium</p>
        <div className="flex justify-between items-end mt-3">
          <div>
            <p className="text-[11px] text-gray-400">Next billing</p>
            <p className="text-[14px] font-medium">Apr 1, 2026</p>
          </div>
          <p className="text-[20px] font-bold">999 kr<span className="text-[12px] font-normal text-gray-400">/mnd</span></p>
        </div>
      </div>

      {/* Badges */}
      <div className="px-4 mt-5">
        <h2 className="text-[17px] font-bold text-black mb-3">Badges</h2>
        <div className="grid grid-cols-3 gap-2">
          {badges.map((b) => (
            <div key={b.name} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-gray-50">
              <span className="text-[24px]">{b.emoji}</span>
              <span className="text-[10px] font-medium text-gray-600 text-center">{b.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Records */}
      <div className="px-4 mt-5 pb-4">
        <h2 className="text-[17px] font-bold text-black mb-3">Personal Records</h2>
        <div className="space-y-2">
          {prs.map((pr) => (
            <div key={pr.movement} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
              <div>
                <p className="text-[14px] font-medium text-black">{pr.movement}</p>
                <p className="text-[11px] text-gray-500">{pr.date}</p>
              </div>
              <span className="text-[15px] font-bold text-black">{pr.weight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
