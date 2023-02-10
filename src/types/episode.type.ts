import { IObjIdName } from "./common.type";
import { IStar, ILikeMovie, IRefItem } from "./movie.type";

export interface IDefinitionLoklok {
  code: string;
  description: string;
  fullDescription: string;
}

export interface ISubtitlingLoklok {
  language: string;
  languageAbbr: string;
  subtitlingUrl: string;
  translateType: number;
}

export interface IQuality {
  quality: number;
  url: string;
}

export interface ISubtitle {
  url: string;
  lang: string;
  language: string;
}

export interface IEpisodeVo {
  id: number;
  definitionList: IDefinitionLoklok[];
  name: string;
  nameJson: string;
  resourceType: number;
  seriesNo: number;
  subtitlingList: ISubtitlingLoklok[];
}

export interface IEpisodeRoom {
  category: number;
  episodeId: string;
  episodeName: string;
  number: number;
  roomId: string;
  seasonID: string;
  seasonName: string;
}

export interface IEpisode {
  aliasName: string;
  areaList: IObjIdName[];
  category: number;
  currentEpisode: number;
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  episodeCount: number;
  episodeRoomListVo: IEpisodeRoom;
  episodeVo: { id: number; seriesNo: number }[];
  id: string;
  introduction: string;
  likeList: ILikeMovie[];
  name: string;
  refList: IRefItem[];
  score: number;
  seriesNo: number | null;
  starList: IStar[];
  tagList: IObjIdName[];
  totalDuration: number;
  updateInfo: {
    updatePeriod: string;
    updateStatus: number;
  } | null;
  year: number;
  currentEpName: string;
  qualities: IQuality[];
  subtitles: ISubtitle[];
  episode: number;
}
