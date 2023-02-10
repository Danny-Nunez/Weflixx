import { IObjIdName } from "./common.type";
import { IEpisodeRoom, IEpisodeVo, IQuality, ISubtitle } from "./episode.type";

export interface IStar {
  image: string;
  localName: string;
  role: string;
  roleName: string;
  starId: number;
}

export interface IRefItem {
  category: number;
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  drameTypeVo?: any;
  id: string;
  name: string;
  seriesNo: number;
}

export interface ILikeMovieLoklok {
  areaList: IObjIdName[];
  areaNameList: string[];
  category: number;
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  drameTypeVo?: any;
  id: string;
  name: string;
  seriesNo: number;
  score: number;
  tagList: IObjIdName[];
  tagNameList: string[];
  upImgUrl: string;
  upName: string;
  year: number;
}

export interface ILikeMovie {
  id: string;
  name: string;
  coverVerticalUrl: string;
  category: number;
}

export interface IMovieDetailsLoklok {
  aliasName: string;
  areaNameList: string[];
  areaList: IObjIdName[];
  collect: boolean;
  category: number;
  contentTagResourceList: any[];
  coverHorizontalUrl: string;
  coverHorizontalUrlJson: string;
  coverVerticalUrl: string;
  drameTypeVo: { drameName: string; drameType: string };
  episodeCount?: number;
  episodeRoomListVo: IEpisodeRoom;
  episodeVo: IEpisodeVo[];
  id: string;
  introduction: string;
  likeList: ILikeMovieLoklok[];
  name: string;
  nameJson: string;
  refList: IRefItem[];
  reserved: boolean;
  score: number;
  showSetName: boolean;
  starList: IStar[];
  tagList: IObjIdName[];
  length: number;
  tagNameList: string[];
  translateType: number;
  upInfo: { upId: number; upImgUrl: string; upName: string };
  updateInfo: {
    updatePeriod: string;
    updateStatus: number;
  } | null;
  year: number;
}

export interface IMovieDetails {
  aliasName: string;
  areaList: IObjIdName[];
  category: number;
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  episodeCount?: number | null;
  episodeVo: IEpisodeVo[];
  id: string;
  introduction: string;
  likeList: ILikeMovie[];
  name: string;
  refList: IRefItem[];
  seriesNo: number;
  score: number;
  starList: IStar[];
  tagList: IObjIdName[];
  updateInfo: {
    updatePeriod: string;
    updateStatus: number;
  } | null;
  year: number;
  qualities: IQuality[];
  subtitles: ISubtitle[];
  currentEpName: string;
}

export interface IMovieSearch {
  areas: IObjIdName[];
  categoryTag: IObjIdName[];
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  domainType: number;
  dramaType: {
    code: string;
    name: string;
  };
  duration: string;
  id: string;
  name: string;
  releaseTime: string;
  sort: string;
  upInfo: {
    enable: boolean;
    upId: number;
    upImgUrl: string;
    upName: string;
    userId: string | null;
  };
}

export interface IHistoryView {
  key: string;
  id: string;
  name: string;
  category: string;
  coverVerticalUrl: string;
  coverHorizontalUrl: string;
  episode: number;
  episodeName: number;
  currentEpName: string;
  progress: number;
  totalDuration: number;
  currentTime: number;
}

export interface IMovieCard {
  id: string;
  title: string;
  domainType: number;
  poster: string;
}

export interface ICommentReaction {
  id: string;
  userId: string;
  avatar: string;
  fullname: string;
  reaction: string;
}

export interface IComment {
  id: string;
  userId: string;
  avatar: string;
  fullname: string;
  content: string;
  createdAt?: {
    nanoseconds: number;
    seconds: number;
  };
  categoryId: string;
  movieId: string;
  episodeId: string | number;
  reactions: ICommentReaction[];
}
