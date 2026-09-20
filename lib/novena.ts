const START = new Date("2026-09-16T00:00:00-05:00");
const TOTAL_DAYS = 9;

const DAYS = [
  {
    title: "Consecration of Intent",
    meditation: "Day 1 Meditation: Consecration of Intent",
    stage: "Stage I: Consecration of Intent",
    focus: "Invitation and quieting the room",
    offering: "Cold water. One white candle if fire is safe. Sit.",
    prayer:
      "Holy Death in white, we begin this novena with a clean table and a still mouth. Sit with us. Let nothing hurried enter this house.",
  },
  {
    title: "Calling the White Veil",
    meditation: "Day 2 Meditation: Calling the White Veil",
    stage: "Stage II: Calling the White Veil",
    focus: "Doors, windows, and the first step inside",
    offering: "Change the water. Name the people who sleep in this house.",
    prayer:
      "Niña Blanca, wash the lintel. What does not belong here can leave without a fight. Keep the people who live here inside the circle of your robe.",
  },
  {
    title: "Water of Purity",
    meditation: "Day 3 Meditation: Water of Purity",
    stage: "Stage III: Water of Purity",
    focus: "Rest, fever, and the hours before dawn",
    offering: "A clean glass. No stale offering left overnight.",
    prayer:
      "White Mother, lay your hand on the ones who cannot sleep. Cool what burns. Steady the breath. Let the night be only night.",
  },
  {
    title: "Cleansing the Home of Discord",
    meditation: "Day 4 Meditation: Cleansing the Home of Discord",
    stage: "Stage IV: Threshold Cleansing",
    focus:
      "Purification of the dwelling, shedding malicious gaze, and invoking the radiant mantle over household members.",
    offering:
      "Place a glass of spring water and three white carnations or jasmine incense upon your northern threshold before sunset.",
    prayer:
      "Beloved Niña Blanca, radiant protector who rests in quiet majesty: cast down Thy immaculate pallium over this dwelling. Dispel the unseen arrows of jealousy, sweep clean our doorway of heavy silence, and let no darkness abide where Thy pale radiance is welcomed. Stand sentinel between my kindred and the tumult of the world.",
  },
  {
    title: "Labor and the Street",
    meditation: "Day 5 Meditation: Labor and the Street",
    stage: "Stage V: Labor and the Street",
    focus: "Work, money worries, and the walk home",
    offering: "Bread if you have it. A coin given without a caption.",
    prayer:
      "Santa Muerte Blanca, walk the same streets we walk. Keep the paycheck honest, the crossing safe, and the return to the door unmarked by harm.",
  },
  {
    title: "Kin and the Hard Word",
    meditation: "Day 6 Meditation: Kin and the Hard Word",
    stage: "Stage VI: Kin and the Hard Word",
    focus: "Family, silence, and the apology that will not come yet",
    offering: "The family name written in pencil. Honey if the house allows it.",
    prayer:
      "Softener of hard speech, hold the names we cannot say out loud. If a heart can turn, turn it. If it cannot, keep us from becoming cruel.",
  },
  {
    title: "The Sick and the Dying",
    meditation: "Day 7 Meditation: The Sick and the Dying",
    stage: "Stage VII: The Sick and the Dying",
    focus: "Hospitals, vigils, and company at the end",
    offering: "A glass of water at the bedside. No filming.",
    prayer:
      "Lady of the Good Death, you do not abandon a bedside. Stay with the ones in pain and with the ones who wait. Let no one finish this life without a witness.",
  },
  {
    title: "Thanksgiving for What Already Arrived",
    meditation: "Day 8 Meditation: Thanksgiving",
    stage: "Stage VIII: Thanksgiving",
    focus: "Answered petitions and the ordinary day",
    offering: "Flowers, sweets, or public thanks if the house allows it.",
    prayer:
      "We do not only ask. We name what you already gave: a scan that cleared, a ride that made it, a night without the old fight. Thank you.",
  },
  {
    title: "Closing and Keeping the Light",
    meditation: "Day 9 Meditation: Closing the Cycle",
    stage: "Stage IX: Closing the Cycle",
    focus: "Nine days become a habit of care",
    offering: "Fulfill the concluding offering of thanksgiving.",
    prayer:
      "We close this novena without slamming the door. Keep a white candle in this house. Keep us decent. Keep us under your mantle until we need to begin again.",
  },
];

export type NovenaState = {
  title: string;
  day: number;
  total: number;
  percent: number;
  today: (typeof DAYS)[number];
};

export function getNovena(): NovenaState {
  const now = new Date();
  const elapsed = Math.floor((now.getTime() - START.getTime()) / 86400000) + 1;
  const cycleDay = ((elapsed - 1) % TOTAL_DAYS) + 1;
  const today = DAYS[cycleDay - 1];
  return {
    title: "Novena of White Light & Sacred Protection",
    day: cycleDay,
    total: TOTAL_DAYS,
    percent: Math.round((cycleDay / TOTAL_DAYS) * 1000) / 10,
    today,
  };
}
