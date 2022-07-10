import React from "react";

import Styles from "./HorizonAnimation.module.css";
import classNames from "classnames";

const items = [
  { bgClass: "bg-red-600" },
  { bgClass: "bg-orange-600" },
  { bgClass: "bg-amber-600" },
  { bgClass: "bg-yellow-400" },
  { bgClass: "bg-lime-500" },
  { bgClass: "bg-green-500" },
  { bgClass: "bg-emerald-500" },
  { bgClass: "bg-teal-500" },
  { bgClass: "bg-cyan-500" },
  { bgClass: "bg-blue-500" },
  { bgClass: "bg-indigo-500" },
  { bgClass: "bg-violet-600" },
  { bgClass: "bg-fuchsia-600" },
  { bgClass: "bg-pink-600" },
  { bgClass: "bg-rose-600" },
];

export const HorizonAnimation: React.FC<{ progress: number }> = ({
  progress,
}) => {
  const itemsToShow = items.map((data, index) => {
    const start = (100 / items.length) * index;
    const end = (100 / items.length) * (index + 1);
    let itemProgress = 0;

    if (progress < start) {
      itemProgress = 0;
    } else if (progress >= start && progress <= end) {
      itemProgress = (progress - start) / (end - start);
    } else if (progress > end) {
      itemProgress = 1;
    }

    return (
      <div
        key={data.bgClass}
        className={classNames(Styles.Item, data.bgClass)}
        style={{
          ["--item-progress" as any]: itemProgress * 100,
        }}
      />
    );
  });
  return (
    <div
      className={Styles.HorizonWrapper}
      style={{
        ["--progress" as any]: progress,
      }}
    >
      {itemsToShow}
    </div>
  );
};
