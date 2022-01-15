import React, { useContext, useEffect, useState } from "react";
import {
  aggregateTokenData,
  getAllTokenDataFiltered,
  getSolanaUSD,
  getTotalSolBalance,
} from "../utils/get-solana-data";
import TokenTable from "./TokenTable";
import WalletSummary from "./WalletSummary";
import Wallets from "./Wallets";
import UserContext from "./context/user";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

type Props = {};

const Overview = ({}: Props) => {
  const [solBalance, setSolBalance] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [solanaUSDPrice, setSolanaUSDPrice] = useState(0);
  const [allTokenData, setAllTokenData] = useState([]);

  const userContext = useContext(UserContext);

  useEffect(() => {
    updateSolanaUSDPrice();
  }, []);

  useEffect(() => {
    updateTotalBalance();
    updateTokenData();
  }, [userContext.wallets]);

  useEffect(() => {
    getTotalBalance();
  }, [solBalance, allTokenData]);

  const updateSolanaUSDPrice = async () => {
    const res = await getSolanaUSD();
    setSolanaUSDPrice(res);
  };

  const updateTokenData = async () => {
    const tokens = await getAllTokenDataFiltered(userContext.wallets);
    const aggregateTokens = await aggregateTokenData(tokens);
    setAllTokenData(aggregateTokens);
  };

  const updateTotalBalance = async () => {
    let bal = await getTotalSolBalance(userContext.wallets);
    setSolBalance(bal);
  };

  const getTotalBalance = () => {
    let tokenBalance = 0;
    let solanaBalance = (solBalance / LAMPORTS_PER_SOL) * solanaUSDPrice;
    for (const token of allTokenData) {
      tokenBalance += (token.amount / 10 ** token.decimals) * token.priceUSD;
    }
    const total = tokenBalance + solanaBalance;
    setTotalBalance(total);
  };

  return (
    <div>
      {userContext.wallets?.length > 0 ? (
        <div className="mx-auto w-full">
          <WalletSummary
            solBalance={solBalance}
            totalBalance={totalBalance}
            solanaUSD={solanaUSDPrice}
          />
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
