import { IObjIdName } from "./common.type";
import { IDefinitionLoklok, ISubtitlingLoklok } from "./episode.type";

export interface IDiscoveryRef {
  category: number;
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  drameTypeVo: any;
  id: string;
  name: string;
  score: number;
  tagList: IObjIdName[];
  year: number;
}

export interface IUpInfo {
  enable: boolean;
  upId: number;
  upImgUrl: string;
  upName: string;
  userId: any;
}

export interface IMediaPreviewLoklok {
  category: number;
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  duration: number;
  id: string;
  introduction: string;
  like: false;
  likeCount: number;
  mediaInfo: {
    definitionList: IDefinitionLoklok[];
    id: number;
    resourceType: number;
    subtitlingList: ISubtitlingLoklok[];
  };
  name: string;
  refList: IDiscoveryRef[];
  upInfo: IUpInfo;
}

export interface IDiscovery {
  category: number;
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  id: string;
  introduction: string;
  likeCount: number;
  name: string;
  refList: IDiscoveryRef[];
  upInfo: IUpInfo;
  mediaInfoUrl: {
    businessType: number;
    currentDefinition: string;
    episodeId: string;
    mediaUrl: string;
    totalDuration: number;
  };
}
