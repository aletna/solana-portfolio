import Link from "next/link";
import Layout from "../components/Layout";
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import { NftCard } from "../components/NftCard";
import { useContext, useEffect, useState } from "react";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import UserContext from "../components/context/user";

const nfts = () => {
  const [allNfts, setAllNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userContext = useContext(UserContext)

  useEffect(() => {
    console.log(userContext.wallets);
    
    getTokens(userContext.wallets);
  }, [userContext.wallets]);

  const getTokens = async (wallets: string[]) => {
    const tokenList = [];
    console.log(wallets);

    for (const wallet of wallets) {
      if (wallet) {
        const tokens = await getParsedNftAccountsByOwner({
          publicAddress: wallet,
        });
        tokenList.push(tokens);
      }
    }
    var mergedTokenList = [].concat.apply([], tokenList);
    console.log(mergedTokenList);
    setAllNfts(mergedTokenList);
    setIsLoading(false);
  };

  return (
    <Layout title="NFTs" heading="NFTs">
      <div className="my-10">
        {isLoading ? <div>loading...</div> : <NftList nfts={allNfts} />}
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
  } else {
    console.log(nfts);
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
      {nfts?.map((nft,idx) => {
        //   TODO: do a check if src exists
        if (nft.data.uri.split(".").slice(-1)[0] != "txt") {
          return <NftCard key={idx} details={nft} onSelect={() => {}} />;
        }
        return;
      })}
    </div>
  );
};
