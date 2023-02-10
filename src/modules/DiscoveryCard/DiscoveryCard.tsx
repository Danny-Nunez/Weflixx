import { IDiscovery } from "types";
import WrapLink from "components/WrapLink";
import { IconHeart, IconShare } from "components/Icons";
import LoadingSpinner from "components/LoadingSpinner";
import { PATH } from "constants/path";
import useElementOnScreen from "hooks/useElementOnScreen";
import dynamic from "next/dynamic";
import { Image } from "components/Image";
import { SyntheticEvent, useRef, useState } from "react";
import styles from "./discoveryCard.module.scss";
const ReactHlsPlayer = dynamic(() => import("react-hls-player"), {
  ssr: false
});

interface DiscoveryCardProps {
  info: IDiscovery;
}

const DiscoveryCard = ({ info }: DiscoveryCardProps) => {
  const playerRef = useRef<HTMLVideoElement>(null);
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1
  };
  const isVisible = useElementOnScreen(options, playerRef);
  const movie = info.refList?.[0];
  const [isLove, setIsLove] = useState(false);
  const [playerStyles, setPlayerStyles] = useState({
    maxWidth: "0px",
    aspectRatio: 1
  });
  const isLoading = playerStyles.maxWidth === "0px";
  const handleLoadedMetadata = (e: SyntheticEvent<HTMLVideoElement>) => {
    const node = e.target as HTMLVideoElement;
    const aspectRatio = node.videoWidth / node.videoHeight;
    if (aspectRatio === 1) {
      setPlayerStyles({ maxWidth: "473px", aspectRatio });
      return;
    }
    if (aspectRatio > 1) {
      setPlayerStyles({ maxWidth: "522px", aspectRatio });
      return;
    }
    if (aspectRatio < 1) {
      setPlayerStyles({ maxWidth: "280px", aspectRatio });
      return;
    }
  };
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <div className={styles.avatar}>
          <Image width={56} height={56} alt={info.upInfo.upName} src={info.upInfo.upImgUrl} />
        </div>
        <div>
          <h4>{info.upInfo.upName}</h4>
          <p className={styles.introduction}>{info.introduction}</p>
          {movie && (
            <WrapLink className={styles.link} href={`${PATH.watch}/${movie.category}/${movie.id}`}>
              {movie.name}
            </WrapLink>
          )}
        </div>
      </div>
      {isLoading && (
        <div className={styles.loading}>
          <LoadingSpinner />
          <span>Loading video...</span>
        </div>
      )}
      <div className={styles.playerContent}>
        <ReactHlsPlayer
          controls
          poster={
            movie
              ? playerStyles.aspectRatio < 1
                ? movie.coverVerticalUrl
                : movie.coverHorizontalUrl
              : info.coverHorizontalUrl
          }
          src={info.mediaInfoUrl.mediaUrl}
          style={playerStyles}
          className={styles.player}
          playsInline={true}
          playerRef={playerRef}
          onLoadedMetadata={handleLoadedMetadata}
          autoPlay={isVisible}
          muted
        />
        {!isLoading && (
          <div className={styles.actions}>
            <button className={styles.action} onClick={() => setIsLove(!isLove)}>
              <IconHeart fill={isLove ? "#ff0000" : "#fff"} />
            </button>
            <span className={styles.number}>{info.likeCount}</span>
            <button className={styles.action}>
              <IconShare fill="#fff" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoveryCard;
