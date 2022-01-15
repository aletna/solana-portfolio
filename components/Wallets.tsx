import React, { useContext, useEffect, useState } from "react";
import UserContext from "./context/user";
import { isValidSolanaAddress } from "@nfteyez/sol-rayz";

// type Props = {
//   wallets: string[];
//   addWallet: any;
//   walletInput: string;
//   setWalletInput: any;
// };
// wallets,
// addWallet,
// walletInput,
// setWalletInput,
// }: Props
const Wallets = () => {
  const [wallets, setWallets] = useState([]);
  const [walletInput, setWalletInput] = useState("");

  const userContext = useContext(UserContext);

  const addWallet = (e: any) => {
    e.preventDefault();

    if (walletInput.length > 0) {
      const isValidAddress: boolean = isValidSolanaAddress(walletInput);
      if (isValidAddress) {
        const _wallets = [...wallets];
        _wallets.push(walletInput);
        // setWallets(_wallets);
        userContext.updateWallets(_wallets);
        setWalletInput("");
      } else {
        console.log("invalid solana address");
      }
    }
  };
  useEffect(() => {
    setWallets(userContext.wallets);
  }, [userContext.wallets]);

  return (
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
  );
};

export default Wallets;
