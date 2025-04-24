// FILE: src/ui/HistoryList/HistoryList.tsx
import { useQuery } from "@tanstack/react-query";
import { CalculationResult } from "../../types/calculation";
import styles from "./HistoryList.scss";

export const HistoryList = () => {
  const { data: calculations } = useQuery<CalculationResult[]>({
    queryKey: ["calculations"],
    initialData: [],
  });

  return (
    <div className={styles.historyListContainer}>
      <h3>История расчетов</h3>
      {calculations?.length === 0 ? (
        <p className={styles.historyListEmpty}>Нет данных</p>
      ) : (
        <ul className={styles.historyListItems}>
          {calculations?.map((calc) => (
            <li key={calc.timestamp} className={styles.historyListItem}>
              <div className={styles.historyListMeta}>
                <span className={styles.historyListMetaLabel}>Результат</span>
                <span className={styles.historyListMetaValue}>
                  {" "}
                  {calc.max_sag}
                </span>
                <span className={styles.historyListMetaLabel}>Тип</span>
                <span className={styles.historyListMetaValue}>
                  {calc.combination}
                </span>
                <p className={styles.historyListDate}>
                  Дата: {new Date(calc.timestamp!).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
