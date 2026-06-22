/**
 * Pure calculator engine. Holds no React state — given the current memory
 * and a key press it returns the next memory, which makes the arithmetic
 * easy to reason about and test in isolation.
 */
import { SYMBOLS } from "@/config/keys";
import type { CalcMemory, CalculatorKey } from "@/types";

export const INITIAL_CALC: CalcMemory = {
  cur: "0",
  prev: null,
  op: null,
  fresh: true,
  exprText: "",
};

/** Format a numeric string for display, optionally grouping thousands. */
export function formatNumber(value: string, separators: boolean): string {
  if (value === "Error") return value;
  const negative = value.startsWith("-");
  const unsigned = negative ? value.slice(1) : value;
  const [integer = "0", decimal = ""] = unsigned.split(".");
  const grouped = separators ? integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : integer;
  const output = grouped + (unsigned.includes(".") ? `.${decimal}` : "");
  return `${negative ? "-" : ""}${output}`;
}

/** Collapse floating-point noise and surface non-finite results as "Error". */
export function cleanNumber(value: number): string {
  if (!Number.isFinite(value)) return "Error";
  return String(Number(value.toPrecision(12)));
}

/** Apply the pending operator to the stored operands. */
export function compute(memory: CalcMemory): CalcMemory {
  if (memory.op === null || memory.prev === null) return memory;

  const left = memory.prev;
  const right = Number.parseFloat(memory.cur);
  let result = 0;

  switch (memory.op) {
    case "+":
      result = left + right;
      break;
    case "-":
      result = left - right;
      break;
    case "*":
      result = left * right;
      break;
    case "/":
      result = right === 0 ? Number.NaN : left / right;
      break;
  }

  const cur = cleanNumber(result);
  return {
    ...memory,
    cur,
    prev: cur === "Error" ? null : Number.parseFloat(cur),
    op: null,
  };
}

/** Reduce a key press against the current memory into the next memory. */
export function applyCalculatorAction(memory: CalcMemory, key: CalculatorKey, separators: boolean): CalcMemory {
  let next: CalcMemory = { ...memory };

  switch (key.action) {
    case "num":
      if (next.cur === "Error") {
        next.cur = "0";
        next.fresh = true;
      }
      if (next.fresh) {
        next.cur = key.label;
        next.fresh = false;
      } else {
        next.cur = next.cur === "0" ? key.label : next.cur + key.label;
      }
      break;
    case "dot":
      if (next.fresh) {
        next.cur = "0.";
        next.fresh = false;
      } else if (!next.cur.includes(".")) {
        next.cur += ".";
      }
      break;
    case "clear":
      next = INITIAL_CALC;
      break;
    case "sign":
      if (next.cur !== "0" && next.cur !== "Error") {
        next.cur = next.cur.startsWith("-") ? next.cur.slice(1) : `-${next.cur}`;
      }
      break;
    case "percent":
      next.cur = cleanNumber(Number.parseFloat(next.cur) / 100);
      next.fresh = true;
      break;
    case "op":
      if (!key.value) break;
      if (next.op !== null && !next.fresh) {
        next = compute(next);
      } else {
        next.prev = Number.parseFloat(next.cur);
      }
      next.op = key.value;
      next.fresh = true;
      next.exprText = `${formatNumber(cleanNumber(next.prev ?? 0), separators)} ${SYMBOLS[key.value]}`;
      break;
    case "equals":
      if (next.op !== null) {
        const op = next.op;
        next.exprText = `${formatNumber(cleanNumber(next.prev ?? 0), separators)} ${SYMBOLS[op]} ${formatNumber(
          next.cur,
          separators,
        )} =`;
        next = compute(next);
        next.fresh = true;
      }
      break;
  }

  return next;
}
