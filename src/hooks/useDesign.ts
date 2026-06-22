import { useCallback, useEffect, useState } from "react";

import {
  DEFAULTS,
  SHAPE_RADIUS,
  type CalculatorDesign,
  type PresetName,
  type ShapeName,
} from "@/config/design";
import { PRESETS } from "@/config/presets";
import { randomDesign } from "@/lib/random";
import { loadDesign, saveDesign } from "@/lib/storage";

export interface UseDesignResult {
  design: CalculatorDesign;
  updateField: <K extends keyof CalculatorDesign>(key: K, value: CalculatorDesign[K]) => void;
  applyPreset: (name: PresetName) => void;
  chooseShape: (shape: ShapeName) => void;
  reset: () => void;
  randomize: () => void;
}

/**
 * Owns the calculator design state and the operations that mutate it,
 * persisting every change to localStorage.
 */
export function useDesign(): UseDesignResult {
  const [design, setDesign] = useState<CalculatorDesign>(loadDesign);

  useEffect(() => {
    saveDesign(design);
  }, [design]);

  const updateField = useCallback(
    <K extends keyof CalculatorDesign>(key: K, value: CalculatorDesign[K]) => {
      setDesign((current) => ({ ...current, [key]: value, _preset: null }));
    },
    [],
  );

  const applyPreset = useCallback((name: PresetName) => {
    const preset = PRESETS[name];
    setDesign({
      ...DEFAULTS,
      ...preset.values,
      displaySize: preset.values.displaySize ?? DEFAULTS.displaySize,
      _preset: name,
    });
  }, []);

  const chooseShape = useCallback((shape: ShapeName) => {
    setDesign((current) => ({
      ...current,
      shape,
      btnRadius: shape !== "Circle" && SHAPE_RADIUS[shape] !== 999 ? SHAPE_RADIUS[shape] : current.btnRadius,
      _preset: null,
    }));
  }, []);

  const reset = useCallback(() => setDesign(DEFAULTS), []);
  const randomize = useCallback(() => setDesign((current) => randomDesign(current)), []);

  return { design, updateField, applyPreset, chooseShape, reset, randomize };
}
