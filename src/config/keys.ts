/** The calculator keypad layout and operator glyph mapping. */
import type { Operator } from "@/config/design";
import type { CalculatorKey } from "@/types";

export const KEYS: readonly CalculatorKey[] = [
  { label: "AC", type: "fn", action: "clear" },
  { label: "±", type: "fn", action: "sign" },
  { label: "%", type: "fn", action: "percent" },
  { label: "÷", type: "op", action: "op", value: "/" },
  { label: "7", type: "digit", action: "num" },
  { label: "8", type: "digit", action: "num" },
  { label: "9", type: "digit", action: "num" },
  { label: "×", type: "op", action: "op", value: "*" },
  { label: "4", type: "digit", action: "num" },
  { label: "5", type: "digit", action: "num" },
  { label: "6", type: "digit", action: "num" },
  { label: "−", type: "op", action: "op", value: "-" },
  { label: "1", type: "digit", action: "num" },
  { label: "2", type: "digit", action: "num" },
  { label: "3", type: "digit", action: "num" },
  { label: "+", type: "op", action: "op", value: "+" },
  { label: "0", type: "digit", action: "num", id: "zero" },
  { label: ".", type: "digit", action: "dot" },
  { label: "=", type: "eq", action: "equals", id: "eq" },
];

export const SYMBOLS: Record<Operator, string> = {
  "/": "÷",
  "*": "×",
  "-": "−",
  "+": "+",
};
