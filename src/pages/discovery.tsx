import { IDiscovery } from "types";
import LoadingSpinner from "components/LoadingSpinner";
import Meta from "components/Meta";
import axiosClient from "configs/axiosClient";
import LayoutPrimary from "layouts/LayoutPrimary";
import CheckInView from "modules/CheckInView";
import DiscoveryCard from "modules/DiscoveryCard";
import { GetServerSideProps } from "next";
import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";

interface DiscoveryPageProps {
  initialVideos: IDiscovery[];
}

const DiscoveryPage = ({ initialVideos }: DiscoveryPageProps) => {
  const getApiUrl = (index: number) => `/api/discovery?page=${index + 1}`;
  const {
    data: videos,
    error,
    setSize
  } = useSWRInfinite(
    getApiUrl,
    async (apiUrl: string) => {
      const { data } = await axiosClient.get(apiUrl);
      return data;
    },
    { revalidateFirstPage: false, fallbackData: [] }
  );
  const isReachingEnd = videos?.[videos.length - 1]?.length === 0;
  const hasNextPage = videos && !error && !isReachingEnd;
  const handleLoadMore = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);
  return (
    <LayoutPrimary>
      <Meta title="Discovery - NetFilm" />
      <div className="container">
        <div className="wrapper">
          {initialVideos.map((video) => (
            <DiscoveryCard key={video.id} info={video} />
          ))}
          {videos?.flat().map((video) => (
            <DiscoveryCard key={video.id} info={video} />
          ))}
        </div>
        {hasNextPage && (
          <CheckInView onInView={handleLoadMore}>
            <LoadingSpinner />
          </CheckInView>
        )}
      </div>
    </LayoutPrimary>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data } = await axiosClient.get(`/api/discovery`, { params: query });
  return {
    props: { initialVideos: data }
  };
};

export default DiscoveryPage;
