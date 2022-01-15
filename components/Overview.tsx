import React, { useContext, useEffect, useState } from "react";
import {
  aggregateTokenData,
  getAllTokenDataFiltered,
  getSolanaUSD,
  getTotalBalance,
} from "../utils/get-solana-data";
import TokenTable from "./TokenTable";
import WalletSummary from "./WalletSummary";
import Wallets from "./Wallets";
import UserContext from "./context/user";

type Props = {};

const Overview = ({}: Props) => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [solanaUSD, setSolanaUSD] = useState(0);
  const [allTokenData, setAllTokenData] = useState([]);

  const userContext = useContext(UserContext);

  useEffect(() => {
    updateSolanaUSD();
  }, []);

  useEffect(() => {
    updateTotalBalance();
    updateTokenData();
  }, [userContext.wallets]);

  const updateSolanaUSD = async () => {
    const res = await getSolanaUSD();
    setSolanaUSD(res);
  };

  const updateTokenData = async () => {
    const tokens = await getAllTokenDataFiltered(userContext.wallets);
    const aggregateTokens = await aggregateTokenData(tokens);
    setAllTokenData(aggregateTokens);
  };

  const updateTotalBalance = async () => {
    let bal = await getTotalBalance(userContext.wallets);
    setTotalBalance(bal);
  };

  return (
    <div>
      {userContext.wallets?.length > 0 ? (
        <div className="mx-auto w-full">
          <WalletSummary totalBalance={totalBalance} solanaUSD={solanaUSD} />
          <TokenTable tokenData={allTokenData} />
        </div>
      ) : (
        <div>
          <div className="text-center text-2xl pt-16">No Wallet Connect.</div>
          <Wallets />
        </div>
      )}
    </div>
  );
};

export default Overview;
