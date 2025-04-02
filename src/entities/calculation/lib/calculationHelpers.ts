import { CalculationResult } from "../types/calculation";
import { Wire } from "../types/wire";
import { Region } from "../types/region";

export const getWireById = (id: string, wires: Wire[]): Wire | undefined => {
  return wires.find((wire) => wire.id === id);
};

export const getRegionById = (
  id: string,
  regions: Region[],
): Region | undefined => {
  return regions.find((region) => region.id === id);
};

export const formatResult = (result: CalculationResult): string => {
  return `Провис: ${result.sag.toFixed(2)}м, Напряжение: ${result.voltage.toFixed(2)}кг/мм²`;
};
