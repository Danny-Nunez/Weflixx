export interface IBanner {
  id: number;
  title: string;
  imageUrl: string;
  jumpType: number;
}

export interface IRecommendVOLoklok {
  category: number;
  contentType: string;
  id: number;
  imageUrl: string;
  jumpAddress: string;
  jumpType: string;
  needLogin: boolean;
  resourceNum: number;
  resourceStatus: number;
  showMark: boolean;
  title: string;
}

export interface IHomeSectionLoklok {
  bannerProportion?: number | null;
  blockGroupNum?: any;
  coverType?: any;
  homeSectionId: number;
  homeSectionName: string;
  homeSectionType: string;
  recommendContentVOList: IRecommendVOLoklok[];
  refId?: any;
  refRedirectUrl: string;
}

export interface IRecommendVO {
  category: number;
  id: number;
  imageUrl: string;
  title: string;
}

export interface IHomeSection {
  homeSectionId: number;
  homeSectionName: string;
  homeMovies: IRecommendVO[];
}

export interface IResponseHomeLoklok {
  page: number;
  recommendItems: IHomeSectionLoklok[];
  searchKeyWord: string;
}
