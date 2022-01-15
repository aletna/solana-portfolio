import React from "react";
import { imgHostSupport, numWithCommas } from "../utils/utils";
import Image from "next/image";
type Props = {
  tokenData: any[];
};

const TokenTable = ({ tokenData }: Props) => (
  <div>
    {tokenData.length > 0 && (
      <div className="p-4">
        <div className="bg-port-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="text-xl mb-4 font-bold">Tokens</div>
          <div className="rounded">
            <div className="font-bold grid grid-cols-4 gap-8 my-10  ">
              <div>Asset</div>
              <div>Amount</div>
              <div>Token name</div>
              <div>Value</div>
            </div>
            {tokenData.map((token, idx) => {
              if (token.amount != 0 && !token.name.includes("SCAM")) {
                return (
                  <div key={idx} className="grid  gap-8 my-10 grid-cols-4 ">
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
      </div>
    )}
  </div>
);

export default TokenTable;
