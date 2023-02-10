import { IHistoryView } from "types";
import { IconEmptyHistory, IconTrash } from "components/Icons";
import { Image } from "components/Image";
import Meta from "components/Meta";
import WrapLink from "components/WrapLink";
import { LocalStorage } from "constants/localStorage";
import { PATH } from "constants/path";
import LayoutPrimary from "layouts/LayoutPrimary";
import { MovieListSkeleton } from "modules/MovieSkeleton";
import MovieTitle from "modules/MovieTitle";
import { useEffect, useState } from "react";
import styles from "styles/history.module.scss";
import { formatTimeDuration } from "utils/helper";

const HistoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<IHistoryView[]>([]);
  const handleClearHistory = () => {
    localStorage.removeItem(LocalStorage.history);
    setHistory([]);
  };
  useEffect(() => {
    const historyLocalStorage: IHistoryView[] = JSON.parse(
      localStorage.getItem(LocalStorage.history) || "[]"
    );
    setHistory(historyLocalStorage);
    setLoading(false);
  }, []);
  return (
    <LayoutPrimary>
      <Meta title="History - NetFilm" />
      <div className="container">
        {loading ? (
          <MovieListSkeleton count={6} />
        ) : (
          <>
            <div className={styles.header}>
              <h2>Watch history</h2>
              <button className={styles.cleanHistory} onClick={handleClearHistory}>
                <IconTrash width={12} height={12} />
                Clear history
              </button>
            </div>
            {history.length > 0 && (
              <div className="history-list">
                {history.map((movie) => {
                  const href = `${PATH.watch}/${movie.category}/${movie.id}`;
                  return (
                    <div className={styles.movieCard} key={movie.key}>
                      <WrapLink href={href} className={styles.movieCardMedia}>
                        <Image
                          alt={movie.name}
                          width={312}
                          height={175}
                          src={movie.coverHorizontalUrl}
                          className={styles.movieCardPoster}
                        />
                        <span className={styles.totalDuration}>
                          {formatTimeDuration(Number(movie.totalDuration.toFixed()))}
                        </span>
                        <div className={styles.progress}>
                          <div
                            className={styles.currentTime}
                            style={{ width: `${movie.progress.toFixed()}%` }}
                          ></div>
                        </div>
                        <picture>
                          <img src="/icon-play.png" alt="play" className={styles.movieCardPlay} />
                        </picture>
                      </WrapLink>
                      <MovieTitle href={href} className={styles.movieCardTitle}>
                        {movie.name} {movie.currentEpName && `- ${movie.currentEpName}`}
                      </MovieTitle>
                    </div>
                  );
                })}
              </div>
            )}
            {history.length === 0 && (
              <div className="section-empty">
                <IconEmptyHistory />
                <span>No watch history found</span>
              </div>
            )}
          </>
        )}
      </div>
    </LayoutPrimary>
  );
};

export default HistoryPage;
