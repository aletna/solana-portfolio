import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React, { ReactNode, useEffect, useState } from "react";
import {
  aggregateTokenData,
  getAllTokenDataFiltered,
  getSolanaUSD,
  getTotalBalance,
} from "../utils/get-solana-data";
import { imgHostSupport, numWithCommas } from "../utils/utils";
import Image from "next/image";

type Props = {};

const Overview = ({}: Props) => {
  const [wallets, setWallets] = useState([
  ]);
  const [walletInput, setWalletInput] = useState("");
  const [totalBalance, setTotalBalance] = useState(0);
  const [solanaUSD, setSolanaUSD] = useState(0);
  const [allTokenData, setAllTokenData] = useState([]);

  useEffect(() => {
    updateSolanaUSD();
  }, []);

  useEffect(() => {
    updateTotalBalance();
    updateTokenData();
  }, [wallets]);

  const updateSolanaUSD = async () => {
    const res = await getSolanaUSD();
    setSolanaUSD(res);
  };

  const updateTokenData = async () => {
    const tokens = await getAllTokenDataFiltered(wallets);
    const aggregateTokens = await aggregateTokenData(tokens);
    setAllTokenData(aggregateTokens);
  };

  const updateTotalBalance = async () => {
    let bal = await getTotalBalance(wallets);
    setTotalBalance(bal);
  };

  const addWallet = (e: any) => {
    e.preventDefault();
    if (walletInput.length > 0) {
      const newWalletsArr = [...wallets];
      newWalletsArr.push(walletInput);
      setWallets(newWalletsArr);
      setWalletInput("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-4">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {wallets.length > 0 && (
            <>
              {wallets.map((wallet, idx) => {
                return <div key={idx}>{wallet}</div>;
              })}
            </>
          )}
          <form className="pt-6" onSubmit={(e) => addWallet(e)}>
            <div className="flex items-center justify-between">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="wallet key"
                value={walletInput}
                onChange={(e) => setWalletInput(e.target.value)}
              />
              <div className="pl-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="p-4">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div>
            Total Balance:{" "}
            {numWithCommas((totalBalance / LAMPORTS_PER_SOL).toFixed(2))} SOL -{" "}
            {numWithCommas(
              (solanaUSD * (totalBalance / LAMPORTS_PER_SOL)).toFixed(2)
            )}{" "}
            USD
          </div>
        </div>
      </div>
      {allTokenData.length > 0 && (
        <div className="p-4">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="font-bold grid grid-cols-1 gap-8 my-10 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
              <div>Asset</div>
              <div>Amount</div>
              <div>Token name</div>
              <div>Value</div>
            </div>
            {allTokenData.map((token, idx) => {
              if (token.amount != 0 && !token.name.includes("SCAM")) {
                return (
                  <div
                    key={idx}
                    className="grid grid-cols-1 gap-8 my-10 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2"
                  >
                    <div className="flex items-center">
                      {imgHostSupport(token.logoURI) && (
                        <Image
                          src={token.logoURI}
                          alt={token.name}
                          width="32"
                          height="32z"
                        />
                      )}

                      <span className="ml-2">{token.symbol}</span>
                    </div>
                    <div>
                      {(token.amount / 10 ** token.decimals).toFixed(2)}
                    </div>
                    <div>{token.name}</div>
                    <div>
                      {token.priceUSD && (
                        <span>
                          {numWithCommas(
                            (
                              (token.amount / 10 ** token.decimals) *
                              token.priceUSD
                            ).toFixed(2)
                          )}{" "}
                          USD
                        </span>
                      )}
                    </div>
                  </div>
                );
              }
              return;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
