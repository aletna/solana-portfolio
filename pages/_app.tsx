import React, { useContext, useEffect, useState } from "react";
import { AppProps } from "next/app";
import "../styles/index.css";
import { CookiesProvider } from "react-cookie";
import ContextProvider from "../components/context/ContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <ContextProvider>
          <Component {...pageProps} />
      </ContextProvider>
    </CookiesProvider>
  );
}

export default MyApp;
