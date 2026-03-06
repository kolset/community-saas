export const dashboardStats = {
  totalMembers: 247,
  activeMembers: 218,
  monthlyRevenue: 186450,
  averageAttendance: 82,
  memberGrowth: 12.5,
  revenueGrowth: 8.3,
  attendanceChange: -2.1,
  churnRate: 3.2,
};

// Monthly revenue data (NOK) for chart
export const monthlyRevenue = [
  148000, 152000, 161000, 158000, 165000, 172000,
  169000, 175000, 178000, 182000, 180000, 186450,
];

// Monthly attendance percentages for chart
export const monthlyAttendance = [
  78, 80, 76, 82, 85, 83, 79, 84, 86, 82, 80, 82,
];

// Class type distribution
export const classDistribution = [
  { type: "CrossFit", percentage: 45 },
  { type: "HIIT", percentage: 20 },
  { type: "Yoga", percentage: 15 },
  { type: "Strength", percentage: 12 },
  { type: "Mobility", percentage: 8 },
];

// Recent activity entries for dashboard
export const recentActivity = [
  {
    type: "check-in" as const,
    memberName: "Silje Kristiansen",
    detail: "Sjekket inn til CrossFit WOD",
    time: "2 min siden",
  },
  {
    type: "payment" as const,
    memberName: "Kristoffer Nilsen",
    detail: "Betalt Familie-abonnement - 1 499 kr",
    time: "15 min siden",
  },
  {
    type: "signup" as const,
    memberName: "Ny medlem: Astrid Hauge",
    detail: "Registrert pa Pluss-abonnement",
    time: "1 time siden",
  },
  {
    type: "class-booking" as const,
    memberName: "Camilla Vik",
    detail: "Booket HIIT Express tirsdag 06:30",
    time: "1 time siden",
  },
  {
    type: "check-in" as const,
    memberName: "Erik Haugen",
    detail: "Sjekket inn til CrossFit Morgen",
    time: "2 timer siden",
  },
  {
    type: "payment" as const,
    memberName: "Thomas Berg",
    detail: "Betaling feilet - Pluss-abonnement",
    time: "3 timer siden",
  },
  {
    type: "class-booking" as const,
    memberName: "Nora Henriksen",
    detail: "Booket Yoga Flow mandag 18:15",
    time: "4 timer siden",
  },
  {
    type: "signup" as const,
    memberName: "Ny medlem: Vegard Lien",
    detail: "Registrert pa Basis-abonnement",
    time: "5 timer siden",
  },
  {
    type: "check-in" as const,
    memberName: "Sara Lund",
    detail: "Sjekket inn til Styrke & Teknikk",
    time: "6 timer siden",
  },
  {
    type: "payment" as const,
    memberName: "Ingrid Solberg",
    detail: "Betalt Pluss-abonnement via Vipps - 799 kr",
    time: "8 timer siden",
  },
];
