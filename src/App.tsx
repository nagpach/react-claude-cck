import { lazy, Suspense, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { CalculatorPreview } from "@/components/CalculatorPreview";
import { ControlsPanel } from "@/components/ControlsPanel";
import { useCalculator } from "@/hooks/useCalculator";
import { useDesign } from "@/hooks/useDesign";
import { useViewportWidth } from "@/hooks/useViewportWidth";
import { cn } from "@/lib/utils";

const DeveloperArticle = lazy(() =>
  import("@/components/DeveloperArticle").then((module) => ({ default: module.DeveloperArticle })),
);
const RouterMigrationArticle = lazy(() =>
  import("@/components/RouterMigrationArticle").then((module) => ({ default: module.RouterMigrationArticle })),
);

const PANEL_WIDTH = 392;
const STAGE_PADDING = 40;
const MOBILE_BREAKPOINT = 768;

function RouteFallback() {
  return <div className="min-h-screen bg-chrome-panel" />;
}

function CalculatorBuilder() {
  const { design, updateField, applyPreset, chooseShape, reset, randomize } = useDesign();
  const { memory, runKey } = useCalculator(design.separators);
  const [panelOpen, setPanelOpen] = useState(true);
  const viewportWidth = useViewportWidth();

  // Keep the preview centred in the space left of the docked panel on wide screens.
  const previewShift = useMemo(() => {
    if (!panelOpen || viewportWidth < MOBILE_BREAKPOINT) return 0;

    const availableWidth = Math.max(0, viewportWidth - PANEL_WIDTH - STAGE_PADDING * 2);
    const previewWidth = Math.min(design.calcW, availableWidth);
    const panelSafeShift = PANEL_WIDTH + STAGE_PADDING + previewWidth / 2 - viewportWidth / 2;

    return Math.max(0, panelSafeShift);
  }, [design.calcW, panelOpen, viewportWidth]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-chrome-bg text-chrome-ink antialiased">
      <ControlsPanel
        design={design}
        updateField={updateField}
        applyPreset={applyPreset}
        chooseShape={chooseShape}
        reset={reset}
        randomize={randomize}
        open={panelOpen}
        onOpenChange={setPanelOpen}
      />

      <main
        className={cn(
          "relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-5 transition-[background-color,padding] duration-200 sm:px-8 sm:pb-8 md:p-10",
          panelOpen ? "pt-[calc(50vh+20px)] sm:pt-[calc(50vh+32px)]" : "pt-20 sm:pt-24",
        )}
        style={{ background: design.stageBg }}
      >
        <div className="stage-grid" />
        <div className="preview-positioner" style={{ transform: `translateX(${previewShift}px)` }}>
          <CalculatorPreview design={design} memory={memory} onAction={runKey} />
        </div>
        <div
          className="preview-marker pointer-events-none absolute bottom-[18px] left-1/2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/40 mix-blend-difference"
          style={{ transform: `translateX(calc(-50% + ${previewShift}px))` }}
        >
          live preview
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<CalculatorBuilder />} />
        <Route path="/developer" element={<DeveloperArticle />} />
        <Route path="/blog/react-router-migration" element={<RouterMigrationArticle />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
