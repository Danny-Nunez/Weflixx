import { IEpisode, IHistoryView } from "types";
import Meta from "components/Meta";
import { resizeImageLoklok } from "constants/global";
import { LocalStorage } from "constants/localStorage";
import { v4 as uuidv4 } from "uuid";
import LayoutPrimary from "layouts/LayoutPrimary";
import CommentList from "modules/CommentList";
import MediaPlayer from "modules/MediaPlayer";
import MovieCard from "modules/MovieCard";
import MovieList from "modules/MovieList";
import RelatedSeries from "modules/RelatedSeries";
import WatchActions from "modules/WatchActions";
import WatchAnthology from "modules/WatchAnthology";
import WatchCategory from "modules/WatchCategory";
import WatchMeta from "modules/WatchMeta";
import WatchStar from "modules/WatchStar";
import WatchSummary from "modules/WatchSummary";
import { useRouter } from "next/router";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import styles from "styles/watch.module.scss";
import classNames from "utils/classNames";

interface WatchMainProps {
  data: IEpisode;
}

const WatchMain = ({ data }: WatchMainProps) => {
  const router = useRouter();
  const { id, category, episode } = router.query;
  const [mounted, setMounted] = useState(false);
  const handleSaveProgressHistory = (e: SyntheticEvent<HTMLVideoElement>) => {
    const node = e.target as HTMLVideoElement;
    if (isNaN(node.duration)) return;
    let cloneHistoryLS: IHistoryView[] = JSON.parse(
      localStorage.getItem(LocalStorage.history) || "[]"
    );
    const foundWatchedMovieIndex = cloneHistoryLS.findIndex((history) => {
      return history.id === id && history.episode === data.episode;
    });
    const percentProgress = (node.currentTime / node.duration) * 100;
    if (foundWatchedMovieIndex === -1) return;
    cloneHistoryLS[foundWatchedMovieIndex].currentTime = node.currentTime;
    cloneHistoryLS[foundWatchedMovieIndex].totalDuration = node.duration;
    cloneHistoryLS[foundWatchedMovieIndex].progress = percentProgress;
    localStorage.setItem(LocalStorage.history, JSON.stringify(cloneHistoryLS));
  };
  useEffect(() => {
    if (!data) return;
    let historyLS: IHistoryView[] = JSON.parse(localStorage.getItem(LocalStorage.history) || "[]");
    if (historyLS.length >= 30) {
      historyLS = historyLS.slice(0, 30);
    }
    const foundMovieIndex = historyLS.findIndex(
      (movie) => movie.id === id && movie.episode === data.episode
    );
    if (foundMovieIndex !== -1) {
      const cloneFoundMovie = historyLS[foundMovieIndex];
      cloneFoundMovie.progress = 0;
      cloneFoundMovie.currentTime = 0;
      historyLS.splice(foundMovieIndex, 1);
      historyLS.unshift(cloneFoundMovie);
      localStorage.setItem(LocalStorage.history, JSON.stringify(historyLS));
      return;
    }
    const history = {
      key: uuidv4(),
      id: data.id,
      category: category as string,
      name: data.name,
      coverVerticalUrl: data.coverVerticalUrl,
      coverHorizontalUrl: data.coverHorizontalUrl,
      episode: data.episode,
      episodeName: data.currentEpName,
      currentEpName: data.currentEpName,
      totalDuration: data.totalDuration,
      progress: 0,
      currentTime: 0
    };
    localStorage.setItem(LocalStorage.history, JSON.stringify([history, ...historyLS]));
  }, [data, id, category, episode]);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <Meta
        title={`${data.name} - NetFilm`}
        description={data.introduction}
        image={resizeImageLoklok(data.coverHorizontalUrl, 800, 418)}
      />
    );
  }
  return (
    <LayoutPrimary>
      <div className="container">
        <Meta
          title={`${data.name} - NetFilm`}
          description={data.introduction}
          image={resizeImageLoklok(data.coverHorizontalUrl, 800, 418)}
        />
        <div className={styles.layout}>
          <div className={styles.layoutMain}>
            <MediaPlayer
              qualities={data.qualities}
              subtitles={data.subtitles}
              poster={data.coverHorizontalUrl}
              onProgress={handleSaveProgressHistory}
            />
            <h1 className={styles.heading}>
              {data.name} {data.currentEpName && `- ${data.currentEpName}`}
            </h1>
            <div className={styles.meta}>
              <WatchMeta
                areaList={data.areaList}
                currentEpisode={data.currentEpisode}
                episodeCount={data.episodeCount}
                year={data.year}
                score={data.score}
              />
              <WatchActions
                id={data.id}
                title={data.name}
                domainType={data.category}
                poster={data.coverVerticalUrl}
              />
            </div>
            <WatchCategory categories={data.tagList} />
            <WatchSummary introduction={data.introduction} />
            <WatchStar starList={data.starList} />
          </div>
          <div className={classNames(styles.layoutSidebar, "scrollbar")}>
            <WatchAnthology detailMovie={data} />
            <RelatedSeries refList={data.refList} />
          </div>
        </div>
        <div className={styles.layoutMain}>
          <CommentList />
        </div>
        <MovieList heading="You may like">
          {data.likeList.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.name}
              poster={movie.coverVerticalUrl}
              domainType={movie.category}
            />
          ))}
        </MovieList>
      </div>
    </LayoutPrimary>
  );
};

export default WatchMain;
