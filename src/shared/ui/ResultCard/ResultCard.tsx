import React from "react";
import styles from "./ResultCard.scss";
import { CalculationResult } from "../../../features/calculation/types/calculation";

interface ResultCardProps {
  result: CalculationResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  return (
    <div className={styles.resultCard}>
      <h3>Результаты расчета</h3>
      <div className={styles.resultItem}>
        <span>Комбинация:</span>
        <span>{result?.combination || "—"}</span>
      </div>
      <div className={styles.resultItem}>
        <span>Описание:</span>
        <span>{result?.descr || "—"}</span>
      </div>
      <div className={styles.resultItem}>
        <span>Максимальный провис:</span>
        <span>
          {result?.max_sag !== undefined
            ? result.max_sag.toFixed(2) + " м"
            : "—"}
        </span>
      </div>
    </div>
  );
};
