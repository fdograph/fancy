import React, { useCallback, useEffect, useMemo } from "react";
import Styles from "./SpaceShipsAnimation.module.css";
import { createPoint, lerp, rand } from "../../../utils/utls";
import classNames from "classnames";

export const SpaceShipsAnimation: React.FC<{ progress: number }> = ({
  progress,
}) => {
  const [windowSize, setWindowSize] = React.useState({
    wHeight: 0,
    wWidth: 0,
  });
  const setWindowSizeCallback = useCallback(() => {
    const wHeight = window.innerHeight;
    const wWidth = window.innerWidth;

    setWindowSize({ wHeight, wWidth });
  }, []);

  const seeds = useMemo(() => {
    if (windowSize.wHeight === 0 || windowSize.wWidth === 0) {
      return [];
    }

    const wMax = Math.max(windowSize.wHeight, windowSize.wWidth);

    return Array.from({ length: Math.floor(wMax / 60) }, (_, i) => ({
      a: rand(0, 100),
      b: rand(0, 1),
      c: rand(0, 1),
    }));
  }, [windowSize]);

  const ships = seeds.map((seed, idx) => {
    const size = 150;
    const pointY = lerp(0, windowSize.wHeight, seed.a / 100);
    const startPoint = createPoint(0, pointY);
    const endPoint = createPoint(windowSize.wWidth, pointY - 100);
    const key = `ship-${idx}-${seed.a}-${seed.b}-${seed.c}`;

    return (
      <div
        key={key}
        className={Styles.Cube}
        style={{
          ["--raw-size" as any]: size,
          ["--progress" as any]: progress,
          ["--start-x" as any]: startPoint.x,
          ["--start-y" as any]: startPoint.y,
          ["--end-x" as any]: endPoint.x,
          ["--end-y" as any]: endPoint.y,
          ["--idx" as any]: idx,
          ["--rand" as any]: seed.b,
          ["--sign" as any]: seed.c > 0.5 ? 1 : -1,
        }}
      >
        <div className={classNames(Styles.Face, Styles.TopFace)} />
        <div className={classNames(Styles.Face, Styles.BottomFace)} />
        <div className={classNames(Styles.Face, Styles.LeftFace)} />
        <div className={classNames(Styles.Face, Styles.RightFace)} />
        <div className={classNames(Styles.Face, Styles.FrontFace)} />
        <div className={classNames(Styles.Face, Styles.BackFace)} />
      </div>
    );
  });

  useEffect(() => {
    setWindowSizeCallback();
    window.addEventListener("resize", setWindowSizeCallback);
    return () => {
      window.removeEventListener("resize", setWindowSizeCallback);
    };
  }, [setWindowSizeCallback]);

  return (
    <div
      style={{
        ["--progress" as any]: progress,
      }}
      className={Styles.Scene}
    >
      {ships}
    </div>
  );
};
