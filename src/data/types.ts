export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  plan: string;
  status: "active" | "paused" | "expired";
  joinedDate: string;
  lastCheckIn: string;
  checkIns: number;
  badges: string[];
}

export interface FitnessClass {
  id: string;
  name: string;
  type: "CrossFit" | "Yoga" | "HIIT" | "Strength" | "Mobility";
  coach: string;
  day: number; // 0=Sunday, 1=Monday, etc.
  startTime: string; // "HH:MM"
  endTime: string;
  capacity: number;
  booked: number;
  color: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number; // NOK
  interval: "month" | "session";
  features: string[];
  memberCount: number;
  active: boolean;
}

export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  method: "Vipps" | "Card" | "AvtaleGiro";
  status: "paid" | "failed" | "pending";
  date: string;
  plan: string;
}

export interface WOD {
  id: string;
  date: string;
  name: string;
  type: "For Time" | "AMRAP" | "EMOM" | "Chipper" | "Strength";
  movements: string[];
  description: string;
  scaling: { rx: string; scaled: string };
  leaderboard: LeaderboardEntry[];
}

export interface LeaderboardEntry {
  memberId: string;
  memberName: string;
  avatar: string;
  score: string;
  rx: boolean;
}

export interface FeedPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  flagged: boolean;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  participants: number;
  type: "attendance" | "workout" | "nutrition";
  prize: string;
}

export interface Coach {
  id: string;
  name: string;
  avatar: string;
  specialties: string[];
  classesPerWeek: number;
  bio: string;
}

export interface GymSettings {
  name: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
  openingHours: { day: string; hours: string }[];
  paymentProvider: string;
  currency: string;
  notifications: {
    newMember: boolean;
    missedPayment: boolean;
    classReminder: boolean;
    weeklyReport: boolean;
  };
}
