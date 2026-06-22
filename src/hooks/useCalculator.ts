import { useCallback, useEffect, useState } from "react";

import type { Operator } from "@/config/design";
import { SYMBOLS } from "@/config/keys";
import { applyCalculatorAction, INITIAL_CALC } from "@/lib/calculator";
import type { CalcMemory, CalculatorKey } from "@/types";

const KEY_OPERATORS: Partial<Record<string, Operator>> = {
  "/": "/",
  "*": "*",
  "-": "-",
  "+": "+",
};

/** True when focus is in a field that should receive keystrokes itself. */
function isEditableTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  return el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
}

export interface UseCalculatorResult {
  memory: CalcMemory;
  runKey: (key: CalculatorKey) => void;
}

/**
 * Owns the calculator's arithmetic state, wiring both on-screen key presses
 * and physical keyboard input through the same pure engine.
 */
export function useCalculator(separators: boolean): UseCalculatorResult {
  const [memory, setMemory] = useState<CalcMemory>(INITIAL_CALC);

  const runKey = useCallback(
    (key: CalculatorKey) => {
      setMemory((current) => applyCalculatorAction(current, key, separators));
    },
    [separators],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return;

      const operator = KEY_OPERATORS[event.key];

      if (event.key >= "0" && event.key <= "9") {
        runKey({ label: event.key, type: "digit", action: "num" });
      } else if (event.key === ".") {
        runKey({ label: ".", type: "digit", action: "dot" });
      } else if (operator) {
        runKey({ label: SYMBOLS[operator], type: "op", action: "op", value: operator });
      } else if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        runKey({ label: "=", type: "eq", action: "equals" });
      } else if (event.key === "Escape") {
        runKey({ label: "AC", type: "fn", action: "clear" });
      } else if (event.key === "Backspace") {
        event.preventDefault();
        setMemory((current) => {
          if (current.fresh || current.cur === "Error") return current;
          const cur =
            current.cur.length <= 1 || (current.cur.length === 2 && current.cur.startsWith("-"))
              ? "0"
              : current.cur.slice(0, -1);
          return { ...current, cur, fresh: cur === "0" };
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [runKey]);

  return { memory, runKey };
}
