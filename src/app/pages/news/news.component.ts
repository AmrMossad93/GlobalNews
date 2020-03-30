import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../Services/category.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  displayCategoryDialog: boolean = false;

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
      console.log(res)
    })
  }
}
