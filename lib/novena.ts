const START = new Date("2026-09-16T00:00:00-05:00");
const TOTAL_DAYS = 9;

const DAYS = [
  {
    title: "Opening the white mantle",
    focus: "Invitation and quieting the room",
    prayer:
      "Holy Death in white, we begin this novena with a clean table and a still mouth. Sit with us. Let nothing hurried enter this house.",
  },
  {
    title: "Cleansing of the threshold",
    focus: "Doors, windows, and the first step inside",
    prayer:
      "Niña Blanca, wash the lintel. What does not belong here can leave without a fight. Keep the people who live here inside the circle of your robe.",
  },
  {
    title: "The body and the bed",
    focus: "Rest, fever, and the hours before dawn",
    prayer:
      "White Mother, lay your hand on the ones who cannot sleep. Cool what burns. Steady the breath. Let the night be only night.",
  },
  {
    title: "Protection and cleansing of the home",
    focus: "Discord, envy, and the rooms we share",
    prayer:
      "Today we kindle the white flame for inner peace, warding off discord and wrapping our loved ones in her protective mantle.",
  },
  {
    title: "Work and the street",
    focus: "Labor, money worries, and the walk home",
    prayer:
      "Santa Muerte Blanca, walk the same streets we walk. Keep the paycheck honest, the crossing safe, and the return to the door unmarked by harm.",
  },
  {
    title: "Kin and the hard word",
    focus: "Family, silence, and the apology that will not come yet",
    prayer:
      "Softener of hard speech, hold the names we cannot say out loud. If a heart can turn, turn it. If it cannot, keep us from becoming cruel.",
  },
  {
    title: "The sick and the dying",
    focus: "Hospitals, vigils, and company at the end",
    prayer:
      "Lady of the Good Death, you do not abandon a bedside. Stay with the ones in pain and with the ones who wait. Let no one finish this life without a witness.",
  },
  {
    title: "Gratitude for what already arrived",
    focus: "Answered petitions and the ordinary day",
    prayer:
      "We do not only ask. We name what you already gave: a scan that cleared, a ride that made it, a night without the old fight. Thank you.",
  },
  {
    title: "Closing and keeping the light",
    focus: "Nine days become a habit of care",
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
    title: "Novena of White Light & Protection",
    day: cycleDay,
    total: TOTAL_DAYS,
    percent: Math.round((cycleDay / TOTAL_DAYS) * 1000) / 10,
    today,
  };
}
