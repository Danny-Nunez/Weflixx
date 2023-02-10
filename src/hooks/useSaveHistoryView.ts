import { IEpisode } from "types";
import { LocalStorage } from "constants/localStorage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const useSaveHistoryView = (data: IEpisode) => {
  const router = useRouter();
  const { id, category, episode } = router.query;
  useEffect(() => {
    let historyLS = JSON.parse(localStorage.getItem(LocalStorage.history) || "[]");
    const history = {
      key: uuidv4(),
      id: data.id,
      category: category,
      name: data.name,
      coverVerticalUrl: data.coverVerticalUrl,
      coverHorizontalUrl: data.coverHorizontalUrl,
      episode: data.episode,
      episodeName: data.currentEpName,
      currentEpName: data.currentEpName,
      progress: 0
    };
    const lastWatchedMovie = historyLS[0];
    if (!lastWatchedMovie) {
      localStorage.setItem(LocalStorage.history, JSON.stringify([history]));
      return;
    }
    const isLastWatchedMovie =
      lastWatchedMovie.id === data.id && lastWatchedMovie.episode === data.episode;
    if (isLastWatchedMovie) return;
    if (historyLS.length >= 30) {
      historyLS = historyLS.slice(0, 30);
    }
    localStorage.setItem(LocalStorage.history, JSON.stringify([history, ...historyLS]));
  }, [data, id, category, episode]);
};

export default useSaveHistoryView;
