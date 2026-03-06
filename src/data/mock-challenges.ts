import type { Challenge } from "./types";

export const challenges: Challenge[] = [
  {
    id: "ch-001",
    name: "30 Dager Sterk",
    description: "Tren minst 20 av 30 dager for a bevise at du har det som trengs. Logg hver oekt i appen og hold streaken i live. De som fullforer far eksklusiv t-skjorte og 1 maned gratis medlemskap.",
    startDate: "2026-02-15",
    endDate: "2026-03-17",
    participants: 67,
    type: "attendance",
    prize: "Eksklusiv CrossFit Bjornsvik t-skjorte + 1 maned gratis",
  },
  {
    id: "ch-002",
    name: "Murph Prep",
    description: "6 ukers forberedelse til Murph. Ukentlige benchmarks med oekende volum. Uke 1: Half Murph, Uke 6: Full Murph Rx med vest. Perfekt for alle nivaer - skalering tilgjengelig.",
    startDate: "2026-03-01",
    endDate: "2026-04-12",
    participants: 34,
    type: "workout",
    prize: "Murph Finisher-badge + bilde pa Wall of Fame",
  },
  {
    id: "ch-003",
    name: "Clean Eating Challenge",
    description: "4 uker med fokus pa naering. Folg mal-planen, logg maten din daglig, og del oppskrifter med teamet. Ukentlige ernaeringstips fra var samarbeidspartner. Ingen streng diett - bare bedre valg.",
    startDate: "2026-02-10",
    endDate: "2026-03-10",
    participants: 45,
    type: "nutrition",
    prize: "Meal prep-sett + 500 kr gavekort til helsekost",
  },
];
