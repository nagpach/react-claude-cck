import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SwitchControlProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

/** A labelled on/off toggle row. */
export function SwitchControl({ id, label, checked, onChange }: SwitchControlProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-[7px]">
      <Label htmlFor={id}>{label}</Label>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
