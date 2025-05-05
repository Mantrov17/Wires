export interface CalculationResult {
  combination: string;
  descr: string;
  max_sag: number;
  timestamp?: string;
}

export interface AutoCalculationFormValues {
  subject: string;
  wire: string;
  l: number;
}

export interface ManualCalculationFormValues {
  l: number;
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
