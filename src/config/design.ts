/**
 * Core design model: the option vocabularies, the shape of a calculator
 * design, and the default values. Everything else in the app is configured
 * against the types declared here.
 */

export const FONT_NAMES = ["Sora", "Mono", "Grotesk", "Serif"] as const;
export const SHAPE_NAMES = ["Square", "Rounded", "Pill", "Circle"] as const;
export const SHADOWS = ["none", "soft", "hard", "neu", "glow"] as const;
export const PRESSES = ["none", "push", "sink", "pop"] as const;
export const ALIGNS = ["left", "center", "right"] as const;
export const PRESET_NAMES = ["Classic", "Midnight", "Neumorph", "Brutalist", "Candy", "Terminal"] as const;

export type FontName = (typeof FONT_NAMES)[number];
export type ShapeName = (typeof SHAPE_NAMES)[number];
export type ShadowName = (typeof SHADOWS)[number];
export type PressName = (typeof PRESSES)[number];
export type AlignName = (typeof ALIGNS)[number];
export type PresetName = (typeof PRESET_NAMES)[number];
export type Operator = "/" | "*" | "-" | "+";

export type ColorKey =
  | "stageBg"
  | "bodyBg"
  | "displayBg"
  | "displayText"
  | "digitBg"
  | "digitText"
  | "opBg"
  | "opText"
  | "fnBg"
  | "fnText"
  | "eqBg"
  | "eqText"
  | "borderCol";

export type NumberKey =
  | "displaySize"
  | "btnSize"
  | "btnWeight"
  | "bodyRadius"
  | "btnRadius"
  | "gap"
  | "bodyPad"
  | "displayH"
  | "btnPad"
  | "borderW"
  | "calcW";

export type ToggleKey = "zeroDouble" | "blurDisplay" | "showExpr" | "separators";

export interface CalculatorDesign {
  stageBg: string;
  bodyBg: string;
  displayBg: string;
  displayText: string;
  digitBg: string;
  digitText: string;
  opBg: string;
  opText: string;
  fnBg: string;
  fnText: string;
  eqBg: string;
  eqText: string;
  opBorder: string;
  borderCol: string;
  displaySize: number;
  btnSize: number;
  btnWeight: number;
  bodyRadius: number;
  btnRadius: number;
  gap: number;
  bodyPad: number;
  displayH: number;
  btnPad: number;
  borderW: number;
  calcW: number;
  font: FontName;
  shape: ShapeName;
  shadow: ShadowName;
  press: PressName;
  align: AlignName;
  zeroDouble: boolean;
  blurDisplay: boolean;
  showExpr: boolean;
  separators: boolean;
  _preset: PresetName | null;
}

export const DEFAULTS: CalculatorDesign = {
  stageBg: "#dcd9d2",
  bodyBg: "#ffffff",
  displayBg: "#f4f3f0",
  displayText: "#1a1916",
  digitBg: "#f1efea",
  digitText: "#1a1916",
  opBg: "#f08a3c",
  opText: "#ffffff",
  fnBg: "#e4e1da",
  fnText: "#1a1916",
  eqBg: "#f08a3c",
  eqText: "#ffffff",
  opBorder: "#f08a3c",
  borderCol: "#e2dfd8",
  displaySize: 54,
  btnSize: 23,
  btnWeight: 500,
  bodyRadius: 30,
  btnRadius: 18,
  gap: 10,
  bodyPad: 18,
  displayH: 118,
  btnPad: 18,
  borderW: 0,
  calcW: 330,
  font: "Sora",
  shape: "Rounded",
  shadow: "soft",
  press: "push",
  align: "right",
  zeroDouble: true,
  blurDisplay: false,
  showExpr: true,
  separators: true,
  _preset: "Classic",
};

export const FONT_STACKS: Record<FontName, string> = {
  Sora: "'Sora', system-ui, sans-serif",
  Mono: "'DM Mono', ui-monospace, monospace",
  Grotesk: "'Space Grotesk', sans-serif",
  Serif: "Georgia, 'Times New Roman', serif",
};

export const SHAPE_RADIUS: Record<ShapeName, number> = {
  Square: 4,
  Rounded: 18,
  Pill: 30,
  Circle: 999,
};
