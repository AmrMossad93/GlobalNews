import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../Services/category.service';
import {ICategory} from '../../Models/category';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  displayCategoryDialog: boolean = false;
  displayDeleteCategoryDialog: boolean = false;
  categories: ICategory[];
  categoryId;

  constructor(private categoryService: CategoryService, private toastr: ToastrService) {
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

  onCategorySubmit(form: NgForm) {
    if (form.value.categoryID === null) {
      this.addNewCategory();
    } else {
      this.updateCategory();
    }
  }

  addNewCategory() {
    this.categoryService.addCategory().subscribe(res => {
    }, error => {
    }, () => {
      this.displayCategoryDialog = false;
      this.toastr.success('Submitted Successfully', 'Category');
      this.getAllCategories();
    })
  }

  populateCategoryUpdateDialog(category: ICategory) {
    this.displayCategoryDialog = true;
    this.categoryService.category = Object.assign({}, category);
  }

  updateCategory() {
    this.categoryService.updateCategory().subscribe(res => {
    }, error => {
    }, () => {
      this.displayCategoryDialog = false;
      this.toastr.info('Updated Successfully', 'Category');
      this.getAllCategories();
    })
  }

  populateDeleteCategory(categoryId) {
    this.displayDeleteCategoryDialog = true;
    this.categoryId = categoryId;
  }

  onDeleteCategory() {
    this.categoryService.deleteCategory(this.categoryId).subscribe(res => {
    }, error => {
    }, () => {
      this.displayDeleteCategoryDialog = false;
      this.toastr.error('Deleted Successfully', 'Category');
      this.getAllCategories();
    })
  }
}
