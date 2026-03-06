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
    <div className="bg-white min-h-full" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-[12px] text-gray-500 uppercase tracking-wide font-medium">Today's WOD</p>
        <h1 className="text-[28px] font-bold text-black">Fran</h1>
      </div>

      {/* WOD Card */}
      <div className="mx-4 mt-4 p-4 rounded-2xl bg-gray-50">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-600 text-[12px] font-medium">For Time</span>
        </div>
        <p className="text-[15px] font-semibold text-black mb-2">21-15-9 reps of:</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            <span className="text-[14px] text-gray-700">Thrusters (43/30 kg)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            <span className="text-[14px] text-gray-700">Pull-ups</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-[12px] text-gray-500"><span className="font-medium">RX:</span> 43/30 kg, strict pull-ups</p>
          <p className="text-[12px] text-gray-500"><span className="font-medium">Scaled:</span> 30/20 kg, ring rows</p>
        </div>
      </div>

      {/* Log Score Button */}
      <div className="px-4 mt-4">
        <button className="w-full py-3 rounded-xl bg-black text-white text-[15px] font-semibold">
          Log Your Score
        </button>
      </div>

      {/* Leaderboard */}
      <div className="px-4 mt-6">
        <h2 className="text-[17px] font-bold text-black mb-3">Leaderboard</h2>
        <div className="space-y-2">
          {leaderboard.map((entry) => (
            <div key={entry.rank} className={`flex items-center gap-3 p-2.5 rounded-xl ${entry.rank <= 3 ? "bg-gray-50" : ""}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold ${
                entry.rank === 1 ? "bg-yellow-100 text-yellow-700" :
                entry.rank === 2 ? "bg-gray-200 text-gray-700" :
                entry.rank === 3 ? "bg-orange-100 text-orange-700" :
                "text-gray-400"
              }`}>
                {entry.rank}
              </span>
              <Image src={entry.avatar} alt={entry.name} width={32} height={32} className="w-8 h-8 rounded-full object-cover" />
              <span className="text-[14px] font-medium text-black flex-1">{entry.name}</span>
              {entry.rx && <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">RX</span>}
              <span className="text-[14px] font-semibold text-black">{entry.score}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom padding for tab bar */}
      <div className="h-4" />
    </div>
  );
}
