/**
 * Lightweight session-scoped memory of the last collection a user came from,
 * so the PDP "Back to Collection" link can return them to the right place
 * (and not always to /shop). Uses sessionStorage so it resets per tab.
 */
const KEY = "vellvii:lastCollection";

export interface CollectionContext {
  href: string;
  label: string;
}

export const setLastCollection = (ctx: CollectionContext) => {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(ctx));
  } catch {
    // ignore (private mode, quota, etc.)
  }
};

export const getLastCollection = (): CollectionContext | null => {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.href === "string" && typeof parsed.label === "string") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
};

export const clearLastCollection = () => {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // ignore
  }
};
