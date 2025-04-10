import { useQuery } from "@tanstack/react-query";
import { calculationApi } from "../../../shared/api/calculationApi";

export const useCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: calculationApi.fetchCities,
    staleTime: 60_000,
  });
};
