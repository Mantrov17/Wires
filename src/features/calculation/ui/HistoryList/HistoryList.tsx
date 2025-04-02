import React from "react";
import { CalculationResult } from "../../../../entities/calculation/types/calculation";
import styles from "./HistoryList.scss";

interface HistoryListProps {
  items: CalculationResult[];
  onSelect: (item: CalculationResult) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  items,
  onSelect,
}) => {
  return (
    <div className={styles.historyList}>
      <h3>История расчетов</h3>
      {items.map((item) => (
        <div
          key={item.timestamp}
          className={styles.historyItem}
          onClick={() => onSelect(item)}
        >
          <div className={styles.historyDate}>
            {new Date(item.timestamp).toLocaleString()}
          </div>
          <div className={styles.historyInfo}>
            <span>{item.wireId}</span>
            <span>{item.spanLength}m</span>
          </div>
        </div>
      ))}
    </div>
  );
};
