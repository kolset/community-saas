"use client";

import React, { useState } from "react";
import Image from "next/image";
import Badge from "@/components/ui/badge/Badge";
import { Modal } from "@/components/ui/modal";
import {
  GroupIcon,
  ChatIcon,
  CalenderIcon,
  ArrowUpIcon,
  AlertIcon,
  BoltIcon,
} from "@/icons";

type Tab = "feed" | "challenges" | "stats";

interface Post {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
  flagged: boolean;
}

interface Challenge {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  participants: number;
  type: "attendance" | "workout" | "nutrition";
  prize: string;
}

const posts: Post[] = [
  { id: "f1", authorName: "Erik Hansen", authorAvatar: "/images/user/user-01.jpg", content: "New PR on deadlifts today! 180kg! \u{1F4AA} Couldn't have done it without the amazing coaching.", likes: 24, comments: 8, timestamp: "2 hours ago", flagged: false },
  { id: "f2", authorName: "Ingrid Larsen", authorAvatar: "/images/user/user-02.jpg", content: "First muscle-up! Been working on this for 6 months. The strength program really works.", likes: 45, comments: 15, timestamp: "5 hours ago", flagged: false },
  { id: "f3", authorName: "Jonas Berg", authorAvatar: "/images/user/user-06.jpg", content: "Great Murph workout yesterday. Sore but worth it. Who's joining the challenge this week?", likes: 18, comments: 6, timestamp: "8 hours ago", flagged: false },
  { id: "f4", authorName: "Sofie Andersen", authorAvatar: "/images/user/user-07.jpg", content: "Love the new yoga classes on Tuesdays! Perfect for recovery after heavy lifting days.", likes: 31, comments: 4, timestamp: "1 day ago", flagged: false },
  { id: "f5", authorName: "Lars Haugen", authorAvatar: "/images/user/user-08.jpg", content: "This gym is a total scam, equipment is broken and coaches don't care. Going to report this place.", likes: 2, comments: 12, timestamp: "1 day ago", flagged: true },
  { id: "f6", authorName: "Kristine Moe", authorAvatar: "/images/user/user-09.jpg", content: "Completed the 30 Days Strong challenge! Showed up every single day. Feeling amazing.", likes: 52, comments: 20, timestamp: "2 days ago", flagged: false },
  { id: "f7", authorName: "Anders Dahl", authorAvatar: "/images/user/user-10.jpg", content: "Anyone want to join a running group on Saturday mornings? Thinking 5K to start.", likes: 15, comments: 9, timestamp: "2 days ago", flagged: false },
  { id: "f8", authorName: "Unknown User", authorAvatar: "/images/user/user-14.jpg", content: "Buy cheap supplements at totallylegit.com!! Best prices guaranteed!!!", likes: 0, comments: 1, timestamp: "3 days ago", flagged: true },
  { id: "f9", authorName: "Hanna Solberg", authorAvatar: "/images/user/user-11.jpg", content: "Brought my mom to the intro class today and she loved it! Signing up for Familie plan.", likes: 38, comments: 7, timestamp: "3 days ago", flagged: false },
  { id: "f10", authorName: "Thomas Bakke", authorAvatar: "/images/user/user-04.jpg", content: "Hit 100 WODs milestone today! What a journey. Here's to the next 100.", likes: 67, comments: 23, timestamp: "4 days ago", flagged: false },
];

const challenges: Challenge[] = [
  { id: "ch1", name: "30 Dager Sterk", description: "Show up to the gym every day for 30 days. Rest days count if you do mobility work!", startDate: "2026-03-01", endDate: "2026-03-31", participants: 42, type: "attendance", prize: "Free month membership" },
  { id: "ch2", name: "Murph Prep", description: "Complete 3 Murph workouts this month. Scale as needed but finish strong.", startDate: "2026-03-01", endDate: "2026-03-31", participants: 28, type: "workout", prize: "Murph T-shirt" },
  { id: "ch3", name: "Clean Eating Challenge", description: "Follow the nutrition plan for 21 days. Log your meals in the app daily.", startDate: "2026-03-10", endDate: "2026-03-31", participants: 35, type: "nutrition", prize: "Meal prep containers + cookbook" },
];

