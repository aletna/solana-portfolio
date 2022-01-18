import { createContext } from "react";

export interface UserProps {
  wallets: string[];
  updateWallets: (wallets: string[]) => void;
  tokens: any[];
  updateTokens: () => void;
  solanaBalance: number;
  updateSolanaBalance: () => void;
  solanaPrice: number;
  updateSolanaPrice: () => void;
  tokenValue: number;
  updateTokenValue: () => void;
  totalValue: number;
  updateTotalValue: () => void;
}

const UserContext = createContext<UserProps>({
  wallets: [],
  updateWallets: (wallets: string[]) => {},
  tokens: [],
  updateTokens: () => {},
  solanaBalance: 0,
  updateSolanaBalance: () => {},
  solanaPrice: 0,
  updateSolanaPrice: () => {},
  tokenValue: 0,
  updateTokenValue: () => {},
  totalValue: 0,
  updateTotalValue: () => {},
});

export const UserContextConsumer = UserContext.Consumer;
export const UserContextProvider = UserContext.Provider;

export default UserContext;
