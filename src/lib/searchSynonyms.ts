// Client-side synonym map for shop search.
// Keys are typed query terms, values are tokens to also match against product titles.
export const SEARCH_SYNONYMS: Record<string, string[]> = {
  storage: ["dox", "lux", "case", "tray"],
  case: ["dox", "lux"],
  box: ["dox", "lux"],
  discreet: ["dox", "lux", "storage"],
  biometric: ["dox", "lux"],
  lock: ["dox", "lux"],
  wellness: ["vellvii"],
  vibrator: ["g-vibe", "pulse", "evolve"],
  vibe: ["g-vibe", "pulse", "evolve"],
  couples: ["pulse", "evolve"],
  rose: ["evolve", "pulse"],
  toy: ["pulse", "evolve", "g-vibe"],
  dox: ["dox"],
  lux: ["lux"],
};

/**
 * Expand a raw query into a list of candidate tokens to match against.
 * Always includes the original query as the highest-priority token.
 */
export const expandQuery = (raw: string): string[] => {
  const q = raw.trim().toLowerCase();
  if (!q) return [];
  const tokens = new Set<string>([q]);
  for (const word of q.split(/\s+/)) {
    if (SEARCH_SYNONYMS[word]) {
      for (const syn of SEARCH_SYNONYMS[word]) tokens.add(syn);
    }
  }
  return Array.from(tokens);
};
