import React from "react";
import { numWithCommas } from "../utils/utils";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
type Props = {
  solBalance: number;
  totalBalance: number;
  solanaUSD: number;
};

const WalletSummary = ({ solBalance, totalBalance, solanaUSD }: Props) => (
  <div className="p-4 text-xl ">
    <div className="bg-port-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-cols-1 gap-x-8 gap-y-4  lg:grid-cols-3  ">
      <div className="font-bold ">SOL Balance:</div>

      <div className="">
        {numWithCommas((solBalance / LAMPORTS_PER_SOL).toFixed(2))} SOL
      </div>
      <div className="italic">
        {numWithCommas(
          (solanaUSD * (solBalance / LAMPORTS_PER_SOL)).toFixed(2)
        )}{" "}
        USD
      </div>
      <div className="font-bold ">Total Balance:</div>
      <div></div>
      <div className="italic">
        {numWithCommas((totalBalance).toFixed(2))} USD
      </div>

    </div>
  </div>
);

export default WalletSummary;
