export interface IStarMovies {
  aliasName: string;
  category: number;
  contentId: string;
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  introduction: string;
  language: string;
  name: string;
}

export interface IStarInfo {
  bgPhotos: string;
  colour: string;
  localName: string;
  introduction: string;
  dramaList: IStarMovies[];
  movieList: IStarMovies[];
  oldName: string;
  photos: string[];
  starId: number;
}
