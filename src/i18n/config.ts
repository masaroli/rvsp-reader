// ─── i18n Config ─────────────────────────────────────────────────────────────
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enReader from "./locales/en/reader.json";
import esReader from "./locales/es/reader.json";

void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: import.meta.env.DEV,
        defaultNS: "reader",
        resources: {
            en: { reader: enReader },
            es: { reader: esReader },
        },
        interpolation: {
            escapeValue: false, // React already handles XSS
        },
        detection: {
            order: ["localStorage", "navigator"],
            caches: ["localStorage"],
        },
    });

export default i18n;
