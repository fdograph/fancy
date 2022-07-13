import React from "react";
import {
  FancyScrollableSection,
  FancyStaticContent,
} from "../../FancyContent/FancyContent";
import classNames from "classnames";

import Styles from "./SpaceShips.module.css";
import { SpaceShipsAnimation } from "./SpaceShipsAnimation";

export const SpaceShips: React.FC = () => {
  return (
    <FancyScrollableSection className={Styles.Wrapper}>
      <FancyStaticContent
        className={classNames(Styles.StaticFullPage)}
        content={SpaceShipsAnimation}
      />
    </FancyScrollableSection>
  );
};
