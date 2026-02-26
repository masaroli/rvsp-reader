// ─── WordDisplay Component ────────────────────────────────────────────────────
import type { RefObject } from "react";
import styles from "./WordDisplay.module.css";

interface Props {
    containerRef: RefObject<HTMLDivElement | null>;
    displayRef: RefObject<HTMLDivElement | null>;
    onStop: () => void;
}

export function WordDisplay({ containerRef, displayRef, onStop }: Props) {
    return (
        <div
            ref={containerRef}
            className={styles.container}
            onClick={onStop}
            role="button"
            aria-label="Click to stop reading"
        >
            <div ref={displayRef} className={styles.word} />
        </div>
    );
}
