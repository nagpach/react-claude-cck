import type { ReactNode } from "react";

interface PanelSectionProps {
  title: string;
  children: ReactNode;
}

/** A titled, divided group of controls in the settings panel. */
export function PanelSection({ title, children }: PanelSectionProps) {
  return (
    <section className="border-b border-chrome-line py-[18px] last:border-b-0">
      <div className="mb-3.5 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-chrome-mute">
        <span>{title}</span>
        <span className="h-px flex-1 bg-chrome-line" />
      </div>
      {children}
    </section>
  );
}
