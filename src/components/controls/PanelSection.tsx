import type { ReactNode } from "react";

interface PanelSectionProps {
  title: string;
  children: ReactNode;
}

/** A titled, divided group of controls in the settings panel. */
export function PanelSection({ title, children }: PanelSectionProps) {
  return (
    <section className="border-b border-chrome-line py-5 last:border-b-0">
      <h2 className="mb-3.5 text-[13px] font-semibold tracking-tight text-chrome-ink">{title}</h2>
      {children}
    </section>
  );
}
