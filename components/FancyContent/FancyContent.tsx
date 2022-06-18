import React, {useCallback, useEffect} from 'react';
import classNames from "classnames";

import Styles from './FancyContent.module.css';

export interface FancyContentProps extends React.PropsWithChildren {
  className?: string;
  children: React.ReactNode;
}

export const FancyStaticContent: React.FC<FancyContentProps> = ({children, className}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);
  const onScroll = useCallback(() => {
    requestAnimationFrame(() => {
      if (ref.current === null) {
        return;
      }
      
      const parentRect = ref.current.parentElement!.getBoundingClientRect();
      const progress = Math.abs(parentRect.top * 100 / (parentRect.height - ref.current.offsetHeight));
      setProgress(Math.max(0, Math.min(100, progress)));
    });
  }, [ref])
  
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [onScroll]);
  
  
  return <div ref={ref} className={classNames(Styles.StaticContent, className)} data-progress={progress}>
    {React.Children.only(children)}
  </div>
};

export const FancyScrollingContent: React.FC<FancyContentProps> = ({children, className}) => {
  return <div className={classNames(Styles.ScrollingContent, className)}>
    {React.Children.only(children)}
  </div>
};

export const FancyScrollableSection: React.FC<FancyContentProps> = ({children, className}) => {
  const contentComponents = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && (child.type === FancyScrollingContent || child.type === FancyStaticContent)) {
      return child;
    }
    
    console.warn(`FancyScrollableSection: child ${child} is not a valid element`);
    return null;
  });
  
  return <section className={classNames(Styles.ScrollableSection, className)}>{contentComponents}</section>;
};

export const FancyContent: React.FC<FancyContentProps> = ({children, className}) => {
  const sections = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === FancyScrollableSection) {
      return child;
    }
  
    console.warn(`FancyContent: child ${child} is not a FancyScrollableSection`);
    return null;
  });
  
  return <div className={classNames(Styles.Container, className)}>
    {sections}
  </div>;
};