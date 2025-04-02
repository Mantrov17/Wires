export interface CalculationResult {
  voltage: number;
  sag: number;
  recommendation: string;
  timestamp: string;
  spanLength: string;
  wireId: string;
  regionId: string;
}

export interface CalculationInput {
  spanLength: string;
  wireId: string;
  regionId: string;
}
