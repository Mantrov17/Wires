import { useQuery } from "@tanstack/react-query";
import { calculationApi } from "../../../shared/api/calculationApi";

export const useSubjects = () => {
  return useQuery({
    queryKey: ["subjects"],
    queryFn: calculationApi.fetchSubjects,
    staleTime: 60_000,
  });
};
