/** Declarative descriptors that drive the controls panel UI. */
import type { ColorKey } from "@/config/design";
import type { SliderSpec } from "@/types";

export const COLOR_FIELDS: readonly { key: ColorKey; label: string }[] = [
  { key: "stageBg", label: "Stage" },
  { key: "bodyBg", label: "Body" },
  { key: "displayBg", label: "Display" },
  { key: "displayText", label: "Display text" },
  { key: "digitBg", label: "Digits" },
  { key: "digitText", label: "Digit text" },
  { key: "opBg", label: "Operators" },
  { key: "opText", label: "Operator text" },
  { key: "fnBg", label: "Functions" },
  { key: "fnText", label: "Function text" },
  { key: "eqBg", label: "Equals" },
  { key: "eqText", label: "Equals text" },
];

export const TYPE_SLIDERS: readonly SliderSpec[] = [
  { key: "displaySize", label: "Display size", unit: "px", min: 24, max: 84, step: 1 },
  { key: "btnSize", label: "Button size", unit: "px", min: 13, max: 40, step: 1 },
  { key: "btnWeight", label: "Button weight", unit: "", min: 300, max: 800, step: 100 },
];

export const SHAPE_SLIDERS: readonly SliderSpec[] = [
  { key: "calcW", label: "Calculator width", unit: "px", min: 250, max: 440, step: 2 },
  { key: "bodyRadius", label: "Body radius", unit: "px", min: 0, max: 56, step: 1 },
  { key: "btnRadius", label: "Button radius", unit: "px", min: 0, max: 44, step: 1 },
  { key: "gap", label: "Button gap", unit: "px", min: 2, max: 22, step: 1 },
  { key: "bodyPad", label: "Body padding", unit: "px", min: 6, max: 40, step: 1 },
  { key: "displayH", label: "Display height", unit: "px", min: 60, max: 220, step: 2 },
  { key: "btnPad", label: "Button height", unit: "px", min: 8, max: 40, step: 1 },
  { key: "borderW", label: "Border width", unit: "px", min: 0, max: 6, step: 1 },
];
