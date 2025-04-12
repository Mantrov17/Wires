// FILE: src/pages/MainPage/MainPage.tsx
import React from "react";
import { CalculatorForm, HistoryList } from "../../features/calculation";
import { useCalculation } from "../../features/calculation/model/useCalculation";
import { ResultCard } from "../../shared/ui/ResultCard/ResultCard";
import styles from "./MainPage.scss";

export const MainPage: React.FC = () => {
  const {
    calculateAuto,
    calculateManual,
    results,
    history,
    isLoadingAuto,
    isLoadingManual,
  } = useCalculation();

  return (
    <div className={styles.mainPage}>
      <div className={styles.calculationSection}>
        <CalculatorForm
          onSubmitAuto={calculateAuto}
          onSubmitManual={calculateManual}
          isLoading={isLoadingAuto || isLoadingManual}
        />
        {results && <ResultCard result={results} />}
      </div>

      <div className={styles.visualizationSection}>
        <HistoryList items={history} onSelect={() => {}} />
      </div>
    </div>
  );
};
