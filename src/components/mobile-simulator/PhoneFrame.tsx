"use client";
import StatusBar from "./StatusBar";

export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative rounded-[55px] p-[12px]"
      style={{
        width: 390,
        height: 844,
        background: "#000",
        boxShadow: "0 50px 100px -20px rgba(0,0,0,0.5), 0 30px 60px -30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
    >
      {/* Dynamic Island */}
      <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-20" />

      {/* Screen */}
      <div className="relative w-full h-full rounded-[43px] overflow-hidden" style={{ background: "#000" }}>
        <StatusBar />
        <div className="h-full pt-[50px]">
          {children}
        </div>
      </div>
    </div>
  );
}
