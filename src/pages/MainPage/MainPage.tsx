// FILE: src/pages/MainPage/MainPage.tsx
import React from "react";
import { CalculatorForm, ResultList } from "../../features/calculation";
import { useCalculation } from "../../features/calculation/model/useCalculation";
import styles from "./MainPage.scss";

export const MainPage: React.FC = () => {
  const { history, isLoadingAuto, isLoadingManual } = useCalculation();

  const latestResult = history[0] || null;

  return (
    <div className={styles.mainPage}>
      <div className={styles.calculationSection}>
        <CalculatorForm isLoading={isLoadingAuto || isLoadingManual} />
      </div>

      <div className={styles.resultSection}>
        <h3 className={styles.resultHeader}>Результат вычислений</h3>
        <ResultList />
      </div>

      <div className={styles.infoSection}>
        <h3>Сочетания условий (Тип)</h3>
        <table className={styles.modesTable}>
          <thead>
            <tr>
              <th>Тип</th>
              <th>Описание</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>I</td>
              <td>Провода покрыты гололёдом</td>
            </tr>
            <tr>
              <td>II</td>
              <td>Провода покрыты гололедом, ветра нет</td>
            </tr>
            <tr>
              <td>III</td>
              <td>Скоростной напор - q; Гололёда нет</td>
            </tr>
            <tr>
              <td>IV</td>
              <td>Гололёда и ветра нет</td>
            </tr>
            <tr>
              <td>V</td>
              <td>θ = +15°C; Ветра и гололёда нет</td>
            </tr>
            <tr>
              <td>VI</td>
              <td>θ (режим низшей температуры); ветра и гололёда нет</td>
            </tr>
            <tr>
              <td>VII</td>
              <td>θ (режим высшей температуры); ветра и гололёда нет</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
