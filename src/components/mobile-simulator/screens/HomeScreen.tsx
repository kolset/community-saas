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
    content: "New PR on deadlifts! 180kg \u{1F525}",
    likes: 24,
    time: "2h",
  },
  {
    author: "Ingrid Larsen",
    avatar: "/images/user/user-02.jpg",
    content: "First muscle-up today! 6 months of work paid off \u{1F4AA}",
    likes: 45,
    time: "5h",
  },
  {
    author: "Kristine Moe",
    avatar: "/images/user/user-09.jpg",
    content: "Completed 30 Days Strong challenge! Showed up every single day.",
    likes: 52,
    time: "1d",
  },
];

export default function HomeScreen() {
  return (
    <div className="bg-white min-h-full" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100">
        <h1 className="text-[20px] font-bold text-black">CrossFit Bjornsvik</h1>
      </div>

      {/* Stories */}
      <div className="flex gap-3 px-4 py-3 overflow-x-auto border-b border-gray-100">
        {stories.map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-1 shrink-0">
            <div className={`w-[60px] h-[60px] rounded-full p-[2px] ${s.hasNew ? "bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600" : "bg-gray-200"}`}>
              <div className="w-full h-full rounded-full bg-white p-[2px]">
                <Image src={s.avatar} alt={s.name} width={56} height={56} className="w-full h-full rounded-full object-cover" />
              </div>
            </div>
            <span className="text-[11px] text-gray-600">{s.name}</span>
          </div>
        ))}
      </div>

      {/* Feed Posts */}
      <div>
        {feedPosts.map((post, i) => (
          <div key={i} className="border-b border-gray-100">
            {/* Post header */}
            <div className="flex items-center gap-2.5 px-4 py-2.5">
              <Image src={post.avatar} alt={post.author} width={32} height={32} className="w-8 h-8 rounded-full object-cover" />
              <span className="text-[14px] font-semibold text-black">{post.author}</span>
              <span className="text-[12px] text-gray-400 ml-auto">{post.time}</span>
            </div>
            {/* Post content area - gradient placeholder */}
            <div className="w-full h-[200px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-[32px]">{"\u{1F3CB}\u{FE0F}"}</span>
            </div>
            {/* Post actions */}
            <div className="px-4 py-2">
              <div className="flex items-center gap-4 mb-1">
                <span className="text-[14px]">{"\u2764\uFE0F"} {post.likes}</span>
                <span className="text-[14px]">{"\u{1F4AC}"}</span>
                <span className="text-[14px]">{"\u{1F4E4}"}</span>
              </div>
              <p className="text-[14px] text-black">
                <span className="font-semibold">{post.author.split(" ")[0]}</span>{" "}
                {post.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
