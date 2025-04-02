import React, { useState } from "react";
import { wires } from "../../../../entities/calculation/types/wire";
import { CalculationInput } from "../../../../entities/calculation/types/calculation";
import styles from "./CalculatorForm.scss";

interface CalculatorFormProps {
  onSubmit: (data: CalculationInput) => void;
  isLoading: boolean;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState<CalculationInput>({
    spanLength: "",
    wireId: "",
    regionId: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={styles.calculatorForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>Длина пролета (м)</label>
        <input
          type="number"
          min="50"
          max="1000"
          required
          value={formData.spanLength}
          onChange={(e) =>
            setFormData({ ...formData, spanLength: e.target.value })
          }
        />
      </div>

      <div className={styles.formGroup}>
        <label>Марка провода</label>
        <select
          required
          value={formData.wireId}
          onChange={(e) => setFormData({ ...formData, wireId: e.target.value })}
        >
          <option value="">Выберите провод</option>
          {wires.map((wire) => (
            <option key={wire.id} value={wire.id}>
              {wire.label}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Расчет..." : "Рассчитать"}
      </button>
    </form>
  );
};
