// ─── Reader Utilities ─────────────────────────────────────────────────────────

/**
 * Returns the index of the "focus letter" within a word for the ORP
 * (Optimal Recognition Point) algorithm — same logic as the HTML draft.
 */
export function getFocusIndex(word: string): number {
    const length = word.length;
    if (length <= 1) return 0;
    if (length <= 5) return 1;
    if (length <= 9) return 2;
    return 3;
}

/**
 * Splits raw text into an array of words, filtering empty strings.
 */
export function tokenize(text: string): string[] {
    return text.trim().split(/\s+/).filter(Boolean);
}

/**
 * Calculates the delay (in seconds) between words based on WPM,
 * adding extra pause on punctuation boundaries.
 */
export function getWordDelay(word: string, wpm: number): number {
    const base = 60 / wpm;
    const hasPause = word.endsWith(".") || word.endsWith(",") || word.endsWith(";") || word.endsWith(":");
    return hasPause ? base * 2 : base;
}

/**
 * Given a WPM value and a number of seconds, returns how many words
 * correspond to that time window.
 */
export function wordsInDuration(wpm: number, seconds: number): number {
    return Math.ceil((wpm / 60) * seconds);
}

/**
 * Clamps a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}
