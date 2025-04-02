export interface CalculationResult {
  voltage: number;
  sag: number;
  recommendation: string;
}

export interface Wire {
  id: string;
  label: string;
}

export interface Region {
  id: string;
  name: string;
}
