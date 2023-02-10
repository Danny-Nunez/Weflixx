import MovieList from "modules/MovieList";
import MovieSkeleton from "./MovieSkeleton";
import styles from "./movieSkeleton.module.scss";

interface MovieListSkeletonProps {
  hasHeading?: boolean;
  count?: number;
}

const MovieListSkeleton = ({ hasHeading = false, count = 6 }: MovieListSkeletonProps) => {
  return (
    <div className={styles.section}>
      {hasHeading && <div className={styles.heading}></div>}
      <MovieList>
        {Array(count)
          .fill(0)
          .map((item, index) => (
            <MovieSkeleton key={index} />
          ))}
      </MovieList>
    </div>
  );
};

export default MovieListSkeleton;
