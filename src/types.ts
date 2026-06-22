/**
 * Shared structural types that aren't part of the design model itself:
 * the calculator's runtime state, control descriptors, and the typed
 * CSS-variable bag passed to the preview.
 */
import type { CSSProperties } from "react";

import type { NumberKey, Operator } from "@/config/design";

/** Live arithmetic state for the calculator engine. */
export interface CalcMemory {
  cur: string;
  prev: number | null;
  op: Operator | null;
  fresh: boolean;
  exprText: string;
}

/** Declarative description of a numeric slider control. */
export interface SliderSpec {
  key: NumberKey;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
}

/** A single button on the calculator keypad. */
export interface CalculatorKey {
  label: string;
  type: "digit" | "op" | "fn" | "eq";
  action: "clear" | "sign" | "percent" | "op" | "num" | "dot" | "equals";
  value?: Operator;
  id?: "zero" | "eq";
}

/** Inline style object extended with the calculator's custom properties. */
export type CalculatorVars = CSSProperties & Record<`--${string}`, string | number>;
