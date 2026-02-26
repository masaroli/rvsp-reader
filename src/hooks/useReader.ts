// ─── useReader hook ───────────────────────────────────────────────────────────
// Encapsulates all RSVP state & logic (ported from the HTML draft).

import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { getFocusIndex, getWordDelay, tokenize, wordsInDuration } from "../utils/reader";
import { READER_CONFIG } from "../utils/constants";

export interface UseReaderReturn {
    words: string[];
    currentIdx: number;
    isActive: boolean;
    wpm: number;
    setWpm: (v: number) => void;
    displayRef: React.RefObject<HTMLDivElement | null>;
    containerRef: React.RefObject<HTMLDivElement | null>;
    start: (text: string) => void;
    stop: () => void;
    rewind: () => void;
}

export function useReader(): UseReaderReturn {
    const [words, setWords] = useState<string[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [wpm, setWpm] = useState(READER_CONFIG.defaultWpm);

    // Internal mutable refs — not triggering re-renders
    const wordsRef = useRef<string[]>([]);
    const idxRef = useRef(0);
    const isActiveRef = useRef(false);
    const lastTextRef = useRef("");
    const focusTLRef = useRef<gsap.core.Timeline | null>(null);
    const delayedCallRef = useRef<gsap.core.Tween | null>(null);
    const wpmRef = useRef(wpm);

    const displayRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const syncWpm = useCallback((v: number) => {
        wpmRef.current = v;
        setWpm(v);
    }, []);

    // Stored in a ref so showNextWord can call it without a stale closure.
    const restoreUIRef = useRef<() => void>(() => { });

    const showNextWord = useCallback(() => {
        if (!isActiveRef.current || idxRef.current >= wordsRef.current.length) {
            // Reached the end naturally — restore the UI just like a manual stop
            isActiveRef.current = false;
            setIsActive(false);
            restoreUIRef.current();
            return;
        }

        const display = displayRef.current;
        const container = containerRef.current;
        if (!display || !container) return;

        const word = wordsRef.current[idxRef.current];

        // Render word
        display.textContent = word;

        // Highlight ORP focus letter
        const focusIdx = getFocusIndex(word);
        const chars = word.split("");
        display.innerHTML = chars
            .map((ch, i) =>
                i === focusIdx
                    ? `<span class="orp-focus">${ch}</span>`
                    : `<span>${ch}</span>`
            )
            .join("");

        // Position word so focus letter aligns with the crosshair
        const spans = display.querySelectorAll<HTMLSpanElement>("span");
        const focusSpan = spans[focusIdx];
        if (focusSpan) {
            const letterOffset = focusSpan.offsetLeft;
            const crosshair = container.offsetWidth * READER_CONFIG.focusCrosshairPercent;
            gsap.set(display, { x: crosshair - letterOffset });
        }

        const delay = getWordDelay(word, wpmRef.current);
        idxRef.current += 1;
        setCurrentIdx(idxRef.current);

        delayedCallRef.current = gsap.delayedCall(delay, showNextWord);
    }, []);

    // ── Shared: reverse the focus animation and restore the UI ────────────────
    const restoreUI = useCallback(() => {
        if (delayedCallRef.current) {
            delayedCallRef.current.kill();
        }
        if (focusTLRef.current) {
            gsap.killTweensOf(showNextWord);
            focusTLRef.current.reverse().then(() => {
                gsap.set([containerRef.current, "#ui-wrapper"], { clearProps: "all" });
            });
        }
    }, [showNextWord]);

    restoreUIRef.current = restoreUI;

    const start = useCallback(
        (text: string) => {
            const newText = text.trim();
            if (!newText) return;

            if (newText !== lastTextRef.current) {
                const parsed = tokenize(newText);
                wordsRef.current = parsed;
                idxRef.current = 0;
                lastTextRef.current = newText;
                setWords(parsed);
                setCurrentIdx(0);
            }

            // Loop back to start if we hit the end
            if (idxRef.current >= wordsRef.current.length) {
                idxRef.current = 0;
                setCurrentIdx(0);
            }

            isActiveRef.current = true;
            setIsActive(true);

            const container = containerRef.current;
            if (!container) return;

            const readerRect = container.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
            const readerCenter = readerRect.top + readerRect.height / 2;
            const distanceToCenter = viewportCenter - readerCenter;

            focusTLRef.current = gsap.timeline({
                onComplete: showNextWord,
                defaults: { ease: "power3.inOut", duration: 0.6 },
            });

            focusTLRef.current
                .to("#ui-wrapper", { autoAlpha: 0, y: 30, scale: 0.95 })
                .to(container, { y: distanceToCenter }, "<")
                .to("#stop-hint", { autoAlpha: 1 }, "-=0.3");
        },
        [showNextWord]
    );

    const stop = useCallback(() => {
        if (!isActiveRef.current) return;

        isActiveRef.current = false;
        setIsActive(false);
        restoreUI();
    }, [isActiveRef, restoreUI]);

    const rewind = useCallback(() => {
        const toRewind = wordsInDuration(wpmRef.current, READER_CONFIG.rewindSeconds);
        idxRef.current = Math.max(0, idxRef.current - toRewind - 1);
        setCurrentIdx(idxRef.current);

        if (isActiveRef.current) {
            if (delayedCallRef.current) delayedCallRef.current.kill();
            showNextWord();
        } else {
            // Peek at the rewound word without playing
            isActiveRef.current = true;
            showNextWord();
            isActiveRef.current = false;
            if (delayedCallRef.current) delayedCallRef.current.kill();
        }
    }, [showNextWord]);

    return {
        words,
        currentIdx,
        isActive,
        wpm,
        setWpm: syncWpm,
        displayRef,
        containerRef,
        start,
        stop,
        rewind,
    };
}
