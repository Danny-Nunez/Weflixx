export interface INewsCard {
  coverImg: string;
  createTime: number;
  id: number;
  introduction: string;
  keyword: string[];
  title: string;
}

export interface INewsDetails {
  title: string;
  content: string;
  createTime: string;
  id: number;
  keyword: string[];
}
