import type { GymSettings } from "./types";

export const gymSettings: GymSettings = {
  name: "CrossFit Bjornsvik",
  address: "Damsgardveien 82, 5058 Bergen, Norway",
  phone: "+47 55 12 34 56",
  email: "post@crossfitbjornsvik.no",
  logo: "/images/logo/gym-logo.svg",
  openingHours: [
    { day: "Mandag", hours: "06:00 - 21:00" },
    { day: "Tirsdag", hours: "06:00 - 21:00" },
    { day: "Onsdag", hours: "06:00 - 21:00" },
    { day: "Torsdag", hours: "06:00 - 21:00" },
    { day: "Fredag", hours: "06:00 - 20:00" },
    { day: "Lordag", hours: "08:00 - 14:00" },
    { day: "Sondag", hours: "Stengt" },
  ],
  paymentProvider: "Vipps",
  currency: "NOK",
  notifications: {
    newMember: true,
    missedPayment: true,
    classReminder: true,
    weeklyReport: true,
  },
};
