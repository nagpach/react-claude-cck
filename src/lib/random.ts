/** Generates a coherent random calculator design from a color seed. */
import {
  ALIGNS,
  FONT_NAMES,
  SHADOWS,
  SHAPE_NAMES,
  SHAPE_RADIUS,
  type CalculatorDesign,
} from "@/config/design";

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(items: readonly T[]): T {
  return items[rand(0, items.length - 1)]!;
}

function hslToHex(hue: number, saturation: number, lightness: number): string {
  const s = saturation / 100;
  const l = lightness / 100;
  const k = (n: number) => (n + hue / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const color = l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Lightweight stand-in for an OKLCH→hex conversion. The arguments mirror the
 * OKLCH channel order (lightness, chroma, hue) so call sites read naturally,
 * even though the implementation maps onto HSL.
 */
function oklchHex(lightness: number, chroma: number, hue: number): string {
  return hslToHex(hue, chroma, lightness);
}

export function randomDesign(previous: CalculatorDesign): CalculatorDesign {
  const next = { ...previous };
  const dark = Math.random() < 0.45;
  const baseHue = rand(0, 360);
  const accentHue = (baseHue + pick([30, 150, 180, 210, 330])) % 360;
  const saturation = rand(40, 85);

  if (dark) {
    next.stageBg = oklchHex(rand(6, 12), rand(6, 18), baseHue);
    next.bodyBg = oklchHex(rand(10, 18), rand(6, 16), baseHue);
    next.displayBg = oklchHex(rand(6, 12), rand(4, 12), baseHue);
    next.displayText = oklchHex(rand(88, 96), rand(4, 14), accentHue);
    next.digitBg = oklchHex(rand(18, 28), rand(6, 16), baseHue);
    next.digitText = "#f3f1ec";
    next.fnBg = oklchHex(rand(26, 38), rand(6, 16), baseHue);
    next.fnText = "#f3f1ec";
    next.opBg = oklchHex(rand(50, 66), saturation, accentHue);
    next.opText = oklchHex(12, 8, accentHue);
    next.eqBg = oklchHex(rand(52, 66), saturation, accentHue);
    next.eqText = oklchHex(12, 8, accentHue);
    next.borderCol = oklchHex(rand(28, 40), 12, baseHue);
  } else {
    next.stageBg = oklchHex(rand(82, 90), rand(6, 18), baseHue);
    next.bodyBg = oklchHex(rand(95, 99), rand(2, 8), baseHue);
    next.displayBg = oklchHex(rand(92, 98), rand(3, 10), baseHue);
    next.displayText = oklchHex(rand(14, 24), rand(8, 20), baseHue);
    next.digitBg = oklchHex(rand(90, 96), rand(4, 12), baseHue);
    next.digitText = oklchHex(rand(16, 26), rand(6, 16), baseHue);
    next.fnBg = oklchHex(rand(82, 90), rand(6, 16), baseHue);
    next.fnText = oklchHex(rand(20, 30), rand(8, 18), baseHue);
    next.opBg = oklchHex(rand(58, 70), saturation, accentHue);
    next.opText = "#ffffff";
    next.eqBg = oklchHex(rand(56, 68), saturation, accentHue);
    next.eqText = "#ffffff";
    next.borderCol = oklchHex(rand(82, 90), 10, baseHue);
  }

  next.opBorder = next.opBg;
  next.font = pick(FONT_NAMES);
  next.shape = pick(SHAPE_NAMES);
  if (next.shape !== "Circle" && SHAPE_RADIUS[next.shape] !== 999) {
    next.btnRadius = SHAPE_RADIUS[next.shape];
  }
  next.shadow = pick(SHADOWS);
  next.press = pick(["push", "sink", "pop"] as const);
  next.align = pick(ALIGNS);
  next.gap = rand(4, 16);
  next.bodyRadius = rand(8, 44);
  next.bodyPad = rand(10, 28);
  next.displayH = rand(80, 180);
  next.btnPad = rand(12, 30);
  next.calcW = rand(290, 400);
  next.displaySize = rand(40, 68);
  next.btnSize = rand(18, 30);
  next.borderW = next.shadow === "hard" ? rand(2, 3) : pick([0, 0, 0, 1, 2]);
  next.zeroDouble = Math.random() < 0.6;
  next._preset = null;
  return next;
}
