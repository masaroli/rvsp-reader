// ─── LanguageSwitcher Component ───────────────────────────────────────────────
import { useTranslation } from "react-i18next";
import type { SupportedLocale } from "../../types/i18n";
import styles from "./LanguageSwitcher.module.css";

const LOCALES: SupportedLocale[] = ["en", "es"];

export function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const current = i18n.language.slice(0, 2) as SupportedLocale;

    return (
        <nav className={styles.switcher} aria-label="Language switcher">
            {LOCALES.map((locale) => (
                <button
                    key={locale}
                    className={`${styles.btn} ${current === locale ? styles.active : ""}`}
                    onClick={() => void i18n.changeLanguage(locale)}
                    aria-pressed={current === locale}
                >
                    {locale}
                </button>
            ))}
        </nav>
    );
}
