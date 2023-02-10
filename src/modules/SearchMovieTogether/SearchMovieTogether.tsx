import { IconSearch } from "components/Icons";
import { Image } from "components/Image";
import axiosClient from "configs/axiosClient";
import { IMAGE_SIZE, resizeImageLoklok } from "constants/global";
import { auth } from "libs/firebase-app";
import stylesCard from "modules/MovieCard/movieCard.module.scss";
import MovieList from "modules/MovieList";
import { MovieListSkeleton } from "modules/MovieSkeleton";
import MovieTitle from "modules/MovieTitle";
import styles from "modules/SearchBox/searchBox.module.scss";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { IMovieSearch, IRoomInfo } from "types";
import classNames from "utils/classNames";

interface SearchMovieTogetherProps {
  setIsModeAdd: Dispatch<SetStateAction<boolean>>;
  setValues: Dispatch<SetStateAction<Omit<IRoomInfo, "id"> | null>>;
}

const SearchMovieTogether = ({ setIsModeAdd, setValues }: SearchMovieTogetherProps) => {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<IMovieSearch[]>([]);
  const handleClickMovie = (movie: IMovieSearch) => {
    setIsModeAdd(true);
    setValues({
      categoryId: movie.domainType.toString(),
      currentTime: 0,
      episodeId: "",
      hostId: auth.currentUser?.uid as string,
      messages: [],
      movieId: movie.id,
      thumbnail: movie.coverHorizontalUrl,
      title: movie.name,
      createdAt: Date.now()
    });
  };
  const handleChangeKeyword = async (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosClient.get("/api/search", { params: { keyword } });
      setMovies(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setKeyword("");
      setLoading(false);
    }
  };
  return (
    <div>
      <h3 style={{ marginBottom: "20px" }}>Search movie to create room</h3>
      <div className={classNames(styles.searchBox)}>
        <form className={styles.searchBar} onSubmit={handleSubmit}>
          <input
            type="text"
            value={keyword}
            className={styles.searchInput}
            placeholder="Search movie..."
            onChange={handleChangeKeyword}
          />
          <button type="submit" className={styles.searchButton}>
            <IconSearch />
          </button>
        </form>
      </div>
      {loading && <MovieListSkeleton count={12} />}
      {!loading && (
        <MovieList>
          {movies.map((movie) => (
            <div
              className={stylesCard.movieCard}
              key={movie.id}
              onClick={() => handleClickMovie(movie)}
            >
              <div className={stylesCard.movieCardMedia}>
                <Image
                  alt={movie.name}
                  className={stylesCard.movieCardPoster}
                  src={resizeImageLoklok(
                    movie.coverVerticalUrl,
                    IMAGE_SIZE.movieCard.width,
                    IMAGE_SIZE.movieCard.height
                  )}
                />
              </div>
              <MovieTitle className={stylesCard.movieCardTitle}>{movie.name}</MovieTitle>
            </div>
          ))}
        </MovieList>
      )}
    </div>
  );
};

export default SearchMovieTogether;
