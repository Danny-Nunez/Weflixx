import { ICategoryResult, IFilter } from "types";
import Meta from "components/Meta";
import axiosClient from "configs/axiosClient";
import LayoutPrimary from "layouts/LayoutPrimary";
import CheckInView from "modules/CheckInView";
import MovieCard from "modules/MovieCard";
import MovieList from "modules/MovieList";
import { MovieListSkeleton } from "modules/MovieSkeleton";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";

interface CategoryPageProps {
  filters: IFilter[];
}

const CategoryPage = ({ filters }: CategoryPageProps) => {
  const { query } = useRouter();
  const { category } = query;
  const nameCategory = filters[0]?.screeningItems
    .find((item) => item.id === 5)
    ?.items.find((cate) => cate.params === category)?.name;
  const getApiUrl = (index: number, prevData: ICategoryResult[] | null) => {
    const isEmptyData = prevData?.length === 0;
    if (isEmptyData) return null;
    const sort = prevData?.[prevData.length - 1]?.sort || "";
    const apiURL = `/api/category?${queryString.stringify({ category, sort })}`;
    return apiURL;
  };
  const {
    data: movies,
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
      <Meta title="Category - NetFilm" />
      <div className="container">
        <h3>{nameCategory}</h3>
        {(movies?.flat()?.length as number) > 0 ? (
          <MovieList>
            {movies?.flat()?.map((result: ICategoryResult) => (
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
    </LayoutPrimary>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data } = await axiosClient.get(`/api/filter`, { params: query });
  return {
    props: { filters: data }
  };
};

export default CategoryPage;
