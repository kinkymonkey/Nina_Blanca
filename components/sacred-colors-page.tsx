import Link from "next/link";
import { BlackVotive } from "@/components/black-votive";
import { Glyph } from "@/components/glyph";

const FILTERS = [
  { id: "all", label: "All Aspects (8)", dot: null },
  { id: "negra", label: "La Niña Negra (Focus)", dot: "bg-[#111111] shadow-[0_0_6px_rgba(255,255,255,0.4)]" },
  { id: "roja", label: "La Roja", dot: "bg-secondary-container" },
  { id: "dorada", label: "La Dorada", dot: "bg-primary" },
  { id: "verde", label: "La Verde", dot: "bg-[#3d6044]" },
  { id: "azul", label: "La Azul", dot: "bg-[#335c7d]" },
  { id: "morada", label: "La Morada", dot: "bg-[#643f72]" },
  { id: "hueso", label: "La Hueso", dot: "bg-[#d2c5b4]" },
  { id: "potencias", label: "7 Potencias", dot: "bg-gradient-to-r from-secondary via-primary to-tertiary" },
] as const;

const SPECTRUM = [
  {
    id: "roja",
    icon: "favorite",
    aspect: "Aspect II",
    tag: "Love & Blood Concord",
    tagClass: "bg-secondary-container/40 text-secondary",
    dot: "bg-secondary",
    name: "La Niña Roja",
    robe: "The Red Cloak",
    body: "Governs authentic romantic affection, mending severed family ties, renewing sexual vitality, and restoring shattered self-worth.",
    offerings:
      "Red roses in odd counts (3, 7, or 9), sweet red wine, whole red apples glazed with dark honey, cinnamon sticks, strawberry incense.",
    precept:
      "She is never petitioned to enslave another's free will through unholy dominance. She rewards genuine love and heals unmerited abandonment.",
  },
  {
    id: "dorada",
    icon: "monetization_on",
    aspect: "Aspect III",
    tag: "Abundance & Subsistence",
    tagClass: "bg-primary-container/30 text-primary",
    dot: "bg-primary",
    name: "La Niña Dorada",
    robe: "The Golden Cloak",
    body: "Presides over steady business prosperity, honest trade, liberation from crushing financial debts, and continuous household sustenance.",
    offerings:
      "Fresh wheat sheaves (espigas de trigo), bright yellow sunflowers, pure corn liquor, golden honey, shiny current-circulation coins.",
    precept:
      "Cultivates dignified labor. She rejects petitions rooted in reckless gambling, miserly hoarding, or wealth stolen from the bread of others.",
  },
  {
    id: "verde",
    icon: "balance",
    aspect: "Aspect IV",
    tag: "Jurisprudence & Equity",
    tagClass: "bg-[#3d6044]/40 text-[#9dba9a]",
    dot: "bg-[#3d6044]",
    name: "La Niña Verde",
    robe: "The Green Cloak",
    body: "The advocate of legal justice, immigration processes, resolving neighborly strife, commercial contracts, and custody hearings.",
    offerings:
      "Fresh basil (albahaca), green glass veladoras, whole limes, bay leaves, docket case paperwork placed under clear water.",
    precept:
      "Her scales cannot be swayed by corrupt money or earthly titles. She demands honest presentation of legal culpability and grants true equity.",
  },
  {
    id: "azul",
    icon: "school",
    aspect: "Aspect V",
    tag: "Intellect & Discernment",
    tagClass: "bg-[#335c7d]/40 text-[#9bb8d4]",
    dot: "bg-[#335c7d]",
    name: "La Niña Azul",
    robe: "The Blue Cloak",
    body: "Sought by academics, researchers, and students. Bestows clarity during grueling examinations, grants eloquence in speech, and cools feverish domestic strife.",
    offerings:
      "Clear mineral spring water, fresh lavender sprigs, frankincense tears, bluebells, pens and scholarly manuscripts laid at her feet.",
    precept:
      "Wisdom without disciplined application is vanity. She blesses the sleepless hours of honest study and stills emotional turbulence.",
  },
  {
    id: "morada",
    icon: "healing",
    aspect: "Aspect VI",
    tag: "Transmutation & Healing",
    tagClass: "bg-[#643f72]/40 text-[#c4a4d1]",
    dot: "bg-[#643f72]",
    name: "La Niña Morada",
    robe: "The Purple Cloak",
    body: "The mantle of deep metaphysical alchemy: clearing physical disease, pulling spirits out of depressive catatonia, and transmuting bitter sorrow.",
    offerings:
      "Raw amethyst druzy, deep purple carnations, consecrated camphor tablets, aromatic myrrh resin, dark grape juice, violet veladoras.",
    precept:
      "Works synergistically with mortal physicians. Her cloak transmutes the metaphysical root of illness so biological medicine can succeed.",
  },
  {
    id: "hueso",
    icon: "accessibility_new",
    aspect: "Aspect VII",
    tag: "Primordial Bone & Kinship",
    tagClass: "bg-tertiary/20 text-tertiary",
    dot: "bg-[#d2c5b4]",
    name: "La Niña Hueso",
    robe: "The Bone Aspect",
    body: "The naked, natural un-dyed skeleton. Represents foundational grounding, peaceful domestic balance, ancestral communion, and roots of life.",
    offerings:
      "Unsalted baked bread (pan simple), white copal tears on charcoal, pure spring well water, toasted yellow maize kernels.",
    precept:
      "Reminds the devotee of the great leveling truth: beneath skin, caste, and pride, all human skeletal bones share identical dignity.",
  },
] as const;

