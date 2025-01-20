import React from "react";
import styles from "./styles.module.css";

export default function Ribbon({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.ribbon}>
            <span className={styles.ribbon__content}>{children}</span>
        </div>
    );
}
