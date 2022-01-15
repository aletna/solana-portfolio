import { ReactNode, useContext, useEffect } from "react";
import UserContext from "./user";

type Props = {
  children?: ReactNode;
};

const UserContextInit = ({ children }: Props) => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    userContext.updateWallets([
    //   process.env.NEXT_PUBLIC_WALLET_1,
    //   process.env.NEXT_PUBLIC_WALLET_4,
    ]);
  }, []);
  return <div>{children}</div>;
};

export default UserContextInit;
