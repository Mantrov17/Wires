import React from "react";
import styles from "./Chart.scss";
import { CalculationResult } from "../../../features/calculation/types/calculation";

interface ChartProps {
  data: CalculationResult[];
}

export const Chart: React.FC<ChartProps> = ({ data }) => {
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
                style={{ height: `${item.max_sag * 10}px` }}
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
