import { IconEmptyFollow } from "components/Icons";
import Meta from "components/Meta";
import LayoutPrimary from "layouts/LayoutPrimary";
import MovieCard from "modules/MovieCard";
import MovieList from "modules/MovieList";
import { useAppSelector } from "store/global-store";

const FollowPage = () => {
  const { follows } = useAppSelector((state) => state.follow);
  return (
    <LayoutPrimary>
      <Meta title="Follow - NetFilm" />
      <div className="container">
        {follows.length > 0 && (
          <MovieList>
            {follows.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                domainType={movie.domainType}
                poster={movie.poster}
              />
            ))}
          </MovieList>
        )}
        {follows.length === 0 && (
          <div className="section-empty">
            <IconEmptyFollow />
            <span>No follow movie found</span>
          </div>
        )}
      </div>
    </LayoutPrimary>
  );
};

export default FollowPage;
