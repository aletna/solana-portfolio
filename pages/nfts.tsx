import Link from "next/link";
import Layout from "../components/Layout";
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import { NftCard } from "../components/NftCard";
import { useEffect, useState } from "react";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";

const nfts = () => {
  const [allNfts, setAllNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //   const res = [1, 2].map((uid) =>
  //     useWalletNfts({
  //       publicAddress: process.env.NEXT_PUBLIC_WALLET_2,
  //     })
  //   );

  useEffect(() => {
    getTokens([
      process.env.NEXT_PUBLIC_WALLET_2,
      process.env.NEXT_PUBLIC_WALLET_3,
      process.env.NEXT_PUBLIC_WALLET_1,
    //   process.env.NEXT_PUBLIC_WALLET_4,
    //   process.env.NEXT_PUBLIC_WALLET_5,
    //   process.env.NEXT_PUBLIC_WALLET_6,
    //   process.env.NEXT_PUBLIC_WALLET_7,
    //   process.env.NEXT_PUBLIC_WALLET_8,
    //   process.env.NEXT_PUBLIC_WALLET_9,
    //   process.env.NEXT_PUBLIC_WALLET_10,
    //   process.env.NEXT_PUBLIC_WALLET_11,
    ]);
  }, []);
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
      {nfts?.map((nft) => {
        //   TODO: do a check if src exists
        if (nft.data.uri.split(".").slice(-1)[0] != "txt") {
          return <NftCard key={nft.mint} details={nft} onSelect={() => {}} />;
        }
        return;
      })}
    </div>
  );
};