const MATRIX = [
  { mantle: "La Blanca (White)", domain: "Total Purification & Maternal Peace", candles: "1, 3, or 9", botanical: "White Carnations, Copal", rule: "Keep crystal clear water daily", dot: "bg-white", accent: false },
  { mantle: "La Negra (Black)", domain: "Severing Curses, Total Defense", candles: "1 or 3", botanical: "Ruda, Romero, Tabaco", rule: "Never seek unjust vengeance", dot: "bg-black shadow-[0_0_4px_rgba(255,255,255,0.4)]", accent: true },
  { mantle: "La Roja (Red)", domain: "Passionate Love & Family Harmony", candles: "3 or 7", botanical: "Red Roses, Cinnamon", rule: "No non-consensual binding spells", dot: "bg-secondary-container", accent: false },
  { mantle: "La Dorada (Gold)", domain: "Livelihood & Financial Sustenance", candles: "3 or 5", botanical: "Wheat, Sunflowers, Honey", rule: "Share bread with the hungry", dot: "bg-primary", accent: false },
  { mantle: "La Verde (Green)", domain: "Judicial Justice & Legal Settlement", candles: "2 or 4", botanical: "Albahaca (Basil), Laurel", rule: "Speak untruth to no judge", dot: "bg-[#3d6044]", accent: false },
  { mantle: "La Azul (Blue)", domain: "Scholarly Focus & Spiritual Clarity", candles: "1 or 3", botanical: "Lavender, Pure Water", rule: "Honor genuine mentors and teachers", dot: "bg-[#335c7d]", accent: false },
  { mantle: "La Morada (Purple)", domain: "Illness Transmutation & Recovery", candles: "3 or 9", botanical: "Myrrh, Camphor, Carnations", rule: "Do not abandon medical counsel", dot: "bg-[#643f72]", accent: false },
  { mantle: "La Hueso (Bone)", domain: "Equilibrium & Ancestral Grounding", candles: "1 (Plain)", botanical: "Toasted Corn, Bread", rule: "Remember your mortal end daily", dot: "bg-[#d2c5b4]", accent: false },
];

function showSection(filter: string, id: string) {
  return filter === "all" || filter === id;
}

