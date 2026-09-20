"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { primaryNav } from "@/lib/nav";
import { Glyph } from "@/components/glyph";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-[#b08a45]/20 bg-surface-low/95 backdrop-blur-md">
      <div className="mx-auto flex h-24 max-w-[1200px] items-center justify-between gap-3 px-5 lg:px-12">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <img src="/logo.png" alt="Niña Blanca" className="h-14 w-auto md:h-[4.25rem]" />
        </Link>
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0 lg:flex">
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
                    ? "rounded-sm bg-primary-container px-2 py-1.5 text-[11px] font-semibold tracking-wide text-on-primary whitespace-nowrap xl:px-3 xl:text-xs"
                    : "rounded-sm px-2 py-1.5 text-[11px] font-semibold tracking-wide text-on-surface-variant whitespace-nowrap hover:bg-surface-high/60 hover:text-primary xl:px-3 xl:text-xs"
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
            className="burgundy-glow hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm border border-[#b08a45]/30 bg-secondary-container px-4 py-2 text-xs font-semibold tracking-wider text-on-surface uppercase md:inline-flex hover:bg-on-secondary"
          >
            <Glyph name="candle" size={16} />
            Submit a Petition
          </Link>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-outline-variant/40 text-primary lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
          >
            <Glyph name={open ? "close" : "menu"} size={20} />
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
