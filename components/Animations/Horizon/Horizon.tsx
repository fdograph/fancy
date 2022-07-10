import React from "react";
import {
  FancyScrollableSection,
  FancyStaticContent,
} from "../../FancyContent/FancyContent";
import classNames from "classnames";

import Styles from "./Horizon.module.css";
import { HorizonAnimation } from "./HorizonAnimation";

export const Horizon: React.FC = () => {
  return (
    <FancyScrollableSection className={Styles.HorizonWrapper}>
      <FancyStaticContent
        className={classNames(Styles.StaticFullPage)}
        content={HorizonAnimation}
      />
    </FancyScrollableSection>
  );
};
