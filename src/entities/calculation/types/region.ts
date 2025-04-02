export interface Region {
  id: string;
  name: string;
  windLoad: number;
  iceThickness: number;
}

export const regions: Region[] = [
  { id: "central", name: "Центральный", windLoad: 0.6, iceThickness: 5 },
  { id: "siberian", name: "Сибирский", windLoad: 0.8, iceThickness: 10 },
  { id: "ural", name: "Уральский", windLoad: 0.7, iceThickness: 8 },
];
