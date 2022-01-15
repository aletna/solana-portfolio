import * as anchor from "@project-serum/anchor";
import { TokenListProvider } from "@solana/spl-token-registry";

const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
const connection: any = new anchor.web3.Connection(endpoint);

export const getAllTokenData = async (walletKeyAsString: string) => {
  let walletKey = new anchor.web3.PublicKey(walletKeyAsString);
  const splTokenRes = await connection.getParsedTokenAccountsByOwner(
    walletKey,
    {
      programId: new anchor.web3.PublicKey(
        "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
      ),
    }
  );
  return splTokenRes && splTokenRes;
};

export const getAllTokenDataFiltered = async (wallets: string[]) => {
  const allTokenData = [];
  for (let i = 0; i < wallets.length; i++) {
    let res = await _getAllTokenDataFiltered(wallets[i]);
    if (res) {
      allTokenData.push({ [wallets[i]]: res });
    }
  }
  return allTokenData;
};
const _getAllTokenDataFiltered = async (walletKeyAsString: string) => {
  const tokens = await getAllTokenData(walletKeyAsString);
  let tokenList = await new TokenListProvider().resolve().then((tokens) => {
    const tokenList = tokens.filterByClusterSlug("mainnet-beta").getList();
    return tokenList;
  });
  let allTokens = [];
  if (tokens && tokens.value) {
    for (const token of tokens.value) {
      const mint = token.account.data.parsed.info.mint;
      const amount = token.account.data.parsed.info.tokenAmount.amount;
      for (const tkn of tokenList) {
        if (tkn.address == mint) {
          const name = tkn.name;
          const symbol = tkn.symbol;
          const tags = tkn.tags;
          const logoURI = tkn.logoURI;
          const decimals = tkn.decimals;
          const priceUSD = await getTokenPrice(mint, symbol);
          if (!name.includes("SCAM")) {
            allTokens.push({
              name,
              symbol,
              amount,
              mint,
              tags,
              logoURI,
              decimals,
              priceUSD,
            });
          }
        }
      }
    }
  }
  return allTokens;
};

export const aggregateTokenData = (tokenData: any[]) => {
  let allTokens = [];
  let uniqueMints = [];
  for (const tknData of tokenData) {
    allTokens = allTokens.concat(Object.values(tknData)[0]);
  }
  const allAggregatedTokens = {};
  for (const tkn of allTokens) {
    if (!uniqueMints.includes(tkn.mint)) {
      uniqueMints.push(tkn.mint);
      allAggregatedTokens[tkn.mint] = tkn;
    } else {
      if (tkn.amount > 0) {
        const currentAmount = parseFloat(allAggregatedTokens[tkn.mint].amount);
        const newAmount = parseFloat(tkn.amount);
        allAggregatedTokens[tkn.mint].amount = currentAmount + newAmount;
      }
    }
  }
  return Object.values(allAggregatedTokens);
};

export const getAccountInfo = async (walletKeyAsString: string) => {
  let walletKey = new anchor.web3.PublicKey(walletKeyAsString);
  const accountInfo = await connection.getParsedAccountInfo(walletKey);
  return accountInfo && accountInfo;
};

export const getSolBalance = async (walletKeyAsString: string) => {
  let walletKey = new anchor.web3.PublicKey(walletKeyAsString);
  const balance = await connection.getBalance(walletKey);
  return balance && balance;
};

export const getTotalSolBalance = async (wallets: string[]) => {
  let balance = 0;
  for (let i = 0; i < wallets.length; i++) {
    let res = await getSolBalance(wallets[i]);
    if (res) {
      balance = balance + res;
    }
  }
  return balance;
};

export const getTransactions = async (
  walletKey: string,
  limit: string,
  beforeHash?: string
) => {
  const beforeHashData = beforeHash ? "&beforeHash=" + beforeHash : "";
  const res = await fetch(
    "https://public-api.solscan.io/account/transactions?account=" +
      walletKey +
      beforeHashData +
      "&limit=" +
      limit
  );
  const result = await res.json();
  return result;
};

export const getAllTransactions = async (walletKey: string) => {
  const res = await fetch(
    "https://public-api.solscan.io/account/exportTransactions?account=" +
      walletKey +
      "&type=all&fromTime=1610580437&toTime=1642116437"
  );
  const resAsText = await res.text();
  const transactionData = formatGetAllTransactions(resAsText);
  return transactionData;
};

const formatGetAllTransactions = (text) => {
  var lines = text.split("\n");

  var result = [];

  // NOTE: If your columns contain commas in their values, you'll need
  // to deal with those before doing the next step
  // (you might convert them to &&& or something, then covert them back later)
  // jsfiddle showing the issue https://jsfiddle.net/
  var headers = [];
  lines[0].split(",").forEach((el) => headers.push(el.trim()));

  for (var i = 1; i < lines.length; i++) {
    if (lines[i].length != 0) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
  }
  return result; //JavaScript object
  // return JSON.stringify(result); //JSON
};

export const getSolanaUSD = async () => {
  const res = await fetch(
    "https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT"
  );
  const data = await res.json();
  return parseFloat(data.price);
};

export const getTokenPrice = async (mint: string, symbol?: string) => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/token_price/solana?contract_addresses=" +
      mint +
      "&vs_currencies=usd"
  );
  const priceData = await res.json();
  if (Object.keys(priceData).length !== 0) {
    return parseFloat(priceData[mint].usd);
  }
  if (symbol && (symbol == "USDC" || symbol == "USDT")) {
    return 1;
  }
};
