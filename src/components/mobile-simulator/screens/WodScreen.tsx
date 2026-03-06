"use client";
import Image from "next/image";

const leaderboard = [
  { rank: 1, name: "Erik H.", avatar: "/images/user/user-01.jpg", score: "2:53", rx: true },
  { rank: 2, name: "Magnus V.", avatar: "/images/user/user-21.jpg", score: "3:12", rx: true },
  { rank: 3, name: "Jonas B.", avatar: "/images/user/user-06.jpg", score: "3:28", rx: true },
  { rank: 4, name: "Sofie A.", avatar: "/images/user/user-07.jpg", score: "3:45", rx: false },
  { rank: 5, name: "Ingrid L.", avatar: "/images/user/user-02.jpg", score: "3:52", rx: true },
];

export default function WodScreen() {
  return (
    <div className="min-h-full" style={{ background: "#000", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}>
      {/* Header */}
      <div className="px-5 pt-2 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="text-[13px] uppercase tracking-widest font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>Today&apos;s WOD</p>
        <h1 className="text-[34px] font-bold tracking-tight" style={{ color: "#fff" }}>Fran</h1>
      </div>

      {/* WOD Card */}
      <div className="mx-5 mt-5 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-2 mb-4">
          <span
            className="px-3 py-1 rounded-full text-[12px] font-semibold"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
          >
            For Time
          </span>
        </div>
        <p className="text-[16px] font-semibold mb-3" style={{ color: "#fff" }}>21-15-9 reps of:</p>
        <div className="space-y-2.5">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.4)" }} />
            <span className="text-[14px]" style={{ color: "rgba(255,255,255,0.7)" }}>Thrusters (43/30 kg)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.4)" }} />
            <span className="text-[14px]" style={{ color: "rgba(255,255,255,0.7)" }}>Pull-ups</span>
          </div>
        </div>
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>RX</p>
              <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.6)" }}>43/30 kg, strict pull-ups</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Scaled</p>
              <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.6)" }}>30/20 kg, ring rows</p>
            </div>
          </div>
        </div>
      </div>

      {/* Log Score Button */}
      <div className="px-5 mt-4">
        <button
          className="w-full py-3.5 rounded-2xl text-[15px] font-semibold tracking-wide"
          style={{ background: "#fff", color: "#000" }}
        >
          Log Your Score
        </button>
      </div>

      {/* Leaderboard */}
      <div className="px-5 mt-7">
        <h2 className="text-[13px] uppercase tracking-widest font-medium mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>Leaderboard</h2>
        <div className="space-y-1">
          {leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{
                background: entry.rank <= 3 ? "rgba(255,255,255,0.04)" : "transparent",
              }}
            >
              <span
                className="w-7 text-[14px] font-bold shrink-0"
                style={{
                  color: entry.rank === 1 ? "#fff" : entry.rank <= 3 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)",
                }}
              >
                {entry.rank}
              </span>
              <Image src={entry.avatar} alt={entry.name} width={32} height={32} className="w-8 h-8 rounded-full object-cover shrink-0" />
              <span className="text-[14px] font-medium flex-1" style={{ color: "#fff" }}>{entry.name}</span>
              {entry.rx && (
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded"
                  style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
                >
                  RX
                </span>
              )}
              <span className="text-[14px] font-semibold tabular-nums" style={{ color: "#fff" }}>{entry.score}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-6" />
    </div>
  );
}
