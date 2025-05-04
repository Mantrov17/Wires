import React from "react";
import styles from "./styles.scss";

export const Header: React.FC = () => {
  return (
    <header className={styles.appHeader}>
      <div className={`${styles.container} ${styles.headerContent}`}>
        <h1 className={styles.mainTitle}>Расчёт провисания проводов ЛЭП</h1>
        <p className={styles.subTitle}>
          Веб-приложение для инженерных расчётов
        </p>
      </div>
    </header>
  );
};
