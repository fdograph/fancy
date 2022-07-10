import React from "react";
import Link from "next/link";

import Styles from "./PersonalDetails.module.css";

export const PersonalDetails: React.FC = () => {
  return (
    <main className={Styles.MainContainer}>
      <h1 className={Styles.MainHeading}>Fernando Silva Müller</h1>
      <h2 className={Styles.SecondaryHeading}>Fullstack Software Engineer</h2>

      <address className={Styles.ContactContainer}>
        <Link
          href="https://www.linkedin.com/in/fernando-silva-muller"
          target="_blank"
          rel="noreferrer noopener"
          title="See my LinkedIn profile"
        >
          LinkedIn
        </Link>
        <Link
          href="https://github.com/fdograph"
          target="_blank"
          rel="noreferrer noopener"
          title="See my GitHub profile"
        >
          Github
        </Link>
      </address>
    </main>
  );
};
