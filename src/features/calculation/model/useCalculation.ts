// FILE: src/features/calculation/model/useCalculation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { calculationApi } from "../../../shared/api/calculationApi";
import { CalculationFormValues, CalculationResult } from "../types/calculation";

export const useCalculation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: calculationApi.calculate,
    onSuccess: (data) => {
      const resultWithTimestamp = {
        ...data,
        timestamp: new Date().toISOString(),
      };

      if (typeof data.max_sag === "number") {
        queryClient.setQueryData<CalculationResult[]>(
          ["calculations"],
          (old) =>
            old ? [resultWithTimestamp, ...old] : [resultWithTimestamp],
        );
      } else {
        console.warn("Некорректный результат расчёта:", data);
      }
    },
  });

  return {
    calculate: mutation.mutate,
    results: mutation.data,
    history:
      queryClient.getQueryData<CalculationResult[]>(["calculations"]) || [],
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};
