import React, { useContext } from "react";
import TokenTable from "./TokenTable";
import WalletSummary from "./WalletSummary";
import Wallets from "./Wallets";
import UserContext from "./context/user";

type Props = {};

const Overview = ({}: Props) => {

  const userContext = useContext(UserContext);

  return (
    <div>
      {userContext.wallets?.length > 0 ? (
        <div className="mx-auto w-full">
          <WalletSummary
            solBalance={userContext.solanaBalance}
            totalBalance={userContext.totalValue}
            solanaUSD={userContext.solanaPrice}
          />
          <TokenTable tokenData={userContext.tokens} />
        </div>
      ) : (
        <div>
          <div className="text-center text-2xl pt-16 pb-8">
            No wallet connected.
          </div>
          <Wallets />
        </div>
      )}
    </div>
  );
};

export default Overview;
