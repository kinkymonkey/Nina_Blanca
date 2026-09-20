export type Oration = {
  slug: string;
  title: string;
  summary: string;
  when: string;
  category: "daily" | "rosary" | "healing" | "protection" | "gratitude";
  minutes: string;
  kicker: string;
  tag: string;
  cta: string;
  bilingual?: boolean;
  lines: string[];
  spanish?: string[];
};

export const ORATION_FILTERS = [
  { id: "all", label: "All Prayers" },
  { id: "daily", label: "Daily Invocations" },
  { id: "rosary", label: "The Rosary" },
  { id: "healing", label: "Healing & Cleansing" },
  { id: "protection", label: "Protection" },
  { id: "gratitude", label: "Ex-Voto & Gratitude" },
  { id: "bilingual", label: "Bilingual (ES/EN)" },
] as const;

export const ORATIONS: Oration[] = [
  {
    slug: "morning-offering",
    title: "The Traditional Morning Offering to Niña Blanca",
    summary: "The first pulse of breath, given before the feet touch the earthly path.",
    when: "Recitation Hour · Dawn / 06:00 AM",
    category: "daily",
    minutes: "6 min",
    kicker: "Solemn Daily Rite",
    tag: "White Robe Aspect",
    cta: "Read Oration",
    bilingual: true,
    lines: [
      "O Sovereign Lady of the White Veil, Holy Mother and Guardian of the Transition, I awaken into this daylight under the shelter of your immaculate shroud. Before my feet touch the earthly path, I offer the first pulse of my breath to your holy presence.",
      "Cleanse what is darkened in my mind; soften what has grown cruel in my speech; defend my threshold from deceit, envy, and untimely shadows.",
      "Take into your hands my labors of this day. Grant that I may carry the scales of justice in my heart and the gentle scythe that cuts through vanity and false illusion. With this offering of clean, clear water and fragrant light, I place myself, my loved ones, and the breath of our home in your sacred trust.",
    ],
    spanish: [
      "O Soberana Señora del Manto Blanco, Santa Niña y Guardiana del Albor, despierto ante la luz de este día bajo el cobijo de tu sagrada presencia. Antes de que mis pies pisen la tierra, entrego el primer aliento de mi pecho a tu dulce protección.",
      "Limpia lo entenebrecido en mi pensamiento; serena lo áspero de mis palabras; y resguarda las puertas de mi hogar contra toda envidia, discordia y sombra desdichada.",
      "Toma en tus manos bienhechoras mis obras de hoy. Hazme portador de tu balanza de justicia y de tu sagrada guadaña que corta toda mentira y vanidad mundana. Ante este vaso de agua fresca y esta llama que te honra, deposito mi destino en tu perpetuo amparo.",
    ],
  },
  {
    slug: "holy-rosary-white-mystery",
    title: "The Holy Rosary of Santa Muerte (White Mystery of Peace)",
    summary:
      "Complete liturgical cycle comprising five peaceful mysteries, opening devotional Creed, the Litany of the Holy Shroud, and the closing Salve Niña Blanca.",
    when: "Communal or solitary · White beads if you have them",
    category: "rosary",
    minutes: "25 min",
    kicker: "The Holy Rosary",
    tag: "5 Mysteries",
    cta: "Open Rosary",
    lines: [
      "If you know the Catholic rosary, keep the shape: Creed, mysteries, closing. If you do not, say five times, slowly, what you actually need under the white veil: peace in this house, a clean mouth, a death that is not abandoned.",
      "Opening: I believe in one death that is not mocked, and in the White Mother who sits with the living and the dying.",
      "Mysteries of peace: the still room; the washed threshold; the sickbed; the ordinary road home; the thanks when something already moved.",
      "Closing: Salve Niña Blanca, keep this table. Keep us decent. Keep us under your mantle until we need to begin again.",
    ],
  },
  {
    slug: "peace-in-troubled-times",
    title: "Prayer for Peace in Troubled Times & Calming Anger",
    summary:
      "An ancient supplication addressed to the serene gaze of the Holy White Lady to disperse rancor, soften hardened adversaries, and still turmoil in the home.",
    when: "When the rooms will not settle",
    category: "protection",
    minutes: "5 min",
    kicker: "Protection & Calm",
    tag: "Household peace",
    cta: "Read Oration",
    lines: [
      "White Lady of the serene gaze, look on this house. What is sharp in our mouths, blunt it. What is circling for a fight, let it sit down.",
      "Disperse rancor. Soften the adversary who lives under this roof, including myself. I do not ask you to humiliate anyone. I ask for a night that is only a night.",
      "Niña Blanca, if we must speak hard things, let us speak them without breaking the plates. Guard the children first.",
    ],
  },
  {
    slug: "altar-and-water",
    title: "Consecration of the Altar and Water Offering",
    summary:
      "Recited weekly when replenishing the consecrated water vessel and rededicating the threshold, candles, and offerings placed upon the domestic shrine.",
    when: "Weekly, or whenever the water has gone stale",
    category: "daily",
    minutes: "7 min",
    kicker: "Altar Blessing",
    tag: "Traditional Rite",
    cta: "Read Oration",
    lines: [
      "I change this water because stale water is neglect. Receive a clean glass. Receive a table that has been dusted.",
      "Bless this threshold, these tapers, these flowers that have not yet wilted. What does not belong here can leave without a fight.",
      "I rededicate this shrine to peace, cleansing, and the people who sleep in this house. No harm is asked in another person’s name.",
    ],
  },
  {
    slug: "evening-orison",
    title: "Evening Orison for Peaceful Rest & Solace",
    summary:
      "A serene prayer whispered before extinguishing candles, asking the White Angel of Rest to guard sleep against terrors, restless shadows, and anxieties.",
    when: "Night · after the work is done",
    category: "daily",
    minutes: "4 min",
    kicker: "Evening Compline",
    tag: "Night Rite",
    cta: "Read Oration",
    lines: [
      "White Angel of Rest, the day is finished whether I finished it or not. Guard sleep against terrors, restless shadows, and the old argument that wants to replay.",
      "Sit with the ones who cannot sleep. Cool what burns. Let the night be only night.",
      "I put this flame out without slamming the door. Keep a white thought in this house until morning.",
    ],
  },
  {
    slug: "litany-of-virtues",
    title: "Litany of the Virtues of the White Aspect",
    summary:
      "Forty-two responsive invocations hailing the purity, unbending fairness, and silent compassion of the White Robed Mother. Suitable for communal prayer.",
    when: "Communal prayer, or read slowly alone",
    category: "daily",
    minutes: "12 min",
    kicker: "Sacred Litany",
    tag: "Chanted Form",
    cta: "Read Oration",
    lines: [
      "Niña Blanca, robe of peace — sit with us.",
      "Niña Blanca, cleaner of the threshold — sit with us.",
      "Niña Blanca, companion of the sickbed — sit with us.",
      "Niña Blanca, just judge who keeps no guest list — sit with us.",
      "Niña Blanca, mother who does not mock the dying — sit with us.",
      "We will not ask you to wound. We will not sell your name. Keep us decent.",
    ],
  },
  {
    slug: "before-surgery",
    title: "Prayer Before Undergoing Surgery or Illness",
    summary:
      "Pleading for steady hands upon physicians, quiet nerves in the infirm, and the protective shroud over the operating room and hospital bed.",
    when: "Before a procedure, or in a ward that forbids flame",
    category: "healing",
    minutes: "6 min",
    kicker: "Healing Supplication",
    tag: "Critical Need",
    cta: "Read Oration",
    lines: [
      "White Mother, you know beds. Sit with this body. Steady the hands that cut and sew. Quiet the nerves of the one who waits.",
      "If healing comes, let it come without humiliation. If death comes, let it come with company. I do not film this hour.",
      "Lay your shroud over the operating room. Let the machines be only machines. Let the people doing the work be kept.",
    ],
  },
  {
    slug: "copal-and-petals",
    title: "Cleansing with White Copal and Fresh Petals",
    summary:
      "The spoken incantation that accompanies the sweeping of white rose petals, rue, and the smoke of copal blanco over an individual or devotional chamber.",
    when: "When a room or a person needs washing, with a window open",
    category: "healing",
    minutes: "15 min",
    kicker: "Limpia Rite",
    tag: "Purification",
    cta: "Read Oration",
    lines: [
      "With this smoke and these petals I do not perform. I wash. What is heavy can leave. What is mine can stay.",
      "Copal blanco, be only smoke. Petals, be only flowers. I will not steal from a grave to look hard.",
      "Niña Blanca, take the residue of fear from this threshold. Leave the house ordinary.",
    ],
  },
  {
    slug: "mother-for-distant-children",
    title: "A Mother’s Prayer for Her Children in Distant Lands",
    summary:
      "A deep, maternal supplication invoking the universal Mother of all mortals to guard sons and daughters crossing frontiers, oceans, and unfamiliar cities.",
    when: "When they are on the road and you cannot follow",
    category: "protection",
    minutes: "8 min",
    kicker: "Family Mantle",
    tag: "Pilgrim Shield",
    cta: "Read Oration",
    lines: [
      "Universal Mother of all mortals, they are not in this room. Walk the same streets they walk.",
      "Let the crossing be ordinary. Let the arrival be ordinary. If someone is waiting, let them still be waiting.",
      "I cannot buy their safety. I can name them under your robe. Keep them. Keep me from becoming cruel in the wait.",
    ],
  },
  {
    slug: "ex-voto-gratitude",
    title: "Solemn Ex-Voto of Gratitude & Faithful Honor",
    summary:
      "The prayer of fulfillment spoken when a petition has been answered, presenting flowers, sweets, fresh tapers, and public witness to her benevolence.",
    when: "After the fever broke, the ride arrived, the night stayed quiet",
    category: "gratitude",
    minutes: "5 min",
    kicker: "Vow Fulfilled",
    tag: "Thanksgiving",
    cta: "Read Oration",
    lines: [
      "I do not only knock. I name what you already did.",
      "Here are flowers, sweets, a taper, and a mouth that will say thank you in public if the house allows it.",
      "I will not spend the gift as if it were nothing. Niña Blanca, receive this honor without theater.",
    ],
  },
];

export function getOration(slug: string): Oration | undefined {
  return ORATIONS.find((item) => item.slug === slug);
}
