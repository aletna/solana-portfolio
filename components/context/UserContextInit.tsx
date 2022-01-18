import { ReactNode, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import UserContext from "./user";
import { isValidSolanaAddress } from "@nfteyez/sol-rayz";

type Props = {
  children?: ReactNode;
};

const UserContextInit = ({ children }: Props) => {
  const userContext = useContext(UserContext);
  const [cookies] = useCookies();

  useEffect(() => {
    console.log(cookies.wallets);
    if (cookies.wallets?.length > 0) {
      const validWallets = [];
      for (const wallet of cookies.wallets) {
        if (isValidSolanaAddress(wallet) && !validWallets.includes(wallet)) {
          console.log(validWallets)
          validWallets.push(wallet);
        }
      }
      userContext.updateWallets(validWallets);
    } else {
      userContext.updateWallets([]);
    }
  }, []);
  return <div>{children}</div>;
};

export default UserContextInit;
