// src/shared/components/RussiaMap.tsx

import React from "react";
import RussiaSVG from "../../assets/Russia.svg";
import styles from "./RussiaMap.scss";

type Props = {
  onSelectCity: (cityId: string) => void;
};

export const RussiaMap: React.FC<Props> = ({ onSelectCity }) => {
  const handleRegionClick = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
  ) => {
    const target = event.target as SVGElement;
    const cityId = target.getAttribute("data-id");
    if (cityId) {
      onSelectCity(cityId);
    }
  };

  return (
    <div className={styles.russiaMapContainer}>
      <RussiaSVG onClick={handleRegionClick} className="russia-svg" />
    </div>
  );
};
