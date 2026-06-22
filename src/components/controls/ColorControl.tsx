import { Label } from "@/components/ui/label";
import type { ColorKey } from "@/config/design";

interface ColorControlProps {
  field: { key: ColorKey; label: string };
  value: string;
  onChange: (value: string) => void;
}

/** A native color swatch paired with a label. */
export function ColorControl({ field, value, onChange }: ColorControlProps) {
  const id = `color-${field.key}`;
  return (
    <div className="flex min-w-0 items-center gap-[9px]">
      <div className="relative h-[30px] w-[30px] shrink-0 overflow-hidden rounded-lg border border-black/10">
        <input
          id={id}
          type="color"
          value={value}
          aria-label={field.label}
          className="color-input absolute -inset-1.5 h-[150%] w-[150%] cursor-pointer"
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
      <Label htmlFor={id} className="min-w-0 flex-1 truncate text-xs font-normal">
        {field.label}
      </Label>
    </div>
  );
}
