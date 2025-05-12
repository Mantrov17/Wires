import { useQuery } from "@tanstack/react-query";
import { CalculationResult } from "../../model/calculation";
import styles from "./styles.scss";
import { useResult } from "../../model/useResult";

export const ResultList = () => {
  const { data: calculations } = useResult();

  const latestResult = calculations?.[0];
  const historyResults = calculations?.length > 1 ? calculations.slice(1) : [];

  const formatDescription = (text: string) => ({
    __html: text.replace(/\^(\d+)/g, "<sup>$1</sup>"),
  });

  return (
    <div className={styles.historyListContainer}>
      {calculations?.length === 0 ? (
        <p className={styles.historyListEmpty}>Нет данных</p>
      ) : (
        <>
          {latestResult && (
            <div className={styles.latestResult}>
              <h3>Последний результат</h3>
              <div className={styles.historyListItem}>
                <div className={styles.historyListMeta}>
                  <span className={styles.historyListMetaLabel}>
                    Стрела провеса
                  </span>
                  <span className={styles.historyListMetaValue}>
                    {latestResult.max_sag} (м)
                  </span>
                  <span className={styles.historyListMetaLabel}>Тип</span>
                  <span className={styles.historyListMetaValue}>
                    {latestResult.combination}
                  </span>
                  <span className={styles.historyListDate}>
                    Дата:{" "}
                    <span className={styles.historyListDateValue}>
                      {new Date(latestResult.timestamp!).toLocaleString()}
                    </span>
                  </span>
                </div>
                <div>
                  <span className={styles.historyListMetaLabel}>Описание</span>

                  <span
                    dangerouslySetInnerHTML={formatDescription(
                      latestResult.descr,
                    )}
                  />
                </div>
              </div>
            </div>
          )}
          {historyResults.length > 0 && (
            <div className={styles.historySection}>
              <h3>История расчётов</h3>
              <ul className={styles.historyListItems}>
                {historyResults.map((calc) => (
                  <li key={calc.timestamp} className={styles.historyListItem}>
                    <div className={styles.historyListMeta}>
                      <span className={styles.historyListMetaLabel}>
                        Стрела провеса
                      </span>
                      <span className={styles.historyListMetaValue}>
                        {calc.max_sag} (м)
                      </span>

                      <span className={styles.historyListMetaLabel}>Тип</span>
                      <span className={styles.historyListMetaValue}>
                        {calc.combination}
                      </span>
                      <span className={styles.historyListDate}>
                        Дата:{" "}
                        <span className={styles.historyListDateValue}>
                          {new Date(calc.timestamp!).toLocaleString()}
                        </span>
                      </span>
                    </div>
                    <div>
                      <span className={styles.historyListMetaLabel}>
                        Описание
                      </span>
                      {latestResult.descr}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};
