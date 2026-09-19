"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { primaryNav } from "@/lib/nav";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#b08a45]/20 bg-surface-low/95 backdrop-blur-md">
      <Link
        href="/novenas"
        className="flex items-center justify-center gap-2 border-b border-[#b08a45]/15 bg-surface-lowest px-5 py-2 text-center font-sans text-[11px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase hover:text-primary"
      >
        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
        Current community novena — join in prayer
      </Link>
      <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-5 lg:px-12">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Niña Blanca" className="h-10 w-auto md:h-12" />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "rounded-sm bg-primary-container px-3 py-1.5 text-xs font-semibold tracking-wide text-on-primary"
                    : "rounded-sm px-3 py-1.5 text-xs font-semibold tracking-wide text-on-surface-variant hover:bg-surface-high/60 hover:text-primary"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/petitions#offer"
            className="burgundy-glow hidden items-center gap-1 rounded-sm border border-[#b08a45]/30 bg-secondary-container px-4 py-2 text-xs font-semibold tracking-wider text-on-surface uppercase sm:inline-flex hover:bg-on-secondary"
          >
            Submit a Petition
          </Link>
          <button
            type="button"
            className="rounded-sm border border-outline-variant/40 px-3 py-2 text-xs tracking-wider uppercase lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            Menu
          </button>
        </div>
      </div>
      {open ? (
        <div className="space-y-1 border-t border-outline-variant/30 bg-surface-lowest px-5 py-4 lg:hidden">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 text-sm text-on-surface-variant"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/petitions#offer"
            className="mt-2 block py-2 text-sm text-primary"
            onClick={() => setOpen(false)}
          >
            Submit a Petition
          </Link>
        </div>
      ) : null}
    </header>
  );
}
