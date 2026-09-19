import Link from "next/link";
import { devotionLinks, learnLinks, trustLinks } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="mt-10 w-full bg-surface-lowest">
      <div className="mx-auto max-w-[1200px] px-5 pb-8 pt-10 lg:px-12">
        <div className="grid grid-cols-1 gap-10 pb-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <img src="/logo.png" alt="Niña Blanca Sanctuary" className="h-10 w-auto" />
            <p className="max-w-sm text-sm leading-relaxed text-on-surface-variant">
              Niña Blanca is a quiet place of prayer, devotion, and community under
              the mantle of Santa Muerte. Respectful seekers are welcome.
            </p>
            <Link
              href="/support"
              className="inline-flex rounded-sm bg-surface-container px-4 py-2 text-[12px] font-semibold tracking-wider text-on-surface uppercase hover:bg-surface-high"
            >
              Support Niña Blanca
            </Link>
          </div>
          <FooterColumn title="Learn" links={learnLinks} />
          <FooterColumn title="Devotion" links={devotionLinks} />
          <FooterColumn title="Trust & Care" links={trustLinks} />
        </div>
        <div className="flex flex-col items-center justify-between gap-2 pt-4 text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase md:flex-row">
          <span>© {new Date().getFullYear()} Niña Blanca Sanctuary. Held in silent prayer.</span>
          <span>ninablanca.com</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-xs font-semibold tracking-wider text-primary uppercase">{title}</h2>
      <ul className="space-y-2 text-sm text-on-surface-variant">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-primary">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
