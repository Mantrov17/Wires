export interface CalculationResult {
  combination: string;
  descr: string;
  max_sag: number;
  timestamp?: string;
}

export interface CalculationFormValues {
  city: string;
  span_length: number;
  F0: number;
  d: number;
  p: number;
  a0: number;
  E0: number;
  o_r: number;
  o_h: number;
  o_c: number;
}
