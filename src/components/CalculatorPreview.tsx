import { useMemo, type CSSProperties } from "react";

import { FONT_STACKS } from "@/config/design";
import { KEYS } from "@/config/keys";
import { formatNumber } from "@/lib/calculator";
import { cn } from "@/lib/utils";
import { useTheme } from "@/theme/ThemeProvider";
import type { CalcMemory, CalculatorKey, CalculatorVars } from "@/types";

interface CalculatorPreviewProps {
  memory: CalcMemory;
  onAction: (key: CalculatorKey) => void;
}

/** Renders the live calculator, driven entirely by CSS variables from the active theme. */
export function CalculatorPreview({ memory, onAction }: CalculatorPreviewProps) {
  const { design } = useTheme();
  const displayItems = design.align === "left" ? "flex-start" : design.align === "center" ? "center" : "flex-end";
  const isCircle = design.shape === "Circle";

  const vars = useMemo<CalculatorVars>(
    () => ({
      "--body-bg": design.bodyBg,
      "--display-bg": design.displayBg,
      "--display-text": design.displayText,
      "--digit-bg": design.digitBg,
      "--digit-text": design.digitText,
      "--op-bg": design.opBg,
      "--op-text": design.opText,
      "--op-border": design.borderW > 0 ? design.opBorder : "transparent",
      "--fn-bg": design.fnBg,
      "--fn-text": design.fnText,
      "--eq-bg": design.eqBg,
      "--eq-text": design.eqText,
      "--border-col": design.borderCol,
      "--display-size": `${design.displaySize}px`,
      "--btn-size": `${design.btnSize}px`,
      "--btn-weight": design.btnWeight,
      "--body-r": `${design.bodyRadius}px`,
      "--btn-r": isCircle ? "50%" : `${design.btnRadius}px`,
      "--gap": `${design.gap}px`,
      "--body-pad": `${design.bodyPad}px`,
      "--display-h": `${design.displayH}px`,
      "--btn-pad": `${design.btnPad}px`,
      "--border-w": `${design.borderW}px`,
      "--calc-w": `${design.calcW}px`,
      "--calc-font": FONT_STACKS[design.font],
      "--display-align": design.align,
      "--display-items": displayItems,
    }),
    [design, displayItems, isCircle],
  );

  return (
    <div
      className="calculator-shell relative z-[1]"
      data-shadow={design.shadow}
      data-press={design.press}
      data-circle={isCircle ? "1" : "0"}
      style={vars}
    >
      <div className={cn("display-panel", design.blurDisplay && "blur")}>
        {design.showExpr ? <div className="display-expression">{memory.exprText}</div> : null}
        <div className="display-main">{formatNumber(memory.cur, design.separators)}</div>
      </div>
      <div className="grid grid-cols-4 gap-[var(--gap)]">
        {KEYS.map((key) => {
          const style: CSSProperties = {};
          if (key.id === "zero" && design.zeroDouble) style.gridColumn = "span 2";
          if (key.id === "eq" && !design.zeroDouble) style.gridColumn = "span 2";
          return (
            <button
              key={`${key.label}-${key.action}`}
              type="button"
              data-key-type={key.type}
              className={cn("calculator-button", `calculator-button-${key.type}`)}
              style={style}
              onClick={() => onAction(key)}
            >
              {key.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
