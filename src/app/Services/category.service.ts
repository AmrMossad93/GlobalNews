import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {ICategory} from '../Models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  category = {} as ICategory;

  constructor(private dataService: DataService) {
  }

  getCategories() {
    return this.dataService.get('api/Category');
  }

  addCategory() {
    return this.dataService.add('api/Category', this.category);
  }

  updateCategory() {
    return this.dataService.edit('api/Category/' + this.category.categoryID, this.category);
  }

  deleteCategory(id) {
    return this.dataService.delete('api/Category/', id);
  }
}
