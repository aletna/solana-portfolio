import React, { useContext, useEffect, useState } from "react";
import UserContext from "./context/user";
import { isValidSolanaAddress } from "@nfteyez/sol-rayz";
import { useCookies } from "react-cookie";

const Wallets = () => {
  const [wallets, setWallets] = useState([]);
  const [walletInput, setWalletInput] = useState("");

  const [cookie, setCookie] = useCookies(["wallets"]);

  const userContext = useContext(UserContext);

  const addWallet = (e: any) => {
    e.preventDefault();

    if (walletInput.length > 0) {
      const isValidAddress: boolean = isValidSolanaAddress(walletInput);
      if (isValidAddress) {
        const _wallets = [...wallets];
        _wallets.push(walletInput);
        userContext.updateWallets(_wallets);
        setCookie("wallets", JSON.stringify(_wallets), {
          // path: "/", 
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        });
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
      <div className="bg-port-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="text-xl mb-4">Add Wallets</div>
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
              className="shadow appearance-none border bg-port-100 rounded w-full py-2 px-3 text-port-600 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="wallet key"
              value={walletInput}
              onChange={(e) => setWalletInput(e.target.value)}
            />
            <div className="pl-4">
              <button
                className="bg-port-500 hover:bg-port-600 active:bg-port-700 transition transform ease-in-out duration-300 text-port-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
