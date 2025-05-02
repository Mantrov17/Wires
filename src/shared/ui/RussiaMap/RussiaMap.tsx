import React from "react";
import RussiaSVG from "../../assets/MapOfRussia.svg";
import styles from "./RussiaMap.scss";
import { CITY_COORDINATES_MAP } from "../../constants/cityCoordinatesMap";

type Props = {
  onSelectCity?: (cityId: string) => void;
};

export const RussiaMap: React.FC<Props> = ({ onSelectCity }) => {
  const extractCoordinateCode = (d: string | null) => {
    if (!d) return null;

    // Извлекаем все цифры из атрибута d
    const digits = d.replace(/\D/g, "");
    if (!digits) return null;

    // Берем первые 5 цифр и дополняем нулями при необходимости
    return digits.slice(0, 5).padEnd(5, "0");
  };

  const handleMapClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const pathElement = target.closest<SVGPathElement>("path");

    if (pathElement) {
      const dAttribute = pathElement.getAttribute("d");
      const coordCode = extractCoordinateCode(dAttribute);

      if (coordCode) {
        console.log("Coordinate code:", coordCode);
        const cityId = CITY_COORDINATES_MAP[coordCode];

        if (cityId) {
          console.log("City ID:", cityId);
          onSelectCity?.(cityId.toString());
        } else {
          console.log("No city found for code:", coordCode);
        }
      }
    }
  };

  return (
    <div className={styles.russiaMapContainer} onClick={handleMapClick}>
      <RussiaSVG className={styles.russiaSvg} />
      <div className={styles.mapOverlay} />
    </div>
  );
};
