import { useMutation, useQueryClient } from "@tanstack/react-query";
import { calculationApi } from "../../../shared/api/calculationApi";
import { CalculationResult } from "./calculation";

export const useCalculation = () => {
  const queryClient = useQueryClient();

  const commonSuccessHandler = (data: CalculationResult) => {
    const resultWithTimestamp = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    queryClient.setQueryData<CalculationResult[]>(["calculations"], (old) =>
      old ? [resultWithTimestamp, ...old] : [resultWithTimestamp],
    );
  };

  const autoMutation = useMutation({
    mutationFn: calculationApi.calculateAuto,
    onSuccess: commonSuccessHandler,
  });

  const manualMutation = useMutation({
    mutationFn: calculationApi.calculateManual,
    onSuccess: commonSuccessHandler,
  });

  return {
    calculateAuto: autoMutation.mutateAsync,
    calculateManual: manualMutation.mutateAsync,
    history:
      queryClient.getQueryData<CalculationResult[]>(["calculations"]) || [],
    isLoadingAuto: autoMutation.isLoading,
    isLoadingManual: manualMutation.isLoading,
  };
};
