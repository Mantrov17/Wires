import styles from "./ConditionsCombinationTab.scss";
import React from "react";
export const ConditionsCombinationTab: React.FC = () => {
  return (
    <div>
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
            <td>Провода покрыты гололёдом, ветра нет</td>
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
  );
};
