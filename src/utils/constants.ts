// ─── App-wide Constants ───────────────────────────────────────────────────────
import type { ReaderConfig } from "../types/reader";

export const READER_CONFIG: ReaderConfig = {
    defaultWpm: 350,
    minWpm: 50,
    maxWpm: 1000,
    wpmStep: 50,
    rewindSeconds: 5,
    focusCrosshairPercent: 0.35,
};
