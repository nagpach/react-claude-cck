import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { SliderSpec } from "@/types";

interface SliderControlProps {
  spec: SliderSpec;
  value: number;
  onChange: (value: number) => void;
}

/** A labelled numeric slider with a live value readout. */
export function SliderControl({ spec, value, onChange }: SliderControlProps) {
  return (
    <div className="mb-3.5">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <Label>{spec.label}</Label>
        <em className="font-mono text-[11px] not-italic text-chrome-mute">
          {value}
          {spec.unit}
        </em>
      </div>
      <Slider
        aria-label={spec.label}
        min={spec.min}
        max={spec.max}
        step={spec.step}
        value={[value]}
        onValueChange={([nextValue]) => onChange(nextValue ?? value)}
      />
    </div>
  );
}