const challengeTypeColor: Record<Challenge["type"], "success" | "primary" | "warning"> = {
  attendance: "success",
  workout: "primary",
  nutrition: "warning",
};

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<Tab>("feed");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [postList, setPostList] = useState(posts);

  const handleApprove = (id: string) => {
    setPostList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, flagged: false } : p))
    );
  };

  const handleRemove = (id: string) => {
    setPostList((prev) => prev.filter((p) => p.id !== id));
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "feed", label: "Feed" },
    { key: "challenges", label: "Challenges" },
    { key: "stats", label: "Stats" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Community
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage member posts, challenges, and engagement
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-brand-500 text-white"
                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Feed Tab */}
      {activeTab === "feed" && (
        <div className="space-y-4">
          {postList.map((post) => (
            <div
              key={post.id}
              className={`rounded-2xl border p-5 ${
                post.flagged
                  ? "border-error-200 dark:border-error-500/30"
                  : "border-gray-200 dark:border-gray-800"
              } bg-white dark:bg-white/[0.03]`}
            >
              {/* Author Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={post.authorAvatar}
                      alt={post.authorName}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {post.authorName}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {post.timestamp}
                    </p>
                  </div>
                </div>
                {post.flagged && (
                  <Badge color="error" size="sm">
                    Flagged
                  </Badge>
                )}
              </div>

              {/* Content */}
              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                {post.content}
              </p>

              {/* Bottom Row */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <svg
                      className="size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3.25a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.228.22.442.384.636l.018.02a.75.75 0 01-.384-.656v0zM3 15.75h2.25"
                      />
                    </svg>
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <svg
                      className="size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                      />
                    </svg>
                    {post.comments}
                  </span>
                </div>
                {post.flagged && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(post.id)}
                      className="rounded-lg bg-success-50 px-3 py-1.5 text-xs font-medium text-success-600 hover:bg-success-100 dark:bg-success-500/15 dark:text-success-500 dark:hover:bg-success-500/25"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRemove(post.id)}
                      className="rounded-lg bg-error-50 px-3 py-1.5 text-xs font-medium text-error-600 hover:bg-error-100 dark:bg-error-500/15 dark:text-error-500 dark:hover:bg-error-500/25"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Challenges Tab */}
      {activeTab === "challenges" && (
        <div>
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
            >
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Create Challenge
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    {challenge.name}
                  </h3>
                  <Badge size="sm" color={challengeTypeColor[challenge.type]}>
                    {challenge.type.charAt(0).toUpperCase() +
                      challenge.type.slice(1)}
                  </Badge>
                </div>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {challenge.description}
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <CalenderIcon className="size-4" />
                    <span>
                      {challenge.startDate} &mdash; {challenge.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <GroupIcon className="size-4" />
                    <span>{challenge.participants} participants</span>
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-gray-50 p-3 dark:bg-white/[0.04]">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Prize
                  </span>
                  <p className="mt-0.5 text-sm font-medium text-gray-800 dark:text-white/90">
                    {challenge.prize}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Create Challenge Modal */}
          <Modal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            className="max-w-lg p-6 lg:p-8"
          >
            <h3 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
              Create Challenge
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowCreateModal(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Challenge name"
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the challenge..."
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Type
                </label>
                <select className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90">
                  <option value="attendance">Attendance</option>
                  <option value="workout">Workout</option>
                  <option value="nutrition">Nutrition</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Prize
                </label>
                <input
                  type="text"
                  placeholder="What does the winner get?"
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
                >
                  Create
                </button>
              </div>
            </form>
          </Modal>
        </div>
      )}

      {/* Stats Tab */}
      {activeTab === "stats" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          {/* Total Posts This Month */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <ChatIcon className="text-gray-800 size-6 dark:text-white/90" />
            </div>
            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Total Posts This Month
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  156
                </h4>
              </div>
              <Badge color="success">
                <ArrowUpIcon />
                18%
              </Badge>
            </div>
          </div>

          {/* Active Commenters */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
            </div>
            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Active Commenters
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  89
                </h4>
              </div>
              <Badge color="success">
                <ArrowUpIcon />
                5.2%
              </Badge>
            </div>
          </div>

          {/* Flagged Posts */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <AlertIcon className="text-gray-800 size-6 dark:text-white/90" />
            </div>
            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Flagged Posts
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  3
                </h4>
              </div>
              <Badge color="error">Needs review</Badge>
            </div>
          </div>

          {/* Engagement Rate */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <BoltIcon className="text-gray-800 size-6 dark:text-white/90" />
            </div>
            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Engagement Rate
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  72%
                </h4>
              </div>
              <Badge color="success">
                <ArrowUpIcon />
                3.1%
              </Badge>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
