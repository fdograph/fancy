import React from "react";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import Head from "next/head";

const MainApplication: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>{pageProps.title}</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="description" content={pageProps.description} />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MainApplication;
