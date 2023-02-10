export interface ICategoryResult {
  coverVerticalUrl: string;
  domainType: number;
  id: string;
  name: string;
  score: string;
  sort: string;
}

export interface IFilterOptionItem {
  name: string;
  params: string;
  screeningType: string;
}

export interface IFilterOptions {
  id: number;
  name: string;
  items: IFilterOptionItem[];
}

export interface IFilter {
  id: number;
  name: string;
  params: string;
  screeningItems: IFilterOptions[];
}
