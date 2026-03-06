"use client";

export default function StatusBar() {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 pt-[16px] h-[50px]">
      <span className="text-[15px] font-semibold text-white">9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="0.5" fill="white"/>
          <rect x="5" y="5" width="3" height="7" rx="0.5" fill="white"/>
          <rect x="10" y="2" width="3" height="10" rx="0.5" fill="white"/>
          <rect x="15" y="0" width="3" height="12" rx="0.5" fill="white"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 11.5C8.83 11.5 9.5 10.83 9.5 10C9.5 9.17 8.83 8.5 8 8.5C7.17 8.5 6.5 9.17 6.5 10C6.5 10.83 7.17 11.5 8 11.5Z" fill="white"/>
          <path d="M4.93 7.57C5.69 6.81 6.79 6.33 8 6.33C9.21 6.33 10.31 6.81 11.07 7.57" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M2.1 4.73C3.61 3.22 5.69 2.27 8 2.27C10.31 2.27 12.39 3.22 13.9 4.73" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
          <rect x="0.5" y="0.5" width="22" height="12" rx="2" stroke="white" strokeOpacity="0.35"/>
          <rect x="2" y="2" width="19" height="9" rx="1" fill="white"/>
          <path d="M24 4.5V8.5C24.83 8.17 25.5 7.17 25.5 6.5C25.5 5.83 24.83 4.83 24 4.5Z" fill="white" fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}
