import React from "react";
import {
  FancyScrollableSection,
  FancyStaticContent,
} from "../../FancyContent/FancyContent";
import classNames from "classnames";

import Styles from "./Rays.module.css";
import { RaysAnimation } from "./RaysAnimation";

export const Rays: React.FC = () => {
  return (
    <FancyScrollableSection className={Styles.Wrapper}>
      <FancyStaticContent
        className={classNames(Styles.StaticFullPage)}
        content={RaysAnimation}
      />
    </FancyScrollableSection>
  );
};
