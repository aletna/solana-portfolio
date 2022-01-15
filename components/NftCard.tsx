import { FC, useState, useEffect } from "react";
import useSWR from "swr";

import { fetcher } from "../utils/fetcher";

type Props = {
  details: any;
  onSelect: (id: string) => void;
  onTokenDetailsFetched?: (props: any) => unknown;
};

export const NftCard: FC<Props> = ({
  details,
  onSelect,
  onTokenDetailsFetched = () => {},
}) => {
  const [fallbackImage, setFallbackImage] = useState(false);
  const { uri } = details?.data ?? {};

  const { data, error } = useSWR(uri, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  useEffect(() => {
    if (!error && !!data) {
      onTokenDetailsFetched(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  const onImageError = () => setFallbackImage(true);
  const { image } = data ?? {};

  const handleClick = () => {
    image && window.open(image, "_blank");
  };

  return (
    <div className={`card bordered max-w-xs compact rounded-md`}>
      <figure className="min-h-16  shadow-md hover:shadow-xl transition ease-in-out duration-300 object-none animation-pulse-color">
        {!fallbackImage || !error ? (
          <img
            onClick={handleClick}
            alt={details.data.name}
            src={image}
            onError={onImageError}
            className="bg-gray-800  mx-auto w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 object-cover cursor-pointer hover:shadow-md rounded-t"
          />
        ) : (
          // Fallback when preview isn't available
          // This could be broken image, video, or audio
          <div className="w-auto h-48 flex items-center justify-center bg-port-800 bg-opacity-40">
            400
          </div>
        )}
        <div className="rounded-b bg-port-800 text-port-100 p-4">Token</div>
      </figure>
      {/* <div className="card-body">
        <h2 className="card-title text-sm text-left">{name}</h2>
      </div> */}
    </div>
  );
};
