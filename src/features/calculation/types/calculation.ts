// FILE: src/features/calculation/types/calculation.ts
export interface CalculationResult {
  combination: string;
  descr: string;
  max_sag: number;
  timestamp?: string;
}

export interface AutoCalculationFormValues {
  city: string;
  wire: string;
  span_length: number;
}

export interface ManualCalculationFormValues {
  span_length: number;
  t_min: number;
  t_max: number;
  t_avg: number;
  e: number;
  q: number;
  F0: number;
  diameter: number;
  weight: number;
  a0: number;
  E0: number;
  o_r: number;
  o_c: number;
}

export type CalculationError = {
  [key in keyof (AutoCalculationFormValues &
    ManualCalculationFormValues)]?: string;
};
