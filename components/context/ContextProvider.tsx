import { ReactNode, useState } from "react";
import { UserContextProvider } from "./user";

type Props = {
  children?: ReactNode;
};

const ContextProvider = ({ children }: Props) => {
  const [wallets, setWallets] = useState<string[]>([]);

  const updateWallets = (_wallets: string[]) => {
    setWallets(_wallets);
  };

  const userContextValues = {
    wallets,
    updateWallets,
  };
  return (
    <UserContextProvider value={userContextValues}>
      {children}
    </UserContextProvider>
  );
};

export default ContextProvider;
