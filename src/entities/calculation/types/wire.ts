export interface Wire {
  id: number;
  wire: string;
}

export interface WireDetails extends Wire {
  diameter?: number;
  weight?: number;
  breakingStrength?: number;
}
