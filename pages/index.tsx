import type { NextPage } from "next";
import Styles from "../styles/Home.module.css";
import { FancyContent } from "../components/FancyContent/FancyContent";
import { PersonalDetails } from "../components/PersonalDetails/PersonalDetails";
import { Horizon } from "../components/Animations/Horizon/Horizon";
import { Rays } from "../components/Animations/Rays/Rays";
import { SpaceShips } from "../components/Animations/SpaceShips/SpaceShips";

interface HomeStaticProps {
  title: string;
  description: string;
}

export const getStaticProps = async (): Promise<{
  props: HomeStaticProps;
}> => ({
  props: {
    title: "Fernando Silva Müller - Fullstack software engineer",
    description: "",
  },
});

const Home: NextPage<HomeStaticProps> = (props) => (
  <div className={Styles.MainWrapper}>
    <PersonalDetails />
    <FancyContent>
      <SpaceShips />
      <Horizon />
      <Rays />
    </FancyContent>
  </div>
);

export default Home;
