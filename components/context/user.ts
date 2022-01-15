import { createContext } from "react";

export interface UserProps {
  wallets: string[];
  updateWallets: (wallets: string[]) => void;
}

const UserContext = createContext<UserProps>({
  wallets: [],
  updateWallets: (wallets: string[]) => {},
});

export const UserContextConsumer = UserContext.Consumer;
export const UserContextProvider = UserContext.Provider;

export default UserContext;
