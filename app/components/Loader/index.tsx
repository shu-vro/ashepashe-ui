import React from "react";
import styles from "./loader.module.css";

export default function Loader() {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
            </div>
        </div>
    );
}
