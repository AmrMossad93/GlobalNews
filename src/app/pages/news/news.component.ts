import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../Services/category.service';
import {ICategory} from '../../Models/category';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import {NewsService} from '../../Services/news.service';
import {INews} from '../../Models/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  displayCategoryDialog = false;
  displayNewsDialog = false;
  displayDeleteCategoryDialog = false;
  categories: ICategory[];
  categoryId;
  imageURL;
  categoryNewsID;
  categoryNewsName;
  news: INews;

  constructor(private categoryService: CategoryService, private toastr: ToastrService, private newsService: NewsService) {
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.imageURL = '/assets/img/default-avatar.png';
  }

  showCategoryDialog() {
    this.displayCategoryDialog = true;
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res as ICategory[];
      console.log(this.categories)
    })
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

  populateNewsUpdateDialog(news: INews) {
    this.displayNewsDialog = true;
    this.imageURL = this.newsService.news.image;
    this.newsService.news = Object.assign({}, news);
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

  showNewsDialog(categoryID) {
    this.displayNewsDialog = true;
    this.newsService.news.categoryID = categoryID;
  }

  // handelFileToUpload(file: FileList) {
  //   this.newsService.news.image = file.item(0);
  //   const reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     this.imageURL = event.target.result ;
  //     console.log(this.imageURL)
  //   };
  //   reader.readAsDataURL(this.newsService.news.image);
  // }
  handelFileToUpload(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageURL = reader.result;
      };
    }
  }

  onCategorySubmit(form: NgForm) {
    if (form.value.categoryID === null) {
      this.addNewCategory();
    } else {
      this.updateCategory();
    }
  }

  onNewsSubmit(form: NgForm) {
    if (form.value.newsID === null) {
      this.addNews();
    } else {
      this.updateNews();
    }
  }

  updateNews() {
    this.newsService.news.image = this.imageURL;
    this.newsService.updateNews().subscribe(res => {
      this.toastr.info('Updated Successfully', 'News');
      this.displayNewsDialog = false;
      this.getAllCategories();
    })
  }

  addNews() {
    this.newsService.news.image = this.imageURL;
    this.newsService.addNews().subscribe(res => {
      this.news = res as INews;
      this.toastr.success('Added Successfully', 'News');
      this.displayNewsDialog = false;
      this.getAllCategories();
    })
  }

  getAllNews() {
    this.newsService.getNews().subscribe(res => {
      console.log(res)
    }, error => {
    }, () => {
    })
  }

}
