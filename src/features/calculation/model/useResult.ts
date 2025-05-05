import { CalculationResult } from "./calculation";
import { useQuery } from "@tanstack/react-query";

export const useResult = () => {
  return useQuery<CalculationResult[]>({
    queryKey: ["calculations"],
    initialData: [],
  });
};
