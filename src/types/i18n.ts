// ─── i18n Namespace & Key Types ──────────────────────────────────────────────

export type SupportedLocale = "en" | "es";

export interface ReaderTranslations {
    placeholder: string;
    startButton: string;
    stopHint: string;
    rewindButton: string;
    wpmLabel: string;
    initialWord: string;
}

export interface AppTranslations {
    reader: ReaderTranslations;
}

// Augment react-i18next to get typed t() calls
declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "reader";
        resources: {
            reader: ReaderTranslations;
        };
    }
}
