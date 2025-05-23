import React from "react";
import styles from "./styles.scss";

export const ManualInputExplanation: React.FC = () => {
  return (
    <div>
      <table className={styles.explanationTable}>
        <thead>
          <tr>
            <th>Переменная, используемая в расчётах</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>l</td>
            <td>Длина пролёта (метр, число с плавающей точкой)</td>
          </tr>
          <tr>
            <td>t_min</td>
            <td>Минимальная температура (℃, число с плавающей точкой)</td>
          </tr>
          <tr>
            <td>t_max</td>
            <td>Максимальная температура (℃, число с плавающей точкой)</td>
          </tr>
          <tr>
            <td>t_avg</td>
            <td>Среднегодовая температура (℃, число с плавающей точкой)</td>
          </tr>
          <tr>
            <td>e</td>
            <td>Номер района по гололеду (от 1 до 6)</td>
          </tr>
          <tr>
            <td>q</td>
            <td>Номер района по ветровой нагрузке (от 1 до 6)</td>
          </tr>
          <tr>
            <td>F0</td>
            <td>
              Общее сечение провода (мм<sup>2</sup>, число с плавающей точкой)
            </td>
          </tr>
          <tr>
            <td>diameter</td>
            <td>Диаметр провода (мм, число с плавающей точкой)</td>
          </tr>
          <tr>
            <td>weight</td>
            <td>Вес провода (км/кг, число с плавающей точкой)</td>
          </tr>
          <tr>
            <td>a0</td>
            <td>Коэффициент расширения (м/град)</td>
          </tr>
          <tr>
            <td>E0</td>
            <td>
              Модуль упругости материала (кг/мм<sup>2</sup>, целое число)
            </td>
          </tr>
          <tr>
            <td>o_r</td>
            <td>
              Допустимое напряжение при наибольших нагрузках (кг/мм<sup>2</sup>)
            </td>
          </tr>
          <tr>
            <td>o_c</td>
            <td>
              Допустимое напряжение при среднегодовой температуре (кг/мм
              <sup>2</sup>)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
