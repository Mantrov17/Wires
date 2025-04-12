import { useMutation, useQueryClient } from "@tanstack/react-query";
import { calculationApi } from "../../../shared/api/calculationApi";
import { CalculationResult } from "../types/calculation";

export const useAutoCalculation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: calculationApi.calculateAuto,
    onSuccess: (data) => {
      const resultWithTimestamp = {
        ...data,
        timestamp: new Date().toISOString(),
      };
      queryClient.setQueryData<CalculationResult[]>(["calculations"], (old) =>
        old ? [resultWithTimestamp, ...old] : [resultWithTimestamp],
      );
    },
  });

  return {
    calculate: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};

// features/calculation/model/useManualCalculation.ts
export const useManualCalculation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: calculationApi.calculateManual,
    onSuccess: (data) => {
      const resultWithTimestamp = {
        ...data,
        timestamp: new Date().toISOString(),
      };
      queryClient.setQueryData<CalculationResult[]>(["calculations"], (old) =>
        old ? [resultWithTimestamp, ...old] : [resultWithTimestamp],
      );
    },
  });

  return {
    calculate: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};
