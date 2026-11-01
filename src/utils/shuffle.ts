/**
 * Pure Fisher-Yates shuffle algorithm.
 * Guarantees zero mutation of source array.
 */
export function pureShuffle<T>(array: readonly T[]): T[] {
  const clone = [...array];
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

/**
 * Retrieves or generates a randomized order that remains stable throughout
 * an active browser visit / session, but randomizes anew on each fresh session.
 *
 * Preserves the source data and uses unique IDs to map back to objects,
 * guaranteeing every item keeps its full identity and content.
 */
export function getSessionShuffled<T extends { id: string }>(
  items: readonly T[],
  sessionStorageKey = 'vaibhev_notebook_session_order'
): T[] {
  if (typeof window === 'undefined') {
    return pureShuffle(items);
  }

  try {
    const stored = window.sessionStorage.getItem(sessionStorageKey);
    if (stored) {
      const orderIds: string[] = JSON.parse(stored);
      if (Array.isArray(orderIds) && orderIds.length === items.length) {
        const itemMap = new Map<string, T>(items.map((item) => [item.id, item]));
        const reconstructed: T[] = [];
        let allFound = true;

        for (const id of orderIds) {
          const found = itemMap.get(id);
          if (found) {
            reconstructed.push(found);
          } else {
            allFound = false;
            break;
          }
        }

        if (allFound && reconstructed.length === items.length) {
          return reconstructed;
        }
      }
    }
  } catch (err) {
    // SessionStorage may be disabled in restricted modes; fall back safely
    console.warn('[SessionStorage] Shuffled order fallback to memory:', err);
  }

  // Generate fresh shuffle
  const shuffled = pureShuffle(items);

  try {
    const idSequence = shuffled.map((item) => item.id);
    window.sessionStorage.setItem(sessionStorageKey, JSON.stringify(idSequence));
  } catch (err) {
    console.warn('[SessionStorage] Could not persist session order:', err);
  }

  return shuffled;
}

/**
 * Resets the session shuffle cache to generate a new random sequence.
 */
export function resetSessionShuffle(sessionStorageKey = 'vaibhev_notebook_session_order'): void {
  if (typeof window !== 'undefined') {
    try {
      window.sessionStorage.removeItem(sessionStorageKey);
    } catch {
      // Ignore
    }
  }
}
