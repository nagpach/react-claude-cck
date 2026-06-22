import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface SegmentControlProps<T extends string> {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}

/** A labelled, single-select segmented button group. */
export function SegmentControl<T extends string>({ label, value, options, onChange }: SegmentControlProps<T>) {
  return (
    <div className="mb-3.5">
      <div className="mb-2 flex items-baseline justify-between">
        <Label>{label}</Label>
      </div>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(nextValue) => {
          if (nextValue) onChange(nextValue as T);
        }}
      >
        {options.map((option) => (
          <ToggleGroupItem key={option} value={option} className="min-w-0 flex-1 whitespace-nowrap">
            {option}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
