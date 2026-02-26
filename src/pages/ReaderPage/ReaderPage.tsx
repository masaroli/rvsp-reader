// ─── ReaderPage ───────────────────────────────────────────────────────────────
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useReader } from "../../hooks/useReader";
import { WordDisplay } from "../../components/WordDisplay/WordDisplay";
import { TextInput } from "../../components/TextInput/TextInput";
import { Controls } from "../../components/Controls/Controls";
import { LanguageSwitcher } from "../../components/LanguageSwitcher/LanguageSwitcher";

import styles from "./ReaderPage.module.css";

const DEFAULT_TEXT_ES =
    "Hola, como estas? Si estas leyendo esto sin problemas te cuento que lo estas haciendo mucho mas rápido de lo que una persona promedio lee. El promedio de palabras por minuto de un adulto son 250 palabras por minuto y ahora estamos en 350 palabras. Esta técnica se llama lectura RVSP y puede ser muy util para leer textos livianos. Me inspiré en un video de tik-tok y se lo pedí a una IA que haga una web para pegar un texto, elegir la velocidad y usar esta técnica.";

const DEFAULT_TEXT_EN =
    "Hello, how are you? If you are reading this without any problems, I can tell you that you are reading much faster than the average person. The average word count per minute for an adult is 250 words per minute, and we are now at 350 words. This technique is called RVSP reading and can be very useful for reading light texts. I was inspired by a TikTok video and asked an AI to create a website where you can paste a text, choose the speed, and use this technique.";

export function ReaderPage() {
    const { t, i18n } = useTranslation("reader");
    const isSpanish = i18n.language.startsWith("es");

    const [inputText, setInputText] = useState(
        isSpanish ? DEFAULT_TEXT_ES : DEFAULT_TEXT_EN
    );

    const { words, currentIdx, isActive, wpm, setWpm, displayRef, containerRef, start, stop, rewind } =
        useReader();

    const handleStart = () => {
        start(inputText);
    };

    const progress =
        words.length > 0
            ? `${currentIdx} / ${words.length}`
            : null;

    return (
        <main className={styles.page}>
            <LanguageSwitcher />

            {/* Single grouped column — centered as a unit */}
            <div className={styles.readerColumn}>
                {/* The reader viewport — clicking stops playback */}
                <WordDisplay
                    containerRef={containerRef}
                    displayRef={displayRef}
                    onStop={stop}
                />

                {/* Controls + text input — hidden via GSAP during reading */}
                <div id="ui-wrapper" className={styles.uiWrapper}>
                    <TextInput value={inputText} onChange={setInputText} />

                    {progress && (
                        <p className={styles.progress} aria-live="polite">
                            {progress}
                        </p>
                    )}

                    <Controls
                        wpm={wpm}
                        onWpmChange={setWpm}
                        onStart={handleStart}
                        onRewind={rewind}
                    />
                </div>
            </div>

            {/* Stop hint — fades in via GSAP during reading */}
            <p id="stop-hint" className={styles.stopHint} aria-hidden={!isActive}>
                {t("stopHint")}
            </p>
        </main>
    );
}
