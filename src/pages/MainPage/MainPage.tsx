import React from "react";
import {
  CalculatorForm,
  HistoryList,
  useCalculation,
} from "../../features/calculation";
import { ResultCard } from "../../shared/ui/ResultCard/ResultCard";
import { Chart } from "../../shared/ui/Chart/Chart";
import styles from "./MainPage.scss";

export const MainPage: React.FC = () => {
  const { calculate, results, history, isLoading } = useCalculation();

  return (
    <div className={styles.mainPage}>
      <div className={styles.calculationSection}>
        <CalculatorForm onSubmit={calculate} isLoading={isLoading} />
        {results && <ResultCard result={results} />}
      </div>

      <div className={styles.visualizationSection}>
        <Chart data={history} />
        <HistoryList items={history} onSelect={() => {}} />
      </div>
    </div>
  );
};
