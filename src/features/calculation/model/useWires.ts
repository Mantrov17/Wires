import { useQuery } from "@tanstack/react-query";
import { calculationApi } from "../../../shared/api/calculationApi";

export const useWires = () => {
  return useQuery({
    queryKey: ["wires"],
    queryFn: calculationApi.fetchWires,
    staleTime: 60_000,
    select: (data) => data.sort((a, b) => a.id - b.id), // Сортировка по ID при необходимости
  });
};
