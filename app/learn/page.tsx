import Link from "next/link";
import { Glyph, IconWell } from "@/components/glyph";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Learn",
  description:
    "The history, authentic theology, traditional offerings, and solemn devotional ethics of the White Aspect of Santa Muerte.",
  path: "/learn",
});

export default function LearnPage() {
  return (
    <div className="relative overflow-hidden pb-16">
      <div className="pointer-events-none absolute top-12 left-1/2 h-[360px] w-[700px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute top-[1100px] right-4 h-[400px] w-[500px] rounded-full bg-secondary-container/10 blur-[140px]" />

      <section className="relative z-10 mx-auto max-w-[1200px] px-5 pt-10 pb-10 lg:px-12">
        <div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-high px-4 py-1.5 shadow-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="text-[11px] font-semibold tracking-[0.14em] text-on-surface-variant uppercase">
              Sacred Compendium & Praxis
            </span>
          </div>
          <h1 className="font-display text-[40px] leading-none tracking-tight text-on-surface md:text-[52px]">
            Understanding <span className="italic text-primary">Niña Blanca</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant">
            The history, authentic theology, traditional offerings, and solemn devotional ethics of the
            White Aspect of Santa Muerte.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] font-semibold tracking-wider text-on-surface-variant/80 uppercase">
            <span>Solemn Tradition</span>
            <span className="text-[10px] text-primary">•</span>
            <span>Purity & Healing</span>
            <span className="text-[10px] text-primary">•</span>
            <span>Sanctuary Charter</span>
          </div>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-xl bg-surface-lowest shadow-2xl">
          <div className="relative h-[340px] w-full sm:h-[460px] lg:h-[540px]">
            <img
              src="/learn-white-aspect.jpg"
              alt="Altar of Niña Blanca surrounded by glowing candles, white roses, and traditional offerings"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-transparent to-surface/60" />
            <div className="absolute bottom-0 left-0 max-w-2xl space-y-2 p-6 lg:p-10">
              <span className="text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">
                Sanctuary of the White Veil
              </span>
              <blockquote className="font-display text-[22px] leading-8 text-on-surface italic md:text-[26px] md:leading-9">
                “Under her ivory mantle, every mortal fear is softened into silence, and every genuine
                petition is heard without condition or dread.”
              </blockquote>
              <p className="text-sm text-on-surface-variant">
                The White Aspect represents maternal unconditional mercy, spiritual washing, and
                absolute stillness.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1200px] px-5 py-10 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.15em] text-primary uppercase">
                Theology of the Mantle
              </p>
              <h2 className="mt-1 font-display text-[28px] leading-9 text-on-surface md:text-[32px] md:leading-10">
                Purity, Solace, & The Universal Cradle
              </h2>
            </div>
            <div className="space-y-4 leading-7 text-on-surface-variant">
              <p>
                In traditional Mexican folk devotion, the White Aspect—affectionately addressed as{" "}
                <em className="font-display text-[22px] not-italic text-on-surface">La Niña Blanca</em>
                —is venerated as the purest, most tranquil, and maternally protective face of Santa
                Muerte. Unlike sensational depictions, white embodies primordial innocence, the blank
                slate of new life, spiritual unburdening, and the quiet peace of the departed.
              </p>
              <p>
                Seekers turn to Niña Blanca in moments of psychic exhaustion, bodily sickness,
                household disruption, and spiritual uncertainty. Her white veil acts as a divine
                filter: absorbing heavy energies, stilling frantic minds, and erecting an impenetrable
                wall of grace around the home.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                ["spa", "Purification & Solace", "Neutralizes conflict, absorbs domestic resentment, and restores gentle harmony to wounded souls."],
                ["healing", "Bodily & Mind Healing", "Invoked beside sickbeds and recovery spaces for patient, unbroken cellular and emotional rejuvenation."],
                ["shield", "Maternal Shielding", "Acts as a non-violent, reflective barrier warding off malefic intent, envy, and negative currents."],
                ["all_inclusive", "Egalitarian Grace", "Refuses neither outcast nor saint. In death and white light, all human hierarchies dissolve into equity."],
              ].map(([icon, title, body]) => (
                <div key={title} className="space-y-2 rounded-lg bg-surface-container p-4 shadow-sm">
                  <IconWell name={icon} />
                  <h3 className="font-display text-[22px] leading-7">{title}</h3>
                  <p className="text-sm text-on-surface-variant">{body}</p>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-4 rounded-lg bg-surface-high p-6 shadow-sm">
              <Glyph name="wb_sunny" filled size={24} />
              <div className="space-y-1">
                <h4 className="font-display text-[22px] leading-7 text-primary">
                  Why This Sanctuary is Solely White
                </h4>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  Niña Blanca Sanctuary was founded intentionally as a serene refuge of contemplation
                  and light. We do not host rituals of binding, revenge, or worldly dominion. Here,
                  devotion remains unpolluted by coercion, greed, or fear.
                </p>
              </div>
            </div>
          </div>

          <aside className="space-y-4 rounded-xl bg-surface-container p-6 shadow-md lg:col-span-5 lg:p-8">
            <div className="space-y-1 pb-1">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
                Comparative Taxonomy
              </p>
              <h3 className="font-display text-[26px] leading-8">The Traditional Robes</h3>
              <p className="text-sm text-on-surface-variant">
                A respectful guide to traditional color aspects and their spiritual assignments.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-lg bg-surface-highest p-4 shadow-inner">
              <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-primary" />
              <div className="flex items-center justify-between gap-2 pl-2">
                <span className="font-display text-[18px] leading-6">La Túnica Blanca (White)</span>
                <span className="shrink-0 rounded-sm bg-primary px-2 py-0.5 text-[10px] font-bold tracking-wider text-on-primary uppercase">
                  Our Shrine
                </span>
              </div>
              <p className="mt-2 pl-2 text-sm leading-snug text-on-surface-variant">
                Health, spiritual cleansing, peaceful reconciliation, holy water, maternal refuge,
                absolute innocence.
              </p>
            </div>
            {[
              [
                "La Túnica Roja (Red)",
                "Traditional",
                "text-secondary",
                "Matters of the heart, passionate fidelity, familial harmony, and romantic devotion.",
              ],
              [
                "La Túnica Dorada (Gold / Yellow)",
                "Traditional",
                "text-primary",
                "Economic sufficiency, honest labor, dignified business stability, debt relief, and sustained prosperity.",
              ],
              [
                "La Túnica Negra (Black)",
                "Traditional",
                "text-on-surface",
                "Total severance, severe defense against curses, psychic battle, and protection of the physically persecuted.",
              ],
              [
                "Azul, Verde & Ámbar",
                "Auxiliary",
                "text-tertiary",
                "Legal fairness, judicial wisdom, academic clarity, rehabilitation, and medical recovery.",
              ],
            ].map(([name, tag, color, body]) => (
              <div key={name} className="space-y-1 rounded-lg bg-surface-low p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className={`font-display text-[18px] leading-6 ${color}`}>{name}</span>
                  <span className="shrink-0 text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase">
                    {tag}
                  </span>
                </div>
                <p className="text-sm leading-snug text-on-surface-variant">{body}</p>
              </div>
            ))}
            <p className="pt-1 text-center text-[11px] font-semibold tracking-wider text-outline uppercase">
              Regardless of color, all emanate from the same holy presence.
            </p>
            <p className="text-center">
              <Link
                href="/colors-and-aspects"
                className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider text-primary uppercase"
              >
                Aspects & Colors
                <Glyph name="arrow_forward" size={14} />
              </Link>
            </p>
          </aside>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1200px] px-5 py-10 lg:px-12">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.15em] text-primary uppercase">
              Iconography & Symbols
            </p>
            <h2 className="font-display text-[32px] leading-10">The Sacred Attributes</h2>
          </div>
          <p className="max-w-md text-sm text-on-surface-variant">
            Each object held by Niña Blanca represents an ancient metaphysical truth.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {[
            ["agriculture", "Instrument", "La Guadaña", "The Scythe", "Not a weapon of violence, but the tool of universal harvest. It severs toxic energetic cords, cuts down despair, and proclaims absolute equality before time.", "Equality & Harvest"],
            ["balance", "Measure", "La Balanza", "The Scales", "Emblem of cosmic equity and divine proportion. She weighs our true needs against superficial cravings, dispensing ethical equilibrium and objective justice.", "Moral Truth"],
            ["public", "Domain", "El Mundo", "The Celestial Globe", "Cradled gently in her palm, the globe signifies that neither continent, border, language, nor social status stands outside her universal maternal embrace.", "Global Solace"],
            ["styler", "Vestment", "El Manto Blanco", "The White Veil", "Representing pristine silence, baptismal cleansing, and the shroud of peace. It covers the devotee like a mother sheltering a sleeping infant during storms.", "Maternal Cloak"],
            ["visibility", "Companion", "El Búho", "The Sacred Owl", "Stationed at her feet or scythe. With eyes pierced through absolute midnight, it warns devotees of betrayal, hidden falsehoods, and unperceived danger.", "Nocturnal Insight"],
          ].map(([icon, role, title, en, body, foot]) => (
            <div
              key={title}
              className="flex flex-col justify-between rounded-lg bg-surface-container p-4 shadow-sm"
            >
              <div className="space-y-3">
                <IconWell name={icon} size="md" tone="muted" />
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold tracking-wider text-outline uppercase">{role}</p>
                  <h3 className="font-display text-[22px] leading-7">{title}</h3>
                  <p className="text-[12px] font-semibold tracking-wider text-primary/90 italic">{en}</p>
                </div>
                <p className="text-sm leading-relaxed text-on-surface-variant">{body}</p>
              </div>
              <p className="pt-4 text-[11px] font-semibold tracking-wider text-primary uppercase">{foot}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1200px] px-5 py-10 lg:px-12">
        <div className="relative overflow-hidden rounded-2xl bg-surface-low p-6 shadow-xl lg:p-10">
          <div className="pointer-events-none absolute -top-16 -right-16 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="max-w-2xl space-y-2">
            <p className="text-[12px] font-semibold tracking-[0.16em] text-primary uppercase">
              Practical Sanctuary Praxis
            </p>
            <h2 className="font-display text-[32px] leading-10">Consecrating & Tending an Altar</h2>
            <p className="text-on-surface-variant">
              An altar to Niña Blanca is not an exhibition; it is an active hearth of reciprocal
              fellowship, clean respiration, and continuous remembrance.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {[
              ["water_drop", "Essential First Element", "1. El Vaso de Agua", "Clear, fresh spring or tap water in a dedicated glass. Water is life and energy. It absorbs ambient household negativity and cools the sanctuary.", "Replace Every 3-7 Days"],
              ["candle", "Sacred Light & Heat", "2. Veladora Blanca", "White paraffin or beeswax glass vigil candles. Fire represents the devotee’s living prayer burning across night and day, guiding her attention.", "Keep Vessel Fireproof"],
              ["local_florist", "Botanical Devotion", "3. Flores Blancas", "White roses, lilies, or carnations. Flowers offer natural scent, sweet vitality, and tender affection. Always remove immediately before they wilt.", "Never Leave Wilted Stems"],
              ["air", "Aromatic Smoke", "4. Copal & Mirra", "Traditional Mexican tree resin or sandalwood stick incense. Cleanses heavy air, welcomes sacred quietude, and carries uttered words heavenward.", "Burn During Prayer"],
              ["restaurant", "Tangible Sustenance", "5. Pan, Dulces y Fruta", "Red or golden apples, sweet Mexican bread (conchas), white chocolates, or honey. Physical gifts honoring her like a grandmother in our home.", "Rotate While Fresh"],
            ].map(([icon, role, title, body, chip]) => (
              <div key={title} className="flex flex-col justify-between space-y-3 rounded-lg bg-surface-container p-4 shadow-sm">
                <div className="space-y-2">
                  <IconWell name={icon} size="md" />
                  <p className="text-[11px] font-semibold tracking-wider text-outline uppercase">{role}</p>
                  <h3 className="font-display text-[22px] leading-7">{title}</h3>
                  <p className="text-sm leading-relaxed text-on-surface-variant">{body}</p>
                </div>
                <span className="inline-block w-fit rounded-sm bg-surface-high px-2 py-1 text-[11px] font-semibold tracking-wider text-primary uppercase">
                  {chip}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 pt-2 lg:grid-cols-3">
            {[
              ["cleaning_services", "Ritual Cleanliness", "Niña Blanca abhors dust, clutter, and neglect. Clean the shelf with Florida Water or white vinegar diluted in water once weekly. Your physical care reflects your devotion."],
              ["lock", "Private Placement", "Place the shrine at eye or chest level—never on the floor. Avoid placing her directly in high-traffic hallways or where cynical guests might offer mockery or disrespect."],
              ["delete_sweep", "Respectful Disposal", "Never throw consecrated offerings in trash carelessly. Return fruit and spent flowers to fertile earth or compost under trees, speaking words of grateful dismissal."],
            ].map(([icon, title, body]) => (
              <div key={title} className="space-y-2">
                <h4 className="flex items-center gap-2 font-display text-[22px] leading-7 text-primary">
                  <Glyph name={icon} size={18} />
                  {title}
                </h4>
                <p className="text-sm leading-relaxed text-on-surface-variant">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1200px] px-5 py-10 lg:px-12">
        <div className="max-w-3xl space-y-6">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.15em] text-primary uppercase">
              Dispelling Misconceptions
            </p>
            <h2 className="mt-1 font-display text-[32px] leading-10">
              The Light of Truth vs Sensationalism
            </h2>
            <p className="mt-3 leading-7 text-on-surface-variant">
              Decades of media distortion have associated Santa Muerte solely with underworld cartels
              or demonic cinema tropes. Here is the reality as practiced by millions of dignified
              families.
            </p>
          </div>
          <div className="space-y-4">
            {[
              [
                "“Santa Muerte is jealous and punishes you if you stop praying.”",
                "False. Niña Blanca operates under maternal benevolence. If life leads you elsewhere, you simply thank her, dispose of offerings respectfully, and step away in peace. She requires no indentured servitude.",
              ],
              [
                "“Devotion requires dark pacts or trading your soul.”",
                "Absolute fiction. Devotion to Santa Muerte is identical in rhythm to Catholic folk saint veneration: asking for intercession, offering light, thanking her with flowers and bread, and maintaining an upright moral life.",
              ],
              [
                "“You can use Niña Blanca to curse enemies or cause harm.”",
                "The White Aspect does not receive or act upon harmful intentions. Her role is to pacify, cleanse, and dissolve discord. Malice submitted to her dissolves in her light.",
              ],
            ].map(([myth, reality]) => (
              <div key={myth} className="space-y-2 rounded-lg bg-surface-container p-4 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-sm bg-[#93000a] px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#ffdad6] uppercase">
                    Sensational Myth
                  </span>
                  <h4 className="font-display text-[20px] leading-7">{myth}</h4>
                </div>
                <p className="pl-1 text-sm leading-relaxed text-on-surface-variant">
                  <strong className="font-medium text-primary">The Reality:</strong> {reality}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1200px] px-5 py-10 lg:px-12">
        <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl bg-gradient-to-br from-surface-high via-surface-container to-surface-low p-6 text-center shadow-2xl md:flex-row md:items-center md:text-left lg:p-10">
          <div className="max-w-xl space-y-2">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
              Deepen Your Journey
            </p>
            <h2 className="font-display text-[28px] leading-9 md:text-[32px] md:leading-10">
              Step Into the Sacred Sanctuary
            </h2>
            <p className="text-on-surface-variant">
              Explore our curated prayer compendium, or place your silent petition upon the perpetual
              community candle wall.
            </p>
          </div>
          <div className="flex w-full shrink-0 flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/prayers"
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-2.5 text-[12px] font-semibold tracking-wider text-on-primary uppercase shadow-lg sm:w-auto"
            >
              <Glyph name="menu_book" size={18} />
              Prayer Library
            </Link>
            <Link
              href="/petitions"
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-secondary-container px-6 py-2.5 text-[12px] font-semibold tracking-wider text-on-surface uppercase shadow-md sm:w-auto"
            >
              <Glyph name="candle" size={18} />
              Submit a Petition
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
