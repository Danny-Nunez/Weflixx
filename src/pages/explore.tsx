import { ICategoryResult, IFilter, IFilterOptions } from "types";
import Dropdown from "components/Dropdown";
import Meta from "components/Meta";
import axiosClient from "configs/axiosClient";
import LayoutPrimary from "layouts/LayoutPrimary";
import CheckInView from "modules/CheckInView";
import MovieCard from "modules/MovieCard";
import MovieList from "modules/MovieList";
import { MovieListSkeleton } from "modules/MovieSkeleton";
import { GetServerSideProps } from "next";
import queryString from "query-string";
import { useCallback, useState } from "react";
import useSWRInfinite from "swr/infinite";

interface ExplorePageProps {
  filters: IFilter[];
}

const ExplorePage = ({ filters }: ExplorePageProps) => {
  const [options, setOptions] = useState<IFilterOptions[]>(filters[0].screeningItems);
  const [params, setParams] = useState({
    area: "",
    category: 1,
    order: "up",
    size: 12,
    params: filters[0].params,
    sort: "",
    subtitles: "",
    year: ""
  });
  const getApiUrl = (index: number, prevData: ICategoryResult[] | null) => {
    const isEmptyData = prevData?.length === 0;
    if (isEmptyData) return null;
    const sort = prevData?.[prevData.length - 1]?.sort || "";
    const apiURL = `/api/category?${queryString.stringify({ ...params, sort })}`;
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
      <Meta title="Explore - NetFilm" />
      <div className="container">
        <MovieList>
          <Dropdown placeholder="All type">
            <Dropdown.Select />
            <Dropdown.List>
              {filters.length > 0 &&
                filters.map((filter: IFilter) => (
                  <Dropdown.Option
                    key={filter.id}
                    handleClickOption={(e, setTitle) => {
                      setTitle(filter.name);
                      setParams({ ...params, params: filter.params });
                      setOptions(filter.screeningItems);
                    }}
                  >
                    {filter.name}
                  </Dropdown.Option>
                ))}
            </Dropdown.List>
          </Dropdown>
          {options.map((option, index) => (
            <Dropdown placeholder={option.id ? option.name : option.items[0].name} key={index}>
              <Dropdown.Select />
              <Dropdown.List>
                {option.items.length > 0 &&
                  option.items.map((item) => (
                    <Dropdown.Option
                      key={item.params}
                      handleClickOption={(e, setTitle) => {
                        setTitle(item.name);
                        setParams({ ...params, [item.screeningType]: item.params });
                      }}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
          ))}
        </MovieList>
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
    </LayoutPrimary>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data: filters } = await axiosClient.get(`/api/filter`);
    return {
      props: { filters: filters }
    };
  } catch (error) {
    return {
      props: { filters: [] }
    };
  }
};

export default ExplorePage;
