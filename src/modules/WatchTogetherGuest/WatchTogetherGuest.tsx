import dynamic from "next/dynamic";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Player } from "react-tuby";
import { IEpisode, IRoomInfo } from "types";
const ReactHlsPlayer = dynamic(() => import("react-hls-player"), {
  ssr: false
});

interface WatchTogetherGuestProps {
  roomInfo: IRoomInfo;
  data: IEpisode;
}

const WatchTogetherGuest = ({ roomInfo, data }: WatchTogetherGuestProps) => {
  const [isFirstPlay, setIsFirstPlay] = useState(true);
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleFirstPlay = (e: SyntheticEvent<HTMLVideoElement>) => {
    if (!isFirstPlay) return;
    const node = e.target as HTMLVideoElement;
    node.currentTime = roomInfo?.currentTime || 0;
    setIsFirstPlay(false);
  };

  useEffect(() => {
    if (!videoRef.current || !roomInfo?.currentTime) return;
    const currentTimeFromDB = roomInfo.currentTime;
    const currentTimeLocal = videoRef.current.currentTime;
    if (!currentTimeFromDB || !currentTimeLocal) return;
    const isSame = Math.floor(currentTimeFromDB) === Math.floor(currentTimeLocal);
    if (!isSame) videoRef.current.currentTime = currentTimeFromDB;
  }, [roomInfo?.currentTime]);

  return (
    <Player src={data.qualities} subtitles={data.subtitles} playerRef={playerRef}>
      {(ref, props) => {
        videoRef.current = ref.current;
        return (
          <ReactHlsPlayer
            {...props}
            playerRef={ref}
            autoPlay={true}
            poster={data.coverHorizontalUrl}
            onCanPlay={handleFirstPlay}
          />
        );
      }}
    </Player>
  );
};

export default WatchTogetherGuest;
