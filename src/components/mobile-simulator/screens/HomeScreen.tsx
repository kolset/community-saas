"use client";
import Image from "next/image";

const stories = [
  { name: "Magnus", avatar: "/images/user/user-21.jpg", hasNew: true },
  { name: "Silje", avatar: "/images/user/user-22.jpg", hasNew: true },
  { name: "Erik", avatar: "/images/user/user-01.jpg", hasNew: false },
  { name: "Ingrid", avatar: "/images/user/user-02.jpg", hasNew: true },
  { name: "Jonas", avatar: "/images/user/user-06.jpg", hasNew: false },
];

const feedPosts = [
  {
    author: "Erik Hansen",
    avatar: "/images/user/user-01.jpg",
    content: "New PR on deadlifts! 180kg",
    likes: 24,
    comments: 8,
    time: "2h",
  },
  {
    author: "Ingrid Larsen",
    avatar: "/images/user/user-02.jpg",
    content: "First muscle-up today. 6 months of work paid off.",
    likes: 45,
    comments: 15,
    time: "5h",
  },
  {
    author: "Kristine Moe",
    avatar: "/images/user/user-09.jpg",
    content: "Completed 30 Days Strong challenge. Showed up every single day.",
    likes: 52,
    comments: 20,
    time: "1d",
  },
];

export default function HomeScreen() {
  return (
    <div className="min-h-full" style={{ background: "#000", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}>
      {/* Header */}
      <div className="px-5 pt-2 pb-3 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <h1 className="text-[22px] font-bold tracking-tight" style={{ color: "#fff" }}>Feed</h1>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
      </div>

      {/* Stories */}
      <div className="flex gap-4 px-5 py-4 overflow-x-auto" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {stories.map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-1.5 shrink-0">
            <div
              className="w-[56px] h-[56px] rounded-full p-[2px]"
              style={{
                background: s.hasNew
                  ? "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.3) 100%)"
                  : "rgba(255,255,255,0.1)",
              }}
            >
              <div className="w-full h-full rounded-full p-[2px]" style={{ background: "#000" }}>
                <Image src={s.avatar} alt={s.name} width={52} height={52} className="w-full h-full rounded-full object-cover" />
              </div>
            </div>
            <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>{s.name}</span>
          </div>
        ))}
      </div>

      {/* Feed Posts */}
      <div>
        {feedPosts.map((post, i) => (
          <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {/* Post header */}
            <div className="flex items-center gap-3 px-5 py-3">
              <Image src={post.avatar} alt={post.author} width={36} height={36} className="w-9 h-9 rounded-full object-cover" />
              <div className="flex-1">
                <span className="text-[14px] font-semibold" style={{ color: "#fff" }}>{post.author}</span>
              </div>
              <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.3)" }}>{post.time}</span>
            </div>
            {/* Post image placeholder */}
            <div className="w-full h-[220px] flex items-center justify-center" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            {/* Post actions + caption */}
            <div className="px-5 py-3">
              <div className="flex items-center gap-5 mb-2">
                {/* Heart */}
                <div className="flex items-center gap-1.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                  <span className="text-[13px]" style={{ color: "rgba(255,255,255,0.5)" }}>{post.likes}</span>
                </div>
                {/* Comment */}
                <div className="flex items-center gap-1.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                  <span className="text-[13px]" style={{ color: "rgba(255,255,255,0.5)" }}>{post.comments}</span>
                </div>
                {/* Share */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
              </div>
              <p className="text-[14px] leading-[1.4]" style={{ color: "rgba(255,255,255,0.85)" }}>
                <span className="font-semibold" style={{ color: "#fff" }}>{post.author.split(" ")[0]}</span>{" "}
                {post.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
