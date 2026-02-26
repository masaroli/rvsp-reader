// ─── TextInput Component ──────────────────────────────────────────────────────
import { useTranslation } from "react-i18next";
import styles from "./TextInput.module.css";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export function TextInput({ value, onChange }: Props) {
    const { t } = useTranslation("reader");

    return (
        <textarea
            className={styles.textarea}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={t("placeholder")}
            aria-label={t("placeholder")}
            spellCheck={false}
        />
    );
}
