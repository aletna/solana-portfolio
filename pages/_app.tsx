import React, { useContext, useEffect, useState } from "react";
import { AppProps } from "next/app";
import UserContext, { UserContextProvider } from "../components/context/user";

import "../styles/index.css";
import UserContextInit from "../components/context/UserContextInit";
import { CookiesProvider } from "react-cookie";
import ContextProvider from "../components/context/ContextProvider";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <CookiesProvider>
      <ContextProvider>
        <UserContextInit>
          <Component {...pageProps} />
        </UserContextInit>
      </ContextProvider>
    </CookiesProvider>
  );
}

export default MyApp;
