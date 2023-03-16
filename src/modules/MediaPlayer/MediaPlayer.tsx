const ReactHlsPlayer = dynamic(() => import("react-hls-player"), {
  ssr: false
});
import { IQuality, ISubtitle } from "types";
import dynamic from "next/dynamic";
import { HlsPlayerProps } from "react-hls-player";
import { Player } from "react-tuby";
import "react-tuby/css/main.css";

interface MediaPlayerProps extends Partial<HlsPlayerProps> {
  subtitles: ISubtitle[];
  qualities: IQuality[];
  poster: string;
}

const MediaPlayer = ({
  subtitles,
  qualities,
  poster,
  playerRef,
  ...HlsProps
}: MediaPlayerProps) => {
  const qualitiesProxy = qualities.map((q) => ({
    quality: q.quality,
    url: `${process.env.NEXT_PUBLIC_PROXY_LOKLOK}/m3u8?url=${encodeURIComponent(q.url)}`
  }));
  return (
    <Player src={qualitiesProxy} subtitles={subtitles} playerRef={playerRef}>
      {(ref, props) => (
        <ReactHlsPlayer {...props} {...HlsProps} playerRef={ref} autoPlay={true} poster={poster} />
      )}
    </Player>
  );
};

export default MediaPlayer;
