import React, { useCallback, useEffect } from "react";
import classNames from "classnames";

import Styles from "./FancyContent.module.css";

export interface FancyContentProps extends React.PropsWithChildren {
  className?: string;
  children: React.ReactNode;
}

export interface FancyDynamicContentProps {
  progress: number;
  fullProgress: number;
  hasStarted: boolean;
  hasFinished: boolean;
  isAnimating: boolean;
}

export interface FancyStaticContentProps {
  className?: string;
  content: (props: FancyDynamicContentProps) => React.ReactNode;
}

export const FancyStaticContent: React.FC<FancyStaticContentProps> = ({
  className,
  content,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);
  const [fullProgress, setFullProgress] = React.useState(0);
  const [hasStarted, setHasStarted] = React.useState(false);
  const [hasFinished, setHasFinished] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const doUpdate = useCallback(() => {
    if (ref.current === null) {
      return 0;
    }

    const parentRect = ref.current.parentElement!.getBoundingClientRect();
    const rawProgress =
      ((parentRect.top * 100) /
        (parentRect.height - ref.current.offsetHeight)) *
      -1;
    const progress = Math.max(0, Math.min(100, rawProgress));

    setProgress(progress);
    setFullProgress(rawProgress);
    setHasStarted(progress > 0);
    setHasFinished(progress === 100);
    setIsAnimating(progress > 0 && progress < 100);
  }, []);
  const onScroll = useCallback(
    () =>
      requestAnimationFrame(() => {
        doUpdate();
      }),
    [doUpdate]
  );

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
        fullProgress,
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
