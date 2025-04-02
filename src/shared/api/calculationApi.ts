import {
  CalculationResult,
  CalculationInput,
} from "../../entities/calculation/types/calculation";
import { Wire } from "../../entities/calculation/types/wire";
import { Region } from "../../entities/calculation/types/region";

export const getCalculationHistory = async (
  input: CalculationInput,
): Promise<CalculationResult> => {
  // Заглушка для реального API вызова
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...input,
        voltage: Math.random() * 150 + 50,
        sag: Math.random() * 10 + 2,
        recommendation: "Провод соответствует нормам",
        timestamp: new Date().toISOString(),
      });
    }, 1000);
  });
};

export const saveCalculation = (result: CalculationResult): void => {
  localStorage.setItem("lastCalculation", JSON.stringify(result));
};