export function SacredColorsPage({ filter, blackVotive = 0 }: { filter: string; blackVotive?: number }) {
  const visibleSpectrum = SPECTRUM.filter((item) => showSection(filter, item.id));

  return (
    <div className="pb-16">
      <header className="mx-auto max-w-[1200px] space-y-5 px-5 pb-6 pt-6 lg:px-12">
        <nav className="flex flex-wrap items-center gap-2 text-[11px] font-semibold tracking-widest text-on-surface-variant uppercase">
          <span>Sanctuary Archive</span>
          <span className="text-outline-variant">/</span>
          <span>Devotional Taxonomy</span>
          <span className="text-outline-variant">/</span>
          <span className="text-primary">The Sacred Vestments</span>
        </nav>
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-sm bg-surface-high px-3 py-1.5 text-[11px] font-semibold tracking-widest text-primary uppercase">
            <Glyph name="auto_awesome" size={14} />
            Doctrina de las Túnicas Sagradas
          </div>
          <h1 className="font-display text-[36px] leading-[1.08] tracking-tight text-on-surface md:text-[52px]">
            The Sacred Colors & Aspects
            <span className="mt-2 block font-normal italic text-primary">The Seven Robes of Mercy & Justice</span>
          </h1>
          <p className="max-w-3xl text-base leading-7 text-on-surface-variant md:text-lg">
            In sacred Mexican tradition, Santa Muerte is one indivisible spiritual force—
            <span className="font-medium italic text-on-surface">La Santísima Muerte</span>
            —yet she cloaks herself in distinct ceremonial robes (
            <span className="italic text-on-surface">las túnicas</span>
            ). Each mantle resonates with an unvarying spiritual frequency, matching the petitioner’s
            exact mortal trial. She is approached not in transaction, but in kinship: with unclouded
            glass, fresh spring water, and a heart stripped of duplicity.
          </p>
        </div>
      </header>

      <div
        id="robe-filter-bar"
        className="mx-auto flex max-w-[1200px] scroll-mt-28 items-center gap-2 overflow-x-auto px-5 pb-8 no-scrollbar lg:px-12"
      >
        {FILTERS.map((item) => {
          const active = filter === item.id;
          const href = item.id === "all" ? "/colors-and-aspects" : `/colors-and-aspects?robe=${item.id}`;
          return (
            <Link
              key={item.id}
              href={href}
              className={
                active
                  ? "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm bg-primary px-4 py-1.5 text-[11px] font-semibold tracking-wider text-on-primary uppercase shadow-[0_0_14px_rgba(235,192,117,0.3)]"
                  : "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm bg-surface-high px-4 py-1.5 text-[11px] font-semibold tracking-wider text-on-surface uppercase hover:bg-surface-highest"
              }
            >
              {item.dot ? <span className={`h-2 w-2 rounded-full ${item.dot}`} /> : null}
              {item.label}
            </Link>
          );
        })}
      </div>

      {showSection(filter, "negra") ? (
        <section id="section-negra" className="mx-auto max-w-[1200px] scroll-mt-28 px-5 lg:px-12">
          <div className="relative overflow-hidden rounded-lg bg-surface-low p-6 shadow-2xl lg:p-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-secondary-container/10 blur-3xl" />
            <div className="relative grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-5">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-surface-highest shadow-xl">
                  <img
                    src="/colors-nina-negra-altar.jpg"
                    alt="Santa Muerte cloaked in black satin, holding a silver scythe and scales, lit by votive candles"
                    className="h-full w-full object-cover object-[center_42%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest/75 via-transparent to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-2">
                    <span className="rounded-sm bg-surface-lowest/90 px-2 py-1 text-[10px] font-semibold tracking-widest text-primary uppercase">
                      Aspectus Tenebrarum
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-sm bg-surface-lowest/90 px-2 py-1 text-[10px] tracking-wider text-on-surface-variant uppercase">
                      <Glyph name="shield" size={14} />
                      Shield of total severance
                    </span>
                  </div>
                </div>
                <BlackVotive initialCount={blackVotive} />
              </div>

              <div className="space-y-6 lg:col-span-7">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest text-secondary uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    The Deepest Sanctum · Sovereign Defense
                  </span>
                  <h2 className="font-display text-[32px] leading-10 lg:text-[40px]">
                    La Niña Negra
                    <span className="mt-1 block text-[22px] italic text-primary lg:text-[26px]">
                      The Shadow of Unflinching Mercy & Retribution
                    </span>
                  </h2>
                </div>
                <div className="space-y-4 leading-7 text-on-surface-variant">
                  <p>
                    Contrary to the sensationalism propagated by film and ill-informed commentary,{" "}
                    <strong className="font-semibold text-on-surface">La Niña Negra</strong> is neither
                    malicious nor an agent of arbitrary ruin. She is the mother who steps between her
                    children and the wolves. In classical Mexican esoteric lore, the Black Robe embodies
                    the primordial void—the maternal womb prior to the dawn of creation—where no human
                    deceit, hex, or predatory intent can survive.
                  </p>
                  <p>
                    She operates upon the Principle of Absolute Impartiality. In darkness, all status,
                    wealth, and worldly posturing dissolve. When a petitioner is hunted, oppressed, or
                    subjected to insidious hostility that the earthly legal apparatus cannot remedy, La
                    Niña Negra steps forward with her silver scythe: not to inflict gratuitous injury,
                    but to sever the cords of malice with absolute mathematical precision.
                  </p>
                </div>
                <div className="rounded-sm border border-secondary-container/50 bg-secondary-container/15 p-4">
                  <p className="flex items-center gap-2 text-[12px] font-semibold tracking-wider text-secondary uppercase">
                    <Glyph name="warning" size={18} />
                    The law of the reciprocal cut (Ley de Doble Filo)
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                    Her blade cuts in both directions. Never invoke La Niña Negra out of spite, ego, or
                    to harm someone who has done no wrong. If your petition is born of malice rather
                    than genuine self-preservation, her cloak will reflect that toxicity back to the
                    supplicant. Approach her with humility, clean hands, and unassailable truth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {showSection(filter, "negra") ? (
        <section className="mx-auto mt-16 max-w-[1200px] space-y-6 px-5 lg:px-12">
          <div>
            <p className="text-[11px] font-semibold tracking-widest text-primary uppercase">
              Sovereign Decrees & Offices
            </p>
            <h3 className="mt-1 font-display text-[26px] leading-8 lg:text-[32px]">
              The Four Sovereign Dominions of the Black Cloak
            </h3>
            <p className="mt-2 max-w-3xl text-sm text-on-surface-variant">
              The foundational spiritual jurisdictions exercised under La Niña Negra&apos;s mantle,
              shielding the vulnerable and dissolving malevolent designs.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["content_cut", "I", "1. Severance of cords", "Jurisdiction I", "Shatters destructive emotional attachments, parasitic spirit ties, cycles of chemical addiction, and obsessive relationships that drain the vital spirit."],
              ["security", "II", "2. Impenetrable shield", "Jurisdiction II", "Acts as an unyielding mirror against sorcery, active curses, spiritual envy (mal de ojo), and covert psychic surveillance."],
              ["groups", "III", "3. Refuge of the outcast", "Jurisdiction III", "Historically petitioned by the persecuted, inmates facing lethal injustice, marginalized communities, and those hunted without refuge."],
              ["visibility", "IV", "4. Shadow reckoning", "Jurisdiction IV", "Guides profound interior shadow-work: unmasking one’s own illusions, admitting internal weakness, and acknowledging mortality without terror."],
            ].map(([icon, num, title, kicker, body]) => (
              <article key={title} className="flex flex-col justify-between rounded-sm bg-surface-container p-5 gold-stroke">
                <div>
                  <span className="text-[11px] font-semibold tracking-widest text-primary uppercase">{num}</span>
                  <h4 className="mt-3 flex items-center gap-2 font-display text-[20px] leading-7">
                    <Glyph name={icon} size={18} />
                    {title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{body}</p>
                </div>
                <p className="mt-4 text-[10px] font-semibold tracking-widest text-outline uppercase">{kicker}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {showSection(filter, "negra") ? (
        <section className="mx-auto mt-12 max-w-[1200px] px-5 lg:px-12">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <article className="rounded-sm bg-surface-container p-5 gold-stroke">
              <p className="flex items-center gap-2 text-[11px] font-semibold tracking-widest text-primary uppercase">
                <Glyph name="local_bar" size={20} />
                Libations & food of the void
              </p>
              <p className="mt-2 text-sm text-on-surface-variant">
                Her taste corresponds to elements that purge and awaken: bitter, earthy, and fiery
                substances that leave no room for lukewarm sentiments.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-on-surface">
                <li>Unsweetened Black Coffee: Brewed intensely hot and served in dark stoneware.</li>
                <li>Dark Mexican Tequila or Mezcal: Poured to the brim; never diluted with sweeteners.</li>
                <li>Pure Cane Aguardiente: Blown across her effigy to cleanse away lingering astral miasma.</li>
                <li>Bitter Cocoa & Burnt Bread: Symbols of the elemental hearth and unvarnished sustenance.</li>
              </ul>
            </article>
            <article className="rounded-sm bg-surface-container p-5 gold-stroke">
              <p className="flex items-center gap-2 text-[11px] font-semibold tracking-widest text-primary uppercase">
                <Glyph name="psychology_alt" size={20} />
                Botanical arsenal & fumigation
              </p>
              <p className="mt-2 text-sm text-on-surface-variant">
                Plants associated with cutting and sealing astral boundaries. Used to wash her altar
                pedestal and construct personal defensive sachets.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-on-surface">
                <li>Ruda (Rue): The supreme anti-parasitic botanical; repels ill will instantly.</li>
                <li>Romero (Rosemary): For clarifying sacred space and reinforcing auric resilience.</li>
                <li>Dried Arbol Chilies & Cloves: Placed at her base to sear away covert slander and deceit.</li>
                <li>Tabaco de Puro: Premium cigar smoke blown directly into her cloak as reverence.</li>
              </ul>
            </article>
            <article className="rounded-sm bg-surface-container p-5 gold-stroke">
              <p className="flex items-center gap-2 text-[11px] font-semibold tracking-widest text-primary uppercase">
                <Glyph name="gavel" size={20} />
                Altar rules & strict protocol
              </p>
              <p className="mt-2 text-sm text-on-surface-variant">
                Devotional protocols handed down by hereditary mayordomos to prevent
                cross-contamination of energies.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-on-surface">
                <li>Independent Glass of Water: Never share her water vessel with other colors. Change every 48 hours.</li>
                <li>No Stagnant Ashes: Cleanse her bowl of tobacco residue daily; dead ashes accumulate stagnant ether.</li>
                <li>Keep North-Facing if Feasible: Aligned with the midnight hour and the subterranean wind.</li>
                <li>Fulfill All Vows Immediately: If you promised a black tap-candle or bread, deliver promptly.</li>
              </ul>
            </article>
          </div>
        </section>
      ) : null}

      {showSection(filter, "negra") ? (
        <section className="mx-auto mt-12 max-w-[1200px] px-5 lg:px-12">
          <p className="text-[11px] font-semibold tracking-widest text-primary uppercase">
            Ritual Liturgy · Autonomous Shielding
          </p>
          <div className="mt-3 grid grid-cols-1 gap-8 rounded-lg bg-surface-container p-6 gold-stroke lg:grid-cols-2 lg:p-10">
            <div>
              <h3 className="font-display text-[24px] leading-8">Oración de Blindaje y Retiro de Mal</h3>
              <p className="mt-1 text-[11px] tracking-wider text-on-surface-variant uppercase">
                Recite at Twilight with 1 Black Taper
              </p>
              <blockquote className="mt-4 font-display text-[18px] leading-8 text-on-surface-variant italic">
                “Santísima Muerte de la túnica de sombra, Señora de la Medianoche y guardiana de lo
                oculto: extiende tu manto impenetrable sobre mi casa y mi espíritu. Corta con tu hoz de
                plata toda lengua ponzoñosa, toda hechicería lanzada en la tiniebla, y todo lazo que
                pretenda aprisionar mi libertad. Que quien venga con dolo encuentre tu rostro de
                justicia, y quien me busque con rencor quede ciego ante tu resplandor oscuro. En tus
                manos encomiendo mi defensa.”
              </blockquote>
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-widest text-primary uppercase">
                Devotional Translation
              </p>
              <blockquote className="mt-4 leading-7 text-on-surface-variant italic">
                “Most Holy Death of the shadow cloak, Sovereign Lady of Midnight and guardian of hidden
                depths: cast your impenetrable mantle over my household and my being. Sever with your
                scythe of cold silver every venomous tongue, every curse uttered in the dark, and every
                chain that seeks to bind my sovereign life. Let whoever approaches in deceit confront
                your unblinking justice, and let those who stalk me in malice walk blind before your
                consuming shadow. Into your faithful keeping, I lay my complete defense. Amén.”
              </blockquote>
            </div>
          </div>
        </section>
      ) : null}

      {filter !== "negra" ? (
        <section id="other-robes-section" className="mx-auto mt-16 max-w-[1200px] scroll-mt-28 space-y-8 px-5 lg:px-12">
          <div>
            <p className="text-[11px] font-semibold tracking-widest text-primary uppercase">
              Las Manifestaciones Sagradas
            </p>
            <h2 className="font-display text-[32px] leading-10">The Spectrum of Devotional Grace</h2>
            <p className="mt-2 max-w-3xl text-on-surface-variant">
              Explore the traditional mantles through which La Santísima interacts with mortal
              circumstance. Each aspect commands its own color protocol, offering, and moral discipline.
            </p>
          </div>
          <div id="robes-grid" className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleSpectrum.map((item) => (
              <article
                key={item.id}
                id={item.id}
                className="flex scroll-mt-28 flex-col justify-between space-y-4 rounded-sm bg-surface-container p-6 gold-stroke"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${item.tagClass}`}>
                      <Glyph name={item.icon} size={15} />
                      {item.tag}
                    </span>
                    <span className="text-[10px] tracking-wider text-outline uppercase">{item.aspect}</span>
                  </div>
                  <h3 className="font-display text-[24px] leading-8">
                    {item.name}
                    <span className="mt-1 block text-[18px] italic text-primary">{item.robe}</span>
                  </h3>
                  <p className="text-sm leading-relaxed text-on-surface-variant">{item.body}</p>
                  <div className="pt-1">
                    <p className="text-[10px] font-semibold tracking-widest text-primary uppercase">
                      Sacred Offerings
                    </p>
                    <p className="mt-1 text-sm text-on-surface">{item.offerings}</p>
                  </div>
                </div>
                <div className="space-y-1 border-t border-outline-variant/30 pt-3">
                  <p className="text-[10px] font-semibold tracking-wider text-on-surface-variant uppercase">
                    Devotional Precept
                  </p>
                  <p className="text-sm italic text-on-surface-variant">{item.precept}</p>
                </div>
              </article>
            ))}
            {showSection(filter, "potencias") ? (
              <article
                id="potencias"
                className="flex scroll-mt-28 flex-col justify-between gap-6 rounded-sm bg-surface-low p-6 gold-stroke md:col-span-2 md:flex-row lg:col-span-3"
              >
                <div className="max-w-2xl space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-sm bg-surface-highest px-2 py-0.5 text-[10px] font-semibold tracking-wider text-primary uppercase">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-secondary via-primary to-tertiary" />
                      The Rainbow Mantle
                    </span>
                    <span className="text-[10px] tracking-wider text-outline uppercase">Unified Aspect</span>
                  </div>
                  <h3 className="font-display text-[26px] leading-8">
                    Las Siete Potencias{" "}
                    <span className="italic text-primary">The Seven Powers Cloak</span>
                  </h3>
                  <p className="leading-7 text-on-surface-variant">
                    When an individual faces complex, multi-layered crises—such as simultaneous job
                    loss, bitter legal trials, failing health, and marriage collapse—Las Siete Potencias
                    unites all color frequencies into one harmonious garment. It aligns the totality of
                    existence back into sacred equilibrium.
                  </p>
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest text-primary uppercase">
                      Ritual Offerings
                    </p>
                    <p className="mt-1 text-sm text-on-surface">
                      Seven-day striped paraffin candles, multi-colored ribbon braids, a full floral
                      bouquet with seven different blossoms, fresh bread, and seven clean coins.
                    </p>
                  </div>
                </div>
                <div className="flex w-full flex-col justify-between space-y-4 self-stretch rounded-sm bg-surface-lowest p-5 md:w-72">
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest text-primary uppercase">
                      When to Call
                    </p>
                    <p className="mt-2 text-sm text-on-surface-variant">
                      Major life passages, home dedications, crossing unmapped life thresholds, or
                      seeking comprehensive year-long protection for a family.
                    </p>
                  </div>
                  <Link
                    href="/novenas/seven-powers"
                    className="inline-flex items-center justify-between gap-1 text-[11px] font-semibold tracking-wider text-primary uppercase hover:underline"
                  >
                    View 7-Powers Novena
                    <Glyph name="arrow_forward" size={16} />
                  </Link>
                </div>
              </article>
            ) : null}
          </div>
        </section>
      ) : null}

      {filter === "all" ? (
        <section id="matrix" className="mt-16 bg-surface-lowest py-16">
          <div className="mx-auto max-w-[1200px] space-y-4 px-5 lg:px-12">
            <p className="text-[11px] font-semibold tracking-widest text-primary uppercase">
              Canonical Synopsis
            </p>
            <h2 className="font-display text-[32px] leading-10">Liturgical Matrix of the Sacred Robes</h2>
            <p className="text-sm text-on-surface-variant">
              Quick reference protocol for practitioners, scholars, and mayordomos maintaining altars.
            </p>
            <div className="overflow-x-auto rounded-sm bg-surface-container">
              <table className="min-w-[860px] w-full border-collapse text-left text-sm">
                <thead className="bg-surface-high text-[11px] font-semibold tracking-wider text-primary uppercase">
                  <tr>
                    {["Mantle & Color", "Core Domain", "Candle Count", "Botanical Key", "Cardinal Rule"].map(
                      (h) => (
                        <th key={h} className="px-4 py-3">
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody className="text-on-surface-variant">
                  {MATRIX.map((row, i) => (
                    <tr
                      key={row.mantle}
                      className={`border-t border-outline-variant/20 ${i % 2 ? "bg-surface-low/40" : ""}`}
                    >
                      <td className={`px-4 py-3 ${row.accent ? "font-semibold text-secondary" : "font-medium text-on-surface"}`}>
                        <span className="inline-flex items-center gap-2">
                          <span className={`h-2.5 w-2.5 rounded-full ${row.dot}`} />
                          {row.mantle}
                        </span>
                      </td>
                      <td className={`px-4 py-3 ${row.accent ? "font-medium text-on-surface" : ""}`}>{row.domain}</td>
                      <td className="px-4 py-3">{row.candles}</td>
                      <td className="px-4 py-3">{row.botanical}</td>
                      <td className={`px-4 py-3 ${row.accent ? "font-medium text-secondary" : ""}`}>{row.rule}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : null}

      {filter === "all" || filter === "negra" ? (
        <section id="pillars" className="mx-auto mt-16 max-w-[1200px] px-5 lg:px-12">
          <div className="rounded-lg bg-surface-container p-6 gold-stroke lg:p-10">
            <p className="text-[11px] font-semibold tracking-widest text-primary uppercase">
              Sanctuary Theology
            </p>
            <h2 className="mt-1 font-display text-[28px] leading-9">
              The Twin Maternal Pillars: La Blanca & La Negra
            </h2>
            <p className="mt-4 max-w-4xl leading-7 text-on-surface-variant">
              In high altar devotion, the White Robe (La Niña Blanca) and the Black Robe (La Niña
              Negra) are not opposing cosmic adversaries; they are the twin hands of the same loving
              mother. La Blanca represents maternal creation, illumination, absolute cleansing, and
              spiritual peace. La Negra represents maternal guardianship: the fierce ferocity that
              shelters her children when night falls.
            </p>
            <p className="mt-4 max-w-4xl leading-7 text-on-surface-variant">
              Just as day requires night, complete devotional maturity recognizes both aspects as
              indispensable. One purges the soul of guilt and sorrow; the other defends that renewed
              soul from external violence and demonic predation.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-sm bg-surface-low p-5">
                <h3 className="flex items-center gap-2 font-display text-[22px] leading-7">
                  <Glyph name="help_outline" size={18} />
                  Can multiple colored statues share one altar?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  Yes. However, traditional altars arrange them with spatial intention. La Niña Blanca
                  generally resides in the center or highest elevated tier. When La Niña Negra is
                  present on the same shelf, she is accorded her own distinct glass of water and
                  dedicated candle dish so her intense defensive frequency does not overlap with gentle
                  petitions for peace or romance.
                </p>
              </div>
              <div className="rounded-sm bg-surface-low p-5">
                <h3 className="flex items-center gap-2 font-display text-[22px] leading-7">
                  <Glyph name="water_drop" size={18} />
                  The paramount importance of clear water
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  Water is the psychic barometer of Santa Muerte’s presence. If the water on an altar
                  dedicated to La Niña Negra becomes cloudy, bubbled, or evaporates abnormally fast
                  within 24 hours, it indicates that her mantle has intercepted an incoming spiritual
                  blow meant for you. Discard it outside the property boundaries immediately, rinse the
                  glass with salt, and pour fresh spring water.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto mt-16 max-w-[1000px] px-5 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 rounded-lg bg-surface-container p-6 gold-stroke lg:flex-row lg:items-center lg:p-10">
          <div className="max-w-xl space-y-2">
            <p className="text-[11px] font-semibold tracking-widest text-primary uppercase">
              Seek Her Mantle Today
            </p>
            <h2 className="font-display text-[26px] leading-8">
              Entrust Your Intention to the Sanctuary Altar
            </h2>
            <p className="text-sm leading-relaxed text-on-surface-variant">
              Leave a word on the petition wall or walk the current nine-day cycle.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/petitions#offer"
              className="inline-flex items-center gap-2 rounded-sm bg-secondary-container px-5 py-2.5 text-xs font-semibold tracking-wider text-on-surface uppercase"
            >
              <Glyph name="candle" size={18} />
              Submit a Petition
            </Link>
            <Link
              href="/novenas"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-xs font-semibold tracking-wider text-on-primary uppercase"
            >
              <Glyph name="menu_book" size={18} />
              Join current novena
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
