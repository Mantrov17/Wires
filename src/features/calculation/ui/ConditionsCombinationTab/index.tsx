import styles from "./styles.scss";
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
            <td>Провода покрыты гололёдом; Скоростной напор ветра - q</td>
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
            <td>θ (режим среднегодовой температуры); Ветра и гололёда нет</td>
          </tr>
          <tr>
            <td>VI</td>
            <td>θ (режим низшей температуры); Ветра и гололёда нет</td>
          </tr>
          <tr>
            <td>VII</td>
            <td>θ (режим высшей температуры); Ветра и гололёда нет</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
