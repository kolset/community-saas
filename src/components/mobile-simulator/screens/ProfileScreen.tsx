"use client";
import Image from "next/image";

const stats = [
  { label: "WODs", value: "156" },
  { label: "Streak", value: "12d" },
  { label: "PRs", value: "23" },
];

const badges = [
  { icon: "C", name: "100 WODs" },
  { icon: "S", name: "6-Mo Streak" },
  { icon: "M", name: "Murph" },
  { icon: "P", name: "PR King" },
  { icon: "E", name: "Early Bird" },
  { icon: "F", name: "First Pull-up" },
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
    <div className="min-h-full" style={{ background: "#000", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}>
      {/* Profile Header */}
      <div className="flex flex-col items-center px-5 pt-6 pb-4">
        <div className="w-[88px] h-[88px] rounded-full p-[2px]" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.05))" }}>
          <Image src="/images/user/user-01.jpg" alt="Erik Hansen" width={84} height={84} className="w-full h-full rounded-full object-cover" />
        </div>
        <h1 className="mt-3 text-[22px] font-bold tracking-tight" style={{ color: "#fff" }}>Erik Hansen</h1>
        <p className="text-[13px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Member since Mar 2024</p>
      </div>

      {/* Stats Row */}
      <div className="flex justify-center gap-0 mx-5 rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="flex flex-col items-center py-4 flex-1"
            style={{ borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
          >
            <span className="text-[22px] font-bold" style={{ color: "#fff" }}>{s.value}</span>
            <span className="text-[11px] mt-0.5 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Membership Card */}
      <div
        className="mx-5 mt-4 p-5 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>Membership</p>
            <p className="text-[20px] font-bold mt-1" style={{ color: "#fff" }}>Premium</p>
          </div>
          <div className="text-right">
            <p className="text-[22px] font-bold" style={{ color: "#fff" }}>999 <span className="text-[13px] font-normal" style={{ color: "rgba(255,255,255,0.4)" }}>kr/mnd</span></p>
          </div>
        </div>
        <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.4)" }}>Next billing</p>
          <p className="text-[13px] font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>Apr 1, 2026</p>
        </div>
      </div>

      {/* Badges */}
      <div className="px-5 mt-6">
        <h2 className="text-[13px] uppercase tracking-widest font-medium mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>Badges</h2>
        <div className="grid grid-cols-3 gap-2">
          {badges.map((b) => (
            <div
              key={b.name}
              className="flex flex-col items-center gap-1.5 p-3 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-[16px] font-bold"
                style={{ background: "rgba(255,255,255,0.08)", color: "#fff" }}
              >
                {b.icon}
              </div>
              <span className="text-[10px] font-medium text-center leading-tight" style={{ color: "rgba(255,255,255,0.5)" }}>{b.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Records */}
      <div className="px-5 mt-6 pb-6">
        <h2 className="text-[13px] uppercase tracking-widest font-medium mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>Personal Records</h2>
        <div className="space-y-1">
          {prs.map((pr) => (
            <div
              key={pr.movement}
              className="flex items-center justify-between px-4 py-3.5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div>
                <p className="text-[14px] font-medium" style={{ color: "#fff" }}>{pr.movement}</p>
                <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{pr.date}</p>
              </div>
              <span className="text-[16px] font-bold tabular-nums" style={{ color: "#fff" }}>{pr.weight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
