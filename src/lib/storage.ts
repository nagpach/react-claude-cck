/** Best-effort persistence of the design to localStorage. */
import { DEFAULTS, type CalculatorDesign } from "@/config/design";

const STORAGE_KEY = "cck_state";

/** Load a saved design, merged over defaults; falls back to defaults on any error. */
export function loadDesign(): CalculatorDesign {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? { ...DEFAULTS, ...parsed } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

/** Persist the design. Storage is optional, so failures are swallowed. */
export function saveDesign(design: CalculatorDesign): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(design));
  } catch {
    // Persistence is optional; the app remains fully usable without storage.
  }
}
