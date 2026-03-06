"use client";
import StatusBar from "./StatusBar";

export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative bg-black rounded-[55px] p-[12px] shadow-2xl"
      style={{ width: 390, height: 844 }}
    >
      {/* Dynamic Island */}
      <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-20" />

      {/* Screen */}
      <div className="relative w-full h-full bg-white rounded-[43px] overflow-hidden">
        <StatusBar />
        <div className="h-full pt-[50px]">
          {children}
        </div>
      </div>
    </div>
  );
}
