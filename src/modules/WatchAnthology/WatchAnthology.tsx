import { IconPlay } from "components/Icons";
import WrapLink from "components/WrapLink";
import { PATH } from "constants/path";
import { useRouter } from "next/router";
import { IEpisode } from "types";
import styles from "./watchAnthology.module.scss";

interface WatchAnthologyProps {
  detailMovie: IEpisode;
}

const WatchAnthology = ({ detailMovie }: WatchAnthologyProps) => {
  const router = useRouter();
  const { episode = detailMovie.episodeVo[0].id } = router.query;
  if (detailMovie.episodeVo.length <= 1) return null;
  return (
    <div className={styles.anthology}>
      {detailMovie.episodeVo.map(({ seriesNo, id }) => {
        const href = `${PATH.watch}/${detailMovie.category}/${detailMovie.id}/${id}`;
        const active = id === Number(episode);
        return (
          <WrapLink href={href} key={id}>
            <button>{active ? <IconPlay fill="#8a3cff" /> : seriesNo}</button>
          </WrapLink>
        );
      })}
    </div>
  );
};

export default WatchAnthology;
