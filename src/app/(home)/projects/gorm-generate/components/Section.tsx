import type { ReactNode } from "react";

export function Section({ children }: { children: ReactNode }) {
  return (
    <section className="border-t border-fd-border py-14 md:py-20">
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fd-foreground/60">
      {children}
    </p>
  );
}
