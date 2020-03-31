import {ICategory} from './category';

export interface INews {
  newsID: number;
  title: string;
  date: Date;
  author: string;
  description: string;
  url: string;
  image: File;
  contentNews: string;
  sourceName: string;
  categoryID: number;
}
