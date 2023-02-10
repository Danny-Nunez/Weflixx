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
  return (
    <Player src={qualities} subtitles={subtitles} playerRef={playerRef}>
      {(ref, props) => (
        <ReactHlsPlayer {...props} {...HlsProps} playerRef={ref} autoPlay={true} poster={poster} />
      )}
    </Player>
  );
};

export default MediaPlayer;
