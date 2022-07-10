import React from "react";

import Styles from "./CubeGrid.module.css";
import { CubeRotation } from "../CubeRotation/CubeRotation";

export interface CubeGridProps {
  progress: number;
}

export const CubeGrid: React.FC<CubeGridProps> = ({ progress }) => {
  const cubes = new Array(16)
    .fill(null)
    .map((_, idx) => <CubeRotation key={`${idx}`} progress={progress} />);

  return <div className={Styles.CubeGrid}>{cubes}</div>;
};
