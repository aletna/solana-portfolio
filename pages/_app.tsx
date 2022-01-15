import React, { useContext, useEffect, useState } from "react";
import { AppProps } from "next/app";
import UserContext, { UserContextProvider } from "../components/context/user";

import "../styles/index.css";
import UserContextInit from "../components/context/UserContextInit";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }: AppProps) {
  const [wallets, setWallets] = useState<string[]>([]);

  const updateWallets = (_wallets: string[]) => {
    setWallets(_wallets);
  };

  const userContextValues = {
    wallets,
    updateWallets,
  };

  return (
    <CookiesProvider>
      <UserContextProvider value={userContextValues}>
        <UserContextInit>
          <Component {...pageProps} />
        </UserContextInit>
      </UserContextProvider>
    </CookiesProvider>
  );
}

export default MyApp;
