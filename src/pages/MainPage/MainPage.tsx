import React from "react";
import {
  CalculatorForm,
  ConditionsCombinationTab,
  ManualInputExplanation,
  ResultList,
} from "../../features/calculation";
import { useCalculation } from "../../features/calculation";
import styles from "./MainPage.scss";

export const MainPage: React.FC = () => {
  const { history, isLoadingAuto, isLoadingManual } = useCalculation();

  const latestResult = history[0] || null;

  return (
    <div className={styles.mainPage}>
      <div className={styles.calculationSection}>
        <CalculatorForm isLoading={isLoadingAuto || isLoadingManual} />
      </div>

      <div className={styles.resultSection}>
        <h3 className={styles.resultHeader}>Результат вычислений</h3>
        <ResultList />
      </div>
      <h2 className={styles.infoSectionTitle}>Справочная информация</h2>
      <div className={styles.infoSection}>
        <h3>Сочетания условий (Тип)</h3>
        <ConditionsCombinationTab />
      </div>
      <div className={styles.infoSection}>
        <ManualInputExplanation />
      </div>
    </div>
  );
};
