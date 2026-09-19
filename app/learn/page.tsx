import Link from "next/link";
import { learnLinks } from "@/lib/nav";

export const metadata = { title: "Learn" };

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-[800px] space-y-8 px-5 py-12">
      <p className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">Heritage</p>
      <h1 className="font-display text-[40px] leading-[48px]">Learning and tradition</h1>
      <p className="text-lg text-on-surface-variant">
        Start here if you are new, and return here if you have been around long enough to
        get sloppy. These pages stay with history, altar care, and the limits of this house.
      </p>
      <ul className="divide-y divide-outline-variant/30 rounded-lg bg-surface-container gold-stroke">
        {learnLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="block px-5 py-4 hover:text-primary">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
