import React, { useContext, useEffect, useState } from "react";
import { AppProps } from "next/app";
import "../styles/index.css";
import "../styles/walletAdapter.css";
import { CookiesProvider } from "react-cookie";
import ContextProvider from "../components/context/ContextProvider";
import ClientWalletProvider from "../components/context/ClientWalletProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <ClientWalletProvider>
        <ContextProvider>
          <Component {...pageProps} />
        </ContextProvider>
      </ClientWalletProvider>
    </CookiesProvider>
  );
}

export default MyApp;
