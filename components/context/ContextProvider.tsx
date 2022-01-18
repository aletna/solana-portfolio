import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { ReactNode, useEffect, useState } from "react";
import {
  aggregateTokenData,
  getAllTokenDataFiltered,
  getSolanaUSD,
  getTotalSolBalance,
} from "../../utils/get-solana-data";
import { UserContextProvider } from "./user";
import UserContextInit from "./UserContextInit";

type Props = {
  children?: ReactNode;
};

const ContextProvider = ({ children }: Props) => {
  const [wallets, setWallets] = useState<string[]>([]);
  const [tokens, setTokens] = useState<any[]>([]);
  const [solanaBalance, setSolanaBalance] = useState(0);
  const [solanaPrice, setSolanaPrice] = useState(0);
  const [tokenValue, setTokenValue] = useState(0);
  const [totalValue, setTotalValue] = useState(0)

  const updateWallets = (_wallets: string[]) => {
    setWallets(_wallets);
  };

  useEffect(() => {
    updateSolanaPrice();
  }, []);

  useEffect(() => {
    if (wallets.length > 0) {
      updateTokens();
      updateSolanaBalance();
    }
  }, [wallets]);

  useEffect(() => {
    if (tokens && tokens.length > 0) {
      updateTokenValue();
    }
  }, [tokens]);

  useEffect(() => {
    if (solanaBalance > 0 && tokenValue > 0 && solanaPrice > 0) {
      updateTotalValue();
    }
  }, [solanaBalance, tokenValue, solanaPrice]);

  const updateTokens = async () => {
    const _tokens = await _fetchTokens();
    if (_tokens && _tokens.length > 0) {
      setTokens(_tokens);
    }
  };

  const _fetchTokens = async () => {
    const tokens = await getAllTokenDataFiltered(wallets);
    const aggregateTokens = await aggregateTokenData(tokens);
    return aggregateTokens;
  };

  const updateSolanaBalance = async () => {
    let bal = await getTotalSolBalance(wallets);
    setSolanaBalance(bal);
  };

  const updateSolanaPrice = async () => {
    const res = await getSolanaUSD();
    setSolanaPrice(res);
  };

  const updateTokenValue = async () => {
    let tokenBalance = 0;

    for (const token of tokens) {
      tokenBalance += (token.amount / 10 ** token.decimals) * token.priceUSD;
    }
    setTokenValue(tokenBalance);
  };
  const updateTotalValue = () => {
    let solanaValue = (solanaBalance / LAMPORTS_PER_SOL) * solanaPrice;
    const total = tokenValue + solanaValue;
    setTotalValue(total);
  };

  const userContextValues = {
    wallets,
    updateWallets,
    tokens,
    updateTokens,
    solanaBalance,
    updateSolanaBalance,
    solanaPrice,
    updateSolanaPrice,
    tokenValue,
    updateTokenValue,
    totalValue,
    updateTotalValue,
  };

  return (
    <UserContextProvider value={userContextValues}>
      <UserContextInit>{children}</UserContextInit>
    </UserContextProvider>
  );
};

export default ContextProvider;
