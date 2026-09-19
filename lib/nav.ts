export const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/petitions", label: "Petitions" },
  { href: "/novenas", label: "Novenas" },
  { href: "/prayers", label: "Prayers" },
  { href: "/learn", label: "Learn" },
  { href: "/support", label: "Support" },
] as const;

export const learnLinks = [
  { href: "/who-is-santa-muerte", label: "Who is Santa Muerte" },
  { href: "/colors-and-aspects", label: "Colors & Aspects" },
  { href: "/traditional-offerings", label: "Traditional Offerings" },
  { href: "/altar-care", label: "Altar Care" },
  { href: "/history-and-faq", label: "History & FAQ" },
] as const;

export const devotionLinks = [
  { href: "/petitions", label: "Petitions Wall" },
  { href: "/novenas", label: "Community Novenas" },
  { href: "/vigil-candles", label: "Vigil Candles" },
  { href: "/prayers", label: "Prayer Library" },
] as const;

export const trustLinks = [
  { href: "/community-guidelines", label: "Community Guidelines" },
  { href: "/privacy-and-anonymity", label: "Privacy & Anonymity" },
  { href: "/ethics-and-safety", label: "Ethics & Devotional Safety" },
  { href: "/transparent-stewardship", label: "Transparent Stewardship" },
] as const;

export const petitionCategories = [
  { id: "healing", label: "Health, Healing & Body Restoration" },
  { id: "home", label: "Hearth, Home & Household Cleansing" },
  { id: "peace", label: "Inner Peace, Clarity & Purification" },
  { id: "reconciliation", label: "Reconciliation & Softened Hearts" },
  { id: "passage", label: "Safe Passage, Travel & Guidance" },
  { id: "gratitude", label: "Whispers of Gratitude & Answered Prayer" },
] as const;

export type PetitionCategoryId = (typeof petitionCategories)[number]["id"];
