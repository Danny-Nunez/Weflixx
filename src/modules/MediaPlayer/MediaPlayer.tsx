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
    // url: `${process.env.NEXT_PUBLIC_PROXY_LOKLOK}/m3u8?url=${encodeURIComponent(q.url)}`
    url: 'https://ali-source.loklok.tv/597bc81948884d2f8da0277cfbcde0fb/07f8365b5c0d4606a58c2afb62e7153e-ab0820ae0a6908bc05eba2ecdf45dd6d-sd-00006.ts'
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
