import { NovenaRibbon } from "@/components/novena-ribbon";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed top-0 z-50 w-full">
        <NovenaRibbon />
        <SiteHeader />
      </div>
      <main className="min-h-[calc(100dvh-80px)] w-full bg-surface pt-[8.75rem]">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
