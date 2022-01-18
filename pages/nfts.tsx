import Link from "next/link";
import Layout from "../components/Layout";
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import { NftCard } from "../components/NftCard";
import { useContext, useEffect, useState } from "react";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import UserContext from "../components/context/user";

const nfts = () => {

  const [isLoading, setIsLoading] = useState(true);
  const userContext = useContext(UserContext);

  useEffect(() => {
    getTokens(userContext.wallets);
  }, [userContext.wallets]);

  const getTokens = async (wallets: string[]) => {
    const tokenList = [];
    

    for (const wallet of wallets) {
      if (wallet) {
        const tokens = await getParsedNftAccountsByOwner({
          publicAddress: wallet,
        });

        for (const token of tokens) {
          if (token.data.uri.split(".").slice(-1)[0] != "txt") {
            tokenList.push(token);
          }
        }
      }
    }
    var mergedTokenList = [].concat.apply([], tokenList);
    if (mergedTokenList.length > 0) {
      userContext.updateAllNfts(mergedTokenList);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="NFTs" heading="NFTs">
      <div className="my-10">
        {isLoading ? <div>loading...</div> : <NftList nfts={userContext.allNfts} />}
      </div>
    </Layout>
  );
};

export default nfts;

type NftListProps = {
  nfts: NftTokenAccount[];
  error?: Error;
};

const NftList = ({ nfts, error }: NftListProps) => {
  if (error) {
    return null;
  }

  if (!nfts?.length) {
    return <div className="text-center text-2xl pt-16">No NFTs found.</div>;
  } 

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
      {nfts?.map((nft, idx) => {
        //   TODO: do a check if src exists
        return <NftCard key={idx} details={nft} onSelect={() => {}} />;
      })}
    </div>
  );
};
