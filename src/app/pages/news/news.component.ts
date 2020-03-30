import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../Services/category.service';
import {ICategory} from '../../Models/category';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  displayCategoryDialog: boolean = false;
  categories: ICategory[];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  showCategoryDialog() {
    this.displayCategoryDialog = true;
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res as ICategory[];
    })
  }

  onCategorySubmit() {
    this.addNewCategory();
  }

  addNewCategory() {
    this.categoryService.addCategory().subscribe(res => {
    }, error => {
    }, () => {
      this.displayCategoryDialog = false;
      this.getAllCategories();
    })
  }

}
