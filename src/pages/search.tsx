import { IMovieSearch } from "types";
import Meta from "components/Meta";
import axiosClient from "configs/axiosClient";
import LayoutPrimary from "layouts/LayoutPrimary";
import MovieCard from "modules/MovieCard";
import MovieList from "modules/MovieList";
import SearchBox from "modules/SearchBox";
import { GetServerSideProps } from "next";

interface SearchPageProps {
  keyword: string;
  results: IMovieSearch[];
}

const SearchPage = ({ results, keyword }: SearchPageProps) => {
  return (
    <LayoutPrimary>
      <Meta title={`${keyword || "Search"} - NetFilm`} />
      <div className="container">
        <SearchBox className="searchBox-large" />
        <MovieList heading={keyword && `Keyword: ${keyword}`}>
          {results.map((result) => (
            <MovieCard
              id={result.id}
              key={result.id}
              title={result.name}
              domainType={result.domainType}
              poster={result.coverVerticalUrl}
            />
          ))}
        </MovieList>
      </div>
    </LayoutPrimary>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data } = await axiosClient.get("/api/search", { params: query });
  return {
    props: { results: data.results, keyword: data.keyword }
  };
};

export default SearchPage;
