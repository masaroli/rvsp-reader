// ─── Reader State & Config Types ─────────────────────────────────────────────

export interface ReaderState {
    words: string[];
    currentIdx: number;
    isActive: boolean;
    lastText: string;
    wpm: number;
}

export interface ReaderConfig {
    defaultWpm: number;
    minWpm: number;
    maxWpm: number;
    wpmStep: number;
    rewindSeconds: number;
    focusCrosshairPercent: number; // e.g. 0.35 = 35% from left
}

export type ReadingStatus = "idle" | "playing" | "paused";

export interface FocusIndexMap {
    maxLength: number;
    focusIndex: number;
}
