import { doc, updateDoc } from "firebase/firestore";
import { db } from "libs/firebase-app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Player } from "react-tuby";
import { IEpisode, IRoomInfo } from "types";
const ReactHlsPlayer = dynamic(() => import("react-hls-player"), {
  ssr: false
});

interface WatchTogetherHostProps {
  roomInfo: IRoomInfo;
  data: IEpisode;
}

const WatchTogetherHost = ({ roomInfo, data }: WatchTogetherHostProps) => {
  const router = useRouter();
  const id = router.query.id as string;
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isFirstPlay, setIsFirstPlay] = useState(true);

  const handleFirstPlay = (e: SyntheticEvent<HTMLVideoElement>) => {
    if (!isFirstPlay) return;
    const node = e.target as HTMLVideoElement;
    node.currentTime = roomInfo?.currentTime || 0;
    setIsFirstPlay(false);
  };
  const handleTimeUpdate = async (e: SyntheticEvent<HTMLVideoElement>) => {
    const node = e.target as HTMLVideoElement;
    const colRef = doc(db, "rooms", id);
    await updateDoc(colRef, {
      currentTime: node.currentTime
    });
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
            onSeeked={handleTimeUpdate}
            onProgress={handleTimeUpdate}
            onCanPlay={handleFirstPlay}
          />
        );
      }}
    </Player>
  );
};

export default WatchTogetherHost;
