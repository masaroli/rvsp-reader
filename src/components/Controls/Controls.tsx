import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { READER_CONFIG } from "../../utils/constants";
import { clamp } from "../../utils/reader";
import styles from "./Controls.module.css";

interface Props {
    wpm: number;
    onWpmChange: (v: number) => void;
    onStart: () => void;
    onRewind: () => void;
}

export function Controls({ wpm, onWpmChange, onStart, onRewind }: Props) {
    const { t } = useTranslation("reader");

    // Use local string state to allow free typing (e.g. deleting all digits)
    const [inputValue, setInputValue] = useState(wpm.toString());

    // Sync local state when wpm prop changes from outside (e.g. initial load)
    useEffect(() => {
        setInputValue(wpm.toString());
    }, [wpm]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);

        // If it's a valid number, we notify the parent immediately for responsiveness,
        // but we DON'T clamp yet so the user can continue typing.
        const num = parseInt(val, 10);
        if (!isNaN(num)) {
            // Only update parent if it's within a reasonable range or we're fine with temporary "invalid" states
            onWpmChange(num);
        }
    };

    const handleBlur = () => {
        // Apply strict clamping and formatting only when the user is done typing
        const num = parseInt(inputValue, 10);
        const clamped = isNaN(num)
            ? READER_CONFIG.defaultWpm
            : clamp(num, READER_CONFIG.minWpm, READER_CONFIG.maxWpm);

        onWpmChange(clamped);
        setInputValue(clamped.toString());
    };

    return (
        <div className={styles.controls}>
            <div className={styles.row}>
                <button
                    className={styles.btnPrimary}
                    onClick={onStart}
                    aria-label={t("startButton")}
                >
                    {t("startButton")}
                </button>
                <div className={styles.inputGroup}>
                    <span className={styles.wpmLabel}>{t("wpmLabel")}</span>
                    <input
                        type="number"
                        className={styles.wpmInput}
                        value={inputValue}
                        min={READER_CONFIG.minWpm}
                        max={READER_CONFIG.maxWpm}
                        step={READER_CONFIG.wpmStep}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={(e) => e.key === "Enter" && handleBlur()}
                        aria-label={t("wpmLabel")}
                    />
                </div>

                <button
                    className={styles.btnSecondary}
                    onClick={onRewind}
                    aria-label={t("rewindButton")}
                >
                    {t("rewindButton")}
                </button>
            </div>
        </div>
    );
}
