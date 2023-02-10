import axiosClient from "configs/axiosClient";
import { REVALIDATE_TIME } from "constants/global";
import LayoutPrimary from "layouts/LayoutPrimary";
import CheckInView from "modules/CheckInView";
import HomeBanner from "modules/HomeBanner";
import MovieCard from "modules/MovieCard";
import MovieList from "modules/MovieList";
import { MovieListSkeleton } from "modules/MovieSkeleton";
import { GetStaticProps } from "next";
import queryString from "query-string";
import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import { IBanner, ICategoryResult, IHomeSection } from "types";

interface HomePageProps {
  banners: IBanner[];
}

const HomePage = ({ banners }: HomePageProps) => {
  const getApiUrl = (index: number, prevData: ICategoryResult[] | null) => {
    const isEmptyData = prevData?.length === 0;
    if (isEmptyData) return null;
    const sort = prevData?.[prevData.length - 1]?.sort || "";
    const apiURL = `/api/category?${queryString.stringify({ area: "61", size: 12, sort })}`;
    return apiURL;
  };
  const {
    data: movies = [],
    setSize,
    error
  } = useSWRInfinite(
    getApiUrl,
    async (apiURL: string) => {
      const { data } = await axiosClient.get(apiURL);
      return data;
    },
    { revalidateFirstPage: false, fallbackData: [] }
  );
  const isReachingEnd = movies?.[movies.length - 1]?.length === 0;
  const hasNextPage = movies && !error && !isReachingEnd;
  const handleLoadMore = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);
  return (
    <LayoutPrimary>
      <div className="container">
        <HomeBanner banners={banners} />
        <div style={{ marginTop: "40px" }}>
          {(movies.length as number) > 0 ? (
            <MovieList>
              {movies.flat().map((result: ICategoryResult) => (
                <MovieCard
                  key={result.id}
                  id={result.id}
                  title={result.name}
                  domainType={result.domainType}
                  poster={result.coverVerticalUrl}
                />
              ))}
            </MovieList>
          ) : (
            <MovieListSkeleton count={12} />
          )}
          {hasNextPage && (
            <CheckInView onInView={handleLoadMore}>
              <MovieListSkeleton />
            </CheckInView>
          )}
        </div>
      </div>
    </LayoutPrimary>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: banners } = await axiosClient.get(`/api/banner`);
    return {
      props: { banners },
      revalidate: REVALIDATE_TIME.success
    };
  } catch (error) {
    return {
      props: { banners: [] },
      revalidate: REVALIDATE_TIME.fail
    };
  }
};

export default HomePage;
