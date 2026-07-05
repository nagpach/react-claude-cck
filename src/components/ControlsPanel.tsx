import { createPortal } from "react-dom";
import { BookOpen, RotateCcw, Shuffle, SlidersHorizontal, X } from "lucide-react";
import { Link } from "react-router-dom";

import { ColorControl } from "@/components/controls/ColorControl";
import { PanelSection } from "@/components/controls/PanelSection";
import { SegmentControl } from "@/components/controls/SegmentControl";
import { SliderControl } from "@/components/controls/SliderControl";
import { SwitchControl } from "@/components/controls/SwitchControl";
import { Button } from "@/components/ui/button";
import { ALIGNS, FONT_NAMES, PRESET_NAMES, PRESSES, SHADOWS, SHAPE_NAMES } from "@/config/design";
import { COLOR_FIELDS, SHAPE_SLIDERS, TYPE_SLIDERS } from "@/config/controls";
import { PRESETS } from "@/config/presets";
import { cn } from "@/lib/utils";
import { useTheme } from "@/theme/ThemeProvider";

interface ControlsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * The full design controls sidebar. Rendered into a portal so it can float
 * above the page on small screens and dock beside it on large screens. Reads
 * and mutates the active theme through the ThemeProvider context.
 */
export function ControlsPanel({ open, onOpenChange }: ControlsPanelProps) {
  const { design, updateField, applyPreset, chooseShape, reset, randomize } = useTheme();
  const panel = open ? (
    <aside className="panel fixed inset-x-0 top-0 z-50 flex max-h-[50vh] min-h-0 flex-col overflow-y-auto overflow-x-hidden border-b border-chrome-line bg-chrome-panel shadow-[0_18px_45px_-30px_rgba(0,0,0,.45)] md:inset-y-0 md:left-0 md:right-auto md:max-h-none md:w-[392px] md:border-b-0 md:border-r md:shadow-none">
      <div className="sticky top-0 z-[5] border-b border-chrome-line bg-chrome-panel px-6 pb-4 pt-[22px]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[12px] text-chrome-mute">Construction Kit</div>
            <h1 className="mt-0.5 text-[19px] font-semibold tracking-tight">Calculator</h1>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Close controls"
            title="Close controls"
            className="h-8 w-8 shrink-0"
            onClick={() => onOpenChange(false)}
          >
            <X />
          </Button>
        </div>
        <div className="mt-3.5 flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="h-auto flex-1 px-2.5 py-[9px] text-[13px] active:translate-y-px"
            onClick={randomize}
          >
            <Shuffle />
            Randomize
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-auto flex-1 px-2.5 py-[9px] text-[13px] active:translate-y-px"
            onClick={reset}
          >
            <RotateCcw />
            Reset
          </Button>
        </div>
        <Button
          asChild
          variant="ghost"
          className="mt-2 h-auto w-full justify-start px-2.5 py-[8px] text-[13px] text-chrome-mute"
        >
          <Link to="/developer">
            <BookOpen />
            Build notes
          </Link>
        </Button>
      </div>

      <div className="px-6 pb-[60px] pt-1.5">
        <PanelSection title="Presets">
          <div className="grid grid-cols-3 gap-2">
            {PRESET_NAMES.map((name) => {
              const selected = design._preset === name;
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={selected}
                  className={cn(
                    "rounded-[10px] border bg-white p-2 text-left transition hover:border-[#b9b5ab] active:translate-y-px",
                    selected ? "border-chrome-accent ring-1 ring-chrome-accent" : "border-chrome-line",
                  )}
                  onClick={() => applyPreset(name)}
                >
                  <span className="mb-[7px] flex gap-[3px]">
                    {PRESETS[name].swatch.map((color, index) => (
                      <span key={`${name}-${index}`} className="h-4 w-full rounded-[4px]" style={{ background: color }} />
                    ))}
                  </span>
                  <b className="block truncate text-[11px] font-medium tracking-tight">{name}</b>
                </button>
              );
            })}
          </div>
        </PanelSection>

        <PanelSection title="Colors">
          <div className="grid grid-cols-2 gap-x-3 gap-y-[9px]">
            {COLOR_FIELDS.map((field) => (
              <ColorControl
                key={field.key}
                field={field}
                value={design[field.key]}
                onChange={(value) => updateField(field.key, value)}
              />
            ))}
          </div>
        </PanelSection>

        <PanelSection title="Typography">
          <SegmentControl label="Font" value={design.font} options={FONT_NAMES} onChange={(value) => updateField("font", value)} />
          {TYPE_SLIDERS.map((spec) => (
            <SliderControl
              key={spec.key}
              spec={spec}
              value={design[spec.key]}
              onChange={(value) => updateField(spec.key, value)}
            />
          ))}
          <SegmentControl
            label="Display align"
            value={design.align}
            options={ALIGNS}
            onChange={(value) => updateField("align", value)}
          />
        </PanelSection>

        <PanelSection title="Shape & Layout">
          <SegmentControl label="Button shape" value={design.shape} options={SHAPE_NAMES} onChange={chooseShape} />
          {SHAPE_SLIDERS.map((spec) => (
            <SliderControl
              key={spec.key}
              spec={spec}
              value={design[spec.key]}
              onChange={(value) => updateField(spec.key, value)}
            />
          ))}
        </PanelSection>

        <PanelSection title="Effects">
          <SegmentControl label="Shadow" value={design.shadow} options={SHADOWS} onChange={(value) => updateField("shadow", value)} />
          <SegmentControl label="Press" value={design.press} options={PRESSES} onChange={(value) => updateField("press", value)} />
          <ColorControl
            field={{ key: "borderCol", label: "Border color" }}
            value={design.borderCol}
            onChange={(value) => updateField("borderCol", value)}
          />
        </PanelSection>

        <PanelSection title="Structure">
          <SwitchControl
            id="zero-double"
            label="Double-width zero"
            checked={design.zeroDouble}
            onChange={(checked) => updateField("zeroDouble", checked)}
          />
          <SwitchControl
            id="show-expression"
            label="Show expression line"
            checked={design.showExpr}
            onChange={(checked) => updateField("showExpr", checked)}
          />
          <SwitchControl
            id="thousands-separators"
            label="Thousands separators"
            checked={design.separators}
            onChange={(checked) => updateField("separators", checked)}
          />
          <SwitchControl
            id="blur-display"
            label="Blur display"
            checked={design.blurDisplay}
            onChange={(checked) => updateField("blurDisplay", checked)}
          />
        </PanelSection>
      </div>
    </aside>
  ) : (
    <Button
      type="button"
      className="fixed left-4 top-4 z-50 h-auto px-3 py-2 font-mono text-[11px] uppercase tracking-[0.04em] shadow-[0_16px_30px_-22px_rgba(0,0,0,.65)] sm:left-5 sm:top-5"
      aria-label="Open controls"
      title="Open controls"
      onClick={() => onOpenChange(true)}
    >
      <SlidersHorizontal />
      Controls
    </Button>
  );

  return createPortal(panel, document.body);
}
