import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[calc(100dvh-80px)] w-full bg-surface pt-[7.5rem]">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
