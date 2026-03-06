"use client";
import { useState } from "react";

const days = [
  { label: "Mon", date: "9" },
  { label: "Tue", date: "10" },
  { label: "Wed", date: "11" },
  { label: "Thu", date: "12" },
  { label: "Fri", date: "13" },
  { label: "Sat", date: "14" },
];

const classesPerDay: Record<string, Array<{ time: string; name: string; coach: string; spots: string; type: string }>> = {
  "9": [
    { time: "06:00", name: "CrossFit WOD", coach: "Magnus Vik", spots: "4 left", type: "crossfit" },
    { time: "07:30", name: "Strength", coach: "Nina Berg", spots: "8 left", type: "strength" },
    { time: "09:00", name: "HIIT Express", coach: "Ole Kristiansen", spots: "2 left", type: "hiit" },
    { time: "12:00", name: "CrossFit WOD", coach: "Petter Strand", spots: "6 left", type: "crossfit" },
    { time: "16:30", name: "Yoga Flow", coach: "Silje Haugen", spots: "10 left", type: "yoga" },
    { time: "18:00", name: "CrossFit WOD", coach: "Magnus Vik", spots: "Full", type: "crossfit" },
  ],
  "10": [
    { time: "06:00", name: "CrossFit WOD", coach: "Petter Strand", spots: "5 left", type: "crossfit" },
    { time: "08:00", name: "Mobility", coach: "Silje Haugen", spots: "12 left", type: "mobility" },
    { time: "12:00", name: "HIIT Express", coach: "Ole Kristiansen", spots: "3 left", type: "hiit" },
    { time: "17:00", name: "Strength", coach: "Nina Berg", spots: "7 left", type: "strength" },
    { time: "18:30", name: "CrossFit WOD", coach: "Magnus Vik", spots: "1 left", type: "crossfit" },
  ],
};

const defaultClasses = [
  { time: "06:00", name: "CrossFit WOD", coach: "Magnus Vik", spots: "6 left", type: "crossfit" },
  { time: "09:00", name: "Yoga Flow", coach: "Silje Haugen", spots: "8 left", type: "yoga" },
  { time: "17:00", name: "CrossFit WOD", coach: "Petter Strand", spots: "3 left", type: "crossfit" },
];

export default function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState("9");
  const classes = classesPerDay[selectedDay] || defaultClasses;

  return (
    <div className="min-h-full" style={{ background: "#000", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}>
      {/* Header */}
      <div className="px-5 pt-2 pb-1">
        <p className="text-[13px] uppercase tracking-widest font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>March 2026</p>
        <h1 className="text-[28px] font-bold tracking-tight" style={{ color: "#fff" }}>Schedule</h1>
      </div>

      {/* Day selector */}
      <div className="flex gap-2 px-5 py-3">
        {days.map((d) => (
          <button
            key={d.date}
            onClick={() => setSelectedDay(d.date)}
            className="flex flex-col items-center py-2 rounded-2xl min-w-[48px] transition-all"
            style={{
              background: selectedDay === d.date ? "#fff" : "rgba(255,255,255,0.05)",
            }}
          >
            <span
              className="text-[11px] font-medium"
              style={{ color: selectedDay === d.date ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.35)" }}
            >
              {d.label}
            </span>
            <span
              className="text-[18px] font-bold"
              style={{ color: selectedDay === d.date ? "#000" : "#fff" }}
            >
              {d.date}
            </span>
          </button>
        ))}
      </div>

      {/* Class cards */}
      <div className="px-5 space-y-2 pb-4 mt-1">
        {classes.map((cls, i) => {
          const isFull = cls.spots === "Full";
          return (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              {/* Time column */}
              <div className="w-[52px] shrink-0">
                <p className="text-[15px] font-semibold" style={{ color: "#fff" }}>{cls.time}</p>
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold truncate" style={{ color: "#fff" }}>{cls.name}</p>
                <p className="text-[12px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{cls.coach}</p>
                <p
                  className="text-[11px] mt-1 font-medium"
                  style={{ color: isFull ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.5)" }}
                >
                  {cls.spots}
                </p>
              </div>
              {/* Book button */}
              <button
                className="shrink-0 px-5 py-2 rounded-full text-[13px] font-semibold transition-all"
                style={{
                  background: isFull ? "rgba(255,255,255,0.05)" : "#fff",
                  color: isFull ? "rgba(255,255,255,0.2)" : "#000",
                }}
                disabled={isFull}
              >
                {isFull ? "Full" : "Book"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
