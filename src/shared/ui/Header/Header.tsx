import React from "react";
import styles from "./Header.scss";

export const Header: React.FC = () => {
  return (
    <header className={styles.appHeader}>
      <div className={styles.container}>
        <h1>Расчет провисания проводов ЛЭП</h1>
        <p>Веб-приложение для инженерных расчетов</p>
      </div>
    </header>
  );
};
