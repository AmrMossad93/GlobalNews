import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {INews} from '../Models/news';
import {ICategory} from '../Models/category';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  news = {} as INews;
  constructor(public dataService: DataService) {
  }

  addNews() {
    return this.dataService.add('api/News', this.news);
  }
  getNews(){
    return this.dataService.get('api/News');
  }
}