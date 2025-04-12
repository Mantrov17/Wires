import { apiClient } from "./apiClient";
import { City } from "../../entities/city/types/city";
import { Wire } from "../../entities/calculation/types/wire";
import {
  AutoCalculationFormValues,
  CalculationResult,
  ManualCalculationFormValues,
} from "../../features/calculation/types/calculation";

export const calculationApi = {
  fetchCities: async () => {
    const response = await apiClient.get<City[]>("/cities/");
    return response.data;
  },

  fetchWires: async () => {
    const response = await apiClient.get<Wire[]>("/wires/");
    return response.data;
  },

  calculateAuto: async (values: AutoCalculationFormValues) => {
    const payload = {
      ...values,
      city: Number(values.city),
      wire: Number(values.wire),
    };
    const response = await apiClient.post<CalculationResult>(
      "/lep-calculate/",
      payload,
    );
    return response.data;
  },

  calculateManual: async (values: ManualCalculationFormValues) => {
    const response = await apiClient.post<CalculationResult>(
      "/lep-calculate-manual/",
      values,
    );
    return response.data;
  },
};
