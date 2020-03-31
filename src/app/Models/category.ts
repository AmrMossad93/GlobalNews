import {INews} from './news';

export interface ICategory {
  categoryID: number;
  categoryNameAr: string;
  categoryNameEn: string;
  News: INews;
}
