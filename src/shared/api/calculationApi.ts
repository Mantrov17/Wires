import { apiClient } from "./apiClient";
import { Subject } from "../../entities/subject/types/subject";
import { Wire } from "../../entities/calculation/types/wire";
import {
  AutoCalculationFormValues,
  CalculationResult,
  ManualCalculationFormValues,
} from "../../features/calculation/model/calculation";

export const calculationApi = {
  fetchSubjects: async () => {
    const response = await apiClient.get<Subject[]>("/subjects/");
    return response.data;
  },

  fetchWires: async () => {
    const response = await apiClient.get<Wire[]>("/wires/");
    return response.data;
  },

  calculateAuto: async (values: AutoCalculationFormValues) => {
    const payload = {
      ...values,
      subject: Number(values.subject),
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
