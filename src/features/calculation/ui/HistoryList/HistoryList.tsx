import React from "react";
import styles from "./HistoryList.scss";
import { CalculationResult } from "../../types/calculation";

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
      {items.map((item, index) => (
        <div
          key={item.timestamp || index}
          className={styles.historyItem}
          onClick={() => onSelect(item)}
        >
          <div className={styles.historyDate}>
            {item.timestamp
              ? new Date(item.timestamp).toLocaleString()
              : "Время неизвестно"}
          </div>
          <div className={styles.historyInfo}>
            <span>{item.combination || "—"}</span>
            <span>
              {item?.max_sag !== undefined
                ? `${item.max_sag.toFixed(2)} м`
                : "—"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
