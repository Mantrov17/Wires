import { useState } from "react";
import {
  CalculationResult,
  CalculationInput,
} from "../../../entities/calculation/types/calculation";
import {
  getCalculationHistory,
  saveCalculation,
} from "../../../shared/api/calculationApi";
import { useLocalStorage } from "../../../shared/lib/LocalStorage";

export const useCalculation = () => {
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [history, setHistory] = useLocalStorage<CalculationResult[]>(
    "calculations",
    [],
  );
  const [isLoading, setIsLoading] = useState(false);

  const calculate = async (data: CalculationInput) => {
    setIsLoading(true);
    try {
      const result = await getCalculationHistory(data);
      setResults(result);
      saveCalculation(result);
      setHistory([result, ...history]);
    } finally {
      setIsLoading(false);
    }
  };

  return { calculate, results, history, isLoading };
};
