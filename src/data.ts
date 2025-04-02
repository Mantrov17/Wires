import { Wire, Region } from "./types";

export const wires: Wire[] = [
  { id: "ac150_24", label: "АС 150/24" },
  { id: "a50", label: "А 50" },
  { id: "acsr240", label: "АСУ 240" },
];

export const regions: Region[] = [
  { id: "central", name: "Центральный" },
  { id: "siberian", name: "Сибирский" },
  { id: "ural", name: "Уральский" },
];
