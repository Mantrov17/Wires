export interface Wire {
  id: string;
  label: string;
  diameter: number;
  weight: number;
}

export const wires: Wire[] = [
  { id: "ac150_24", label: "АС 150/24", diameter: 15.8, weight: 0.549 },
  { id: "a50", label: "А 50", diameter: 9.0, weight: 0.187 },
  { id: "acsr240", label: "АСУ 240", diameter: 21.6, weight: 0.964 },
];
