import React from "react";
import { CalculationResult } from "../../../entities/calculation/types/calculation";
import styles from "./ResultCard.scss";

interface ResultCardProps {
  result: CalculationResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  return (
    <div className={styles.resultCard}>
      <h3>Результаты расчета</h3>
      <div className={styles.resultItem}>
        <span>Напряжение:</span>
        <span>{result.voltage.toFixed(2)} кг/мм²</span>
      </div>
      <div className={styles.resultItem}>
        <span>Стрела провеса:</span>
        <span>{result.sag.toFixed(2)} м</span>
      </div>
      <div className={styles.recommendation}>
        <h4>Рекомендации:</h4>
        <p>{result.recommendation}</p>
      </div>
    </div>
  );
};
