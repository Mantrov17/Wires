import React from "react";
import { CalculationResult } from "../../../entities/calculation/types/calculation";
import styles from "./Chart.scss";

interface ChartProps {
  data: CalculationResult[];
}

export const Chart: React.FC<ChartProps> = ({ data }) => {
  // Заглушка для реализации графика
  return (
    <div className={styles.chartContainer}>
      <h3>График результатов</h3>
      <div className={styles.chartPlaceholder}>
        {data.length > 0 ? (
          <div className={styles.bars}>
            {data.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="bar"
                style={{ height: `${item.sag * 10}px` }}
              />
            ))}
          </div>
        ) : (
          <p>Нет данных для отображения</p>
        )}
      </div>
    </div>
  );
};
