"use client";
import { useState } from "react";

const days = [
  { label: "Mon", date: "9", active: true },
  { label: "Tue", date: "10", active: false },
  { label: "Wed", date: "11", active: false },
  { label: "Thu", date: "12", active: false },
  { label: "Fri", date: "13", active: false },
  { label: "Sat", date: "14", active: false },
];

const classesPerDay: Record<string, Array<{ time: string; name: string; coach: string; spots: string; color: string }>> = {
  "9": [
    { time: "06:00", name: "CrossFit WOD", coach: "Magnus Vik", spots: "4 spots left", color: "#EF4444" },
    { time: "07:30", name: "Strength", coach: "Nina Berg", spots: "8 spots left", color: "#3B82F6" },
    { time: "09:00", name: "HIIT Express", coach: "Ole Kristiansen", spots: "2 spots left", color: "#F59E0B" },
    { time: "12:00", name: "CrossFit WOD", coach: "Petter Strand", spots: "6 spots left", color: "#EF4444" },
    { time: "16:30", name: "Yoga Flow", coach: "Silje Haugen", spots: "10 spots left", color: "#8B5CF6" },
    { time: "18:00", name: "CrossFit WOD", coach: "Magnus Vik", spots: "Full", color: "#EF4444" },
  ],
  "10": [
    { time: "06:00", name: "CrossFit WOD", coach: "Petter Strand", spots: "5 spots left", color: "#EF4444" },
    { time: "08:00", name: "Mobility", coach: "Silje Haugen", spots: "12 spots left", color: "#10B981" },
    { time: "12:00", name: "HIIT Express", coach: "Ole Kristiansen", spots: "3 spots left", color: "#F59E0B" },
    { time: "17:00", name: "Strength", coach: "Nina Berg", spots: "7 spots left", color: "#3B82F6" },
    { time: "18:30", name: "CrossFit WOD", coach: "Magnus Vik", spots: "1 spot left", color: "#EF4444" },
  ],
};

// Default for other days
const defaultClasses = [
  { time: "06:00", name: "CrossFit WOD", coach: "Magnus Vik", spots: "6 spots left", color: "#EF4444" },
  { time: "09:00", name: "Yoga Flow", coach: "Silje Haugen", spots: "8 spots left", color: "#8B5CF6" },
  { time: "17:00", name: "CrossFit WOD", coach: "Petter Strand", spots: "3 spots left", color: "#EF4444" },
];

export default function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState("9");

  const classes = classesPerDay[selectedDay] || defaultClasses;

  return (
    <div className="bg-white min-h-full" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
      {/* Nav */}
      <div className="px-4 py-3 border-b border-gray-100">
        <h1 className="text-[20px] font-bold text-black">Schedule</h1>
        <p className="text-[13px] text-gray-500">March 2026</p>
      </div>

      {/* Day selector */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto">
        {days.map((d) => (
          <button
            key={d.date}
            onClick={() => setSelectedDay(d.date)}
            className={`flex flex-col items-center px-3 py-2 rounded-xl min-w-[48px] ${
              selectedDay === d.date
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <span className="text-[11px] font-medium">{d.label}</span>
            <span className="text-[17px] font-bold">{d.date}</span>
          </button>
        ))}
      </div>

      {/* Class cards */}
      <div className="px-4 space-y-3 pb-4">
        {classes.map((cls, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <div className="w-1 h-12 rounded-full" style={{ backgroundColor: cls.color }} />
            <div className="flex-1">
              <p className="text-[15px] font-semibold text-black">{cls.name}</p>
              <p className="text-[12px] text-gray-500">{cls.time} · {cls.coach}</p>
              <p className={`text-[11px] mt-0.5 ${cls.spots === "Full" ? "text-red-500 font-medium" : "text-gray-400"}`}>
                {cls.spots}
              </p>
            </div>
            <button
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium ${
                cls.spots === "Full"
                  ? "bg-gray-200 text-gray-400"
                  : "bg-black text-white"
              }`}
              disabled={cls.spots === "Full"}
            >
              {cls.spots === "Full" ? "Full" : "Book"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
