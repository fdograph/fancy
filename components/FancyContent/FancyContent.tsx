import React, { useCallback, useEffect } from "react";
import classNames from "classnames";

import Styles from "./FancyContent.module.css";
import { clamp, invLerp } from "../../utils/utls";

export interface FancyContentProps extends React.PropsWithChildren {
  className?: string;
  children: React.ReactNode;
}

export interface FancyDynamicContentProps {
  progress: number;
  hasStarted: boolean;
  hasFinished: boolean;
  isAnimating: boolean;
}

export interface FancyStaticContentProps {
  className?: string;
  content: (props: FancyDynamicContentProps) => React.ReactNode;
  showDebugLog?: boolean;
}

export const FancyStaticContent: React.FC<FancyStaticContentProps> = ({
  className,
  content,
  showDebugLog = false,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);
  const [hasStarted, setHasStarted] = React.useState(false);
  const [hasFinished, setHasFinished] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const doUpdate = useCallback(() => {
    if (ref.current === null) {
      return 0;
    }

    const parentRect = ref.current.parentElement!.getBoundingClientRect();
    const correctedTop = Math.max(0, parentRect.top * -1);
    const correctedHeight =
      parentRect.height - ref.current.offsetHeight || ref.current.offsetHeight;
    const lerpResult = invLerp(0, correctedHeight, correctedTop);
    const progress = clamp(lerpResult * 100, 0, 100);

    if (showDebugLog) {
      console.log({
        top: parentRect.top,
        height: parentRect.height,
        offsetHeight: ref.current.offsetHeight,
        correctedTop,
        correctedHeight,
        progress,
        lerpResult,
      });
    }

    setProgress(progress);
    setHasStarted(progress > 0);
    setHasFinished(progress === 100);
    setIsAnimating(progress > 0 && progress < 100);
  }, [showDebugLog]);
  const onScroll = useCallback(() => doUpdate(), [doUpdate]);

  useEffect(() => {
    doUpdate();
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [doUpdate, onScroll]);

  return (
    <div ref={ref} className={classNames(Styles.StaticContent, className)}>
      {content({
        progress,
        hasStarted,
        hasFinished,
        isAnimating,
      })}
    </div>
  );
};

export const FancyScrollableSection: React.FC<FancyContentProps> = ({
  children,
  className,
}) => (
  <section className={classNames(Styles.ScrollableSection, className)}>
    {children}
  </section>
);

export const FancyContent: React.FC<FancyContentProps> = ({
  children,
  className,
}) => {
  return (
    <div className={classNames(Styles.Container, className)}>{children}</div>
  );
};
