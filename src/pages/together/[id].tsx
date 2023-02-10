import { ProtectedRoute } from "components/Authentication";
import LoadingSpinner from "components/LoadingSpinner";
import axiosClient from "configs/axiosClient";
import { doc, onSnapshot } from "firebase/firestore";
import LayoutPrimary from "layouts/LayoutPrimary";
import { db } from "libs/firebase-app";
import CommentList from "modules/CommentList";
import MovieCard from "modules/MovieCard";
import MovieList from "modules/MovieList";
import WatchActions from "modules/WatchActions";
import WatchCategory from "modules/WatchCategory";
import WatchMeta from "modules/WatchMeta";
import WatchStar from "modules/WatchStar";
import WatchSummary from "modules/WatchSummary";
import WatchTogetherChat from "modules/WatchTogetherChat";
import WatchTogetherGuest from "modules/WatchTogetherGuest";
import WatchTogetherHost from "modules/WatchTogetherHost";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { useAppSelector } from "store/global-store";
import styles from "styles/watch.module.scss";
import { IEpisode, IRoomInfo } from "types";
import classNames from "utils/classNames";

const WatchTogether = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { currentUser } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IEpisode>();
  const [roomInfo, setRoomInfo] = useState<IRoomInfo>();
  const isHostRoom = currentUser?.uid === roomInfo?.hostId;

  useEffect(() => {
    if (!id) return;
    const unsub = onSnapshot(doc(db, "rooms", id as string), (doc) => {
      setRoomInfo(doc.data() as IRoomInfo);
    });
    return () => {
      unsub();
    };
  }, [id]);
  useEffect(() => {
    const fetchDetailsMovie = async () => {
      if (!roomInfo?.movieId) return;
      setLoading(true);
      const { movieId, categoryId, episodeId } = roomInfo;
      try {
        const { data } = await axiosClient.get(`/api/episode`, {
          params: { id: movieId, category: categoryId, episode: episodeId }
        });
        setData(data);
      } catch (error) {
        console.log("error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetailsMovie();
  }, [roomInfo?.movieId]);

  if (!data || loading) {
    return (
      <LayoutPrimary>
        <LoadingSpinner />
      </LayoutPrimary>
    );
  }
  return (
    <ProtectedRoute>
      <LayoutPrimary>
        <div className="container">
          <div className={styles.layout}>
            <div className={classNames(styles.layoutMain, !isHostRoom && "tuby-controls-hidden")}>
              {isHostRoom ? (
                <WatchTogetherHost data={data} roomInfo={roomInfo as IRoomInfo} />
              ) : (
                <WatchTogetherGuest data={data} roomInfo={roomInfo as IRoomInfo} />
              )}
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
            <WatchTogetherChat roomInfo={roomInfo as IRoomInfo} />
          </div>
          <div className={styles.layoutMain}>
            <CommentList />
          </div>
          <MovieList heading="You may like">
            {data.likeList.map((movie: any) => (
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
    </ProtectedRoute>
  );
};

export default memo(WatchTogether);
