import { members } from "./mock-members";

export type AvtaleGiroStatus = "active" | "pending" | "failed" | "not_enrolled";

export interface AvtaleGiroEntry {
  memberId: string;
  memberName: string;
  avatar: string;
  status: AvtaleGiroStatus;
  bankRef: string;
  amount: number;
  nextDebit: string;
  plan: string;
}

const statusCycle: AvtaleGiroStatus[] = [
  "active", "active", "active", "active", "active",
  "active", "active", "pending", "not_enrolled",
  "active", "active", "failed", "active", "not_enrolled",
  "active", "active", "not_enrolled", "pending",
];

export const avtaleGiroData: AvtaleGiroEntry[] = members.map((m, i) => {
  const status = statusCycle[i % statusCycle.length];
  return {
    memberId: m.id,
    memberName: m.name,
    avatar: m.avatar,
    status,
    bankRef: status !== "not_enrolled" ? `AG-${2400 + i}` : "",
    amount: status !== "not_enrolled" ? (
      m.plan === "Premium" ? 999 :
      m.plan === "Pluss" ? 799 :
      m.plan === "Familie" ? 1499 :
      m.plan === "Basis" ? 599 : 199
    ) : 0,
    nextDebit: status === "active" ? "2026-03-15" : status === "pending" ? "2026-03-20" : "",
    plan: m.plan,
  };
});

export const avtaleGiroStats = {
  enrolled: avtaleGiroData.filter((a) => a.status === "active").length,
  pending: avtaleGiroData.filter((a) => a.status === "pending").length,
  failed: avtaleGiroData.filter((a) => a.status === "failed").length,
  notEnrolled: avtaleGiroData.filter((a) => a.status === "not_enrolled").length,
  total: avtaleGiroData.length,
  enrollmentRate: Math.round(
    (avtaleGiroData.filter((a) => a.status === "active").length / avtaleGiroData.length) * 100
  ),
};

// Incentive Tiers
export interface IncentiveTier {
  id: string;
  name: string;
  level: 1 | 2 | 3;
  description: string;
  perks: string[];
  deadline: string;
  badgeColor: string;
  bgColor: string;
  textColor: string;
}

export const incentiveTiers: IncentiveTier[] = [
  {
    id: "tier-3",
    name: "Gold",
    level: 3,
    description: "Sign up within 7 days",
    perks: [
      "1 free PT session (worth 800 kr)",
      "Priority class booking for 3 months",
      "Exclusive AvtaleGiro member hoodie",
      "2 free guest passes",
    ],
    deadline: "7 days after invite",
    badgeColor: "bg-warning-100 text-warning-600 dark:bg-warning-500/20 dark:text-warning-400",
    bgColor: "border-warning-200 dark:border-warning-500/25",
    textColor: "text-warning-600 dark:text-warning-400",
  },
  {
    id: "tier-2",
    name: "Silver",
    level: 2,
    description: "Sign up within 14 days",
    perks: [
      "10% off merch store",
      "1 free guest pass",
      "Priority class booking for 1 month",
    ],
    deadline: "14 days after invite",
    badgeColor: "bg-gray-200 text-gray-600 dark:bg-white/10 dark:text-gray-300",
    bgColor: "border-gray-300 dark:border-gray-600",
    textColor: "text-gray-600 dark:text-gray-300",
  },
  {
    id: "tier-1",
    name: "Bronze",
    level: 1,
    description: "Sign up within 30 days",
    perks: [
      "Free gym towel",
      "1 free smoothie per week for 1 month",
    ],
    deadline: "30 days after invite",
    badgeColor: "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400",
    bgColor: "border-orange-200 dark:border-orange-500/25",
    textColor: "text-orange-600 dark:text-orange-400",
  },
];

// Conversion Funnel
export interface FunnelStep {
  label: string;
  count: number;
  percentage: number;
}

const notEnrolledCount = avtaleGiroStats.notEnrolled;
export const avtaleGiroFunnel: FunnelStep[] = [
  { label: "Not Enrolled", count: notEnrolledCount, percentage: 100 },
  { label: "Invite Sent", count: Math.ceil(notEnrolledCount * 0.85), percentage: 85 },
  { label: "Invite Opened", count: Math.ceil(notEnrolledCount * 0.65), percentage: 65 },
  { label: "Started Signup", count: Math.ceil(notEnrolledCount * 0.4), percentage: 40 },
  { label: "Completed", count: Math.ceil(notEnrolledCount * 0.25), percentage: 25 },
];

// In-App Messages
export interface InAppMessage {
  id: string;
  name: string;
  subject: string;
  body: string;
  tierRef: string;
  sentCount: number;
  openRate: number;
  conversionRate: number;
  status: "active" | "draft" | "paused";
  lastSent?: string;
}

export const avtaleGiroMessages: InAppMessage[] = [
  {
    id: "msg-1",
    name: "Initial Invite",
    subject: "Switch to AvtaleGiro and unlock perks",
    body: "Hey {name}! Set up AvtaleGiro for hassle-free payments and unlock exclusive member perks. Sign up in the next 7 days to claim Gold tier rewards, including a free PT session!",
    tierRef: "all",
    sentCount: 142,
    openRate: 72,
    conversionRate: 18,
    status: "active",
    lastSent: "2026-03-04",
  },
  {
    id: "msg-2",
    name: "7-day Reminder",
    subject: "Gold perks expire soon!",
    body: "Hi {name}, your Gold perk window closes in 3 days. Don't miss your free PT session and exclusive hoodie. Switch to AvtaleGiro now.",
    tierRef: "Gold",
    sentCount: 98,
    openRate: 68,
    conversionRate: 24,
    status: "active",
    lastSent: "2026-03-02",
  },
  {
    id: "msg-3",
    name: "Silver Nudge",
    subject: "You still qualify for Silver perks",
    body: "Hey {name}, the Gold window has passed but you can still grab Silver perks: 10% off merch, a free guest pass, and priority booking. Set up AvtaleGiro within 14 days.",
    tierRef: "Silver",
    sentCount: 64,
    openRate: 61,
    conversionRate: 15,
    status: "active",
    lastSent: "2026-02-28",
  },
  {
    id: "msg-4",
    name: "Last Chance Bronze",
    subject: "Last chance: free towel + smoothies",
    body: "Hi {name}, this is your last chance to earn a reward for switching to AvtaleGiro. Sign up by the end of the month for a free gym towel and weekly smoothies.",
    tierRef: "Bronze",
    sentCount: 45,
    openRate: 55,
    conversionRate: 12,
    status: "active",
    lastSent: "2026-02-25",
  },
  {
    id: "msg-5",
    name: "Social Proof",
    subject: "85% of members use AvtaleGiro",
    body: "Hey {name}, did you know 85% of CF Bjornsvik members already use AvtaleGiro? It's the easiest way to pay and you'll never miss a payment. Plus, you still qualify for perks!",
    tierRef: "all",
    sentCount: 120,
    openRate: 65,
    conversionRate: 20,
    status: "draft",
  },
];
