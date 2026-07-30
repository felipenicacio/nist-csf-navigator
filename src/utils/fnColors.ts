import { csfFunctions } from '../data/functions';

/**
 * Single source of truth for Function colors.
 * All pages must use these helpers instead of hardcoded color maps.
 *
 * colorHex , official NIST wheel fill (used on badges/cards backgrounds)
 * color    , darker shade for text on light backgrounds
 * colorLight, light tint for card/section backgrounds
 */

export const getFnById = (id: string) =>
  csfFunctions.find(f => f.id === id);

/** Returns { bg: colorHex, light: colorLight, text: color } by Function ID (GV, ID, PR…) */
export const getFnColors = (id: string) => {
  const fn = csfFunctions.find(f => f.id === id);
  return {
    bg: fn?.colorHex ?? '#E2E8F0',
    light: fn?.colorLight ?? '#F8FAFC',
    text: fn?.color ?? '#334155',
  };
};

/**
 * Resolves Function ID from a CSF code like "GV.SC-01", "ID.RA", "PR" etc.
 * Works for Function IDs, Category codes and Subcategory codes.
 */
export const getFnColorsFromCode = (code: string) => {
  const id = code.split('.')[0].toUpperCase();
  return getFnColors(id);
};

/** Map of Function name (full uppercase) to Function ID, for pages that key by name */
export const fnNameToId: Record<string, string> = {
  GOVERN: 'GV',
  IDENTIFY: 'ID',
  PROTECT: 'PR',
  DETECT: 'DE',
  RESPOND: 'RS',
  RECOVER: 'RC',
};

/** Returns colors keyed by full Function name (GOVERN, IDENTIFY…) */
export const getFnColorsByName = (name: string) =>
  getFnColors(fnNameToId[name.toUpperCase()] ?? name.substring(0, 2).toUpperCase());
