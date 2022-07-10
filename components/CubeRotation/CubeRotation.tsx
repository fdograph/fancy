import React from "react";
import classNames from "classnames";

import Styles from "./CubeRotation.module.css";

export interface CubeRotationProps {
  progress: number;
}
export const CubeRotation: React.FC<CubeRotationProps> = ({ progress }) => {
  return (
    <div
      className={Styles.Container}
      style={{ ["--progress" as any]: `${progress}` }}
    >
      <div className={Styles.Cube}>
        <div className={classNames(Styles.Face, Styles.TopFace)} />
        <div className={classNames(Styles.Face, Styles.BottomFace)} />
        <div className={classNames(Styles.Face, Styles.LeftFace)} />
        <div className={classNames(Styles.Face, Styles.RightFace)} />
        <div className={classNames(Styles.Face, Styles.FrontFace)} />
        <div className={classNames(Styles.Face, Styles.BackFace)} />
      </div>
    </div>
  );
};
