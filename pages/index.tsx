import type { NextPage } from 'next'
import Styles from '../styles/Home.module.css'
import {
  FancyContent,
  FancyScrollableSection,
  FancyScrollingContent,
  FancyStaticContent
} from "../components/FancyContent/FancyContent";
import classNames from "classnames";

interface HomeStaticProps {
  title: string;
}

export const getStaticProps = async (): Promise<{props: HomeStaticProps}> => ({
  props: {
    title: 'Fancy content Visualizer'
  },
});


const Home: NextPage<HomeStaticProps> = (props) => {
  return (
    <main className={Styles.Main}>
      <FancyContent>
        <FancyScrollableSection>
          <FancyScrollingContent>
            <div className={classNames(Styles.LettersContainer, Styles.ToBottomGradient)}>
              <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            </div>
          </FancyScrollingContent>
          <FancyStaticContent className={classNames(Styles.StaticFullPage, Styles.ToTopGradient)}>
            <div className={Styles.InnerContent}>
              <h1 className={Styles.MainHeading}>Fancy content Visualizer</h1>
            </div>
          </FancyStaticContent>
        </FancyScrollableSection>
        <FancyScrollableSection>
          <FancyStaticContent className={classNames(Styles.StaticFullPage, Styles.ToTopGradient)}>
            <div className={Styles.InnerContent}>
              <h1 className={Styles.MainHeading}>Fancy content Visualizer</h1>
            </div>
          </FancyStaticContent>
          <FancyScrollingContent>
            <div className={classNames(Styles.LettersContainer, Styles.ToBottomGradient)}>
              <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            </div>
          </FancyScrollingContent>
        </FancyScrollableSection>
        <FancyScrollableSection>
          <FancyScrollingContent>
            <div className={classNames(Styles.LettersContainer, Styles.ToBottomGradient)}>
              <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            </div>
          </FancyScrollingContent>
          <FancyStaticContent className={classNames(Styles.StaticFullPage, Styles.ToTopGradient)}>
            <div className={Styles.InnerContent}>
              <h1 className={Styles.MainHeading}>Fancy content Visualizer</h1>
            </div>
          </FancyStaticContent>
        </FancyScrollableSection>
      </FancyContent>
    </main>
  )
}

export default Home
