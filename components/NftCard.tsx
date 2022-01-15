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

  const { data, error } = useSWR(
    uri,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
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
      <figure className="min-h-16 animation-pulse-color">
        {!fallbackImage || !error ? (
          <img
            onClick={handleClick}
            alt={details.data.name}
            src={image}
            onError={onImageError}
            className="bg-gray-800 object-cover cursor-pointer hover:shadow-md"
          />
        ) : (
          // Fallback when preview isn't available
          // This could be broken image, video, or audio
          <div className="w-auto h-48 flex items-center justify-center bg-gray-900 bg-opacity-40">
            400
          </div>
        )}
      </figure>
      {/* <div className="card-body">
        <h2 className="card-title text-sm text-left">{name}</h2>
      </div> */}
    </div>
  );
};
