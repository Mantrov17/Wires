// FILE: src/pages/MainPage/MainPage.tsx
import React from "react";
import { CalculatorForm, HistoryList } from "../../features/calculation";
import { useCalculation } from "../../features/calculation/model/useCalculation";
import styles from "./MainPage.scss";

export const MainPage: React.FC = () => {
  const { history, isLoadingAuto, isLoadingManual } = useCalculation();

  const latestResult = history[0] || null;

  return (
    <div className={styles.mainPage}>
      <div className={styles.calculationSection}>
        <CalculatorForm isLoading={isLoadingAuto || isLoadingManual} />
      </div>

      <div className={styles.visualizationSection}>
        <h3 className={styles.historyHeader}>История вычислений</h3>
        <HistoryList />
      </div>
    </div>
  );
};
