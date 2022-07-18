import React, { useCallback, useEffect, useMemo } from "react";
import classNames from "classnames";
import Styles from "./RaysAnimation.module.css";
import { rand } from "../../../utils/utls";

const colors = [
  "bg-red-600",
  "bg-yellow-400",
  "bg-orange-500",
  "bg-lime-500",
  "bg-indigo-500",
  "bg-violet-600",
];

export const RaysAnimation: React.FC<{ progress: number }> = ({ progress }) => {
  const [windowSize, setWindowSize] = React.useState({
    wHeight: 0,
    wWidth: 0,
  });
  const setWindowSizeCallback = useCallback(() => {
    const wHeight = window.innerHeight;
    const wWidth = window.innerWidth;

    setWindowSize({ wHeight, wWidth });
  }, []);

  const rays = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => (
        <div
          key={i}
          className={classNames(
            Styles.Ray,
            colors[Math.floor(Math.random() * colors.length)]
          )}
          style={{
            ["--count" as any]: 15,
            ["--index" as any]: i,
            ["--rand" as any]: rand(500, 1000),
            ["--left" as any]: rand(0, windowSize.wWidth),
            ["--sign" as any]: Math.random() > 0.5 ? 1 : -1,
          }}
        />
      )),
    [windowSize.wWidth]
  );

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
      <div className={Styles.Inner}>{rays}</div>
    </div>
  );
};
