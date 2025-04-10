import { apiClient } from "./apiClient";
import {
  CalculationFormValues,
  CalculationResult,
} from "../../features/calculation/types/calculation";
import { City } from "../../entities/city/types/city";

export const calculationApi = {
  fetchCities: async () => {
    const response = await apiClient.get<City[]>("/cities/");
    return response.data;
  },

  calculate: async (values: CalculationFormValues) => {
    const payload = {
      ...values,
      city: Number(values.city),
    };
    const response = await apiClient.post<CalculationResult>(
      "/lep-calculate/",
      payload,
    );
    return response.data;
  },
};
