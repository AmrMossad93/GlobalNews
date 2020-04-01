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
  displayDeleteCategoryErrorDialog = false;
  displayDeleteNewsDialog = false;
  categories: ICategory[];
  categoryId;
  imageURL;
  categoryNewsID;
  categoryNewsName;
  news: INews;
  newsID;

  constructor(private categoryService: CategoryService, private toastr: ToastrService, private newsService: NewsService) {
  }

  ngOnInit(): void {
    this.getAllCategories();
    // this.resetCategoryForm();
    this.imageURL = '/assets/img/default-avatar.png';
  }

  showCategoryDialog() {
    this.displayCategoryDialog = true;
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res as ICategory[];
    })
  }


  private addNewCategory(form: NgForm) {
    this.categoryService.addCategory().subscribe(res => {
    }, error => {
    }, () => {
      this.displayCategoryDialog = false;
      this.toastr.success('Submitted Successfully', 'Category');
      this.resetCategoryForm(form);
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

  private updateCategory(form: NgForm) {
    this.categoryService.updateCategory().subscribe(res => {
    }, error => {
    }, () => {
      this.displayCategoryDialog = false;
      this.toastr.info('Updated Successfully', 'Category');
      this.resetCategoryForm(form);
      this.getAllCategories();
    })
  }


  resetCategoryForm(form?: NgForm) {
    if (form != null) {
      form.resetForm()
    }
    this.categoryService.category = {
      categoryID: 0,
      categoryNameEn: '',
      categoryNameAr: ''
    }
  }

  resetNewsForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.newsService.news = {
      newsID: 0,
      title: '',
      author: '',
      description: '',
      url: '',
      image: '/assets/img/default-avatar.png',
      contentNews: '',
      sourceName: '',
      categoryID: 0
    }
  }

  populateDeleteCategory(categoryId) {
    this.displayDeleteCategoryDialog = true;
    this.categoryId = categoryId;
  }

  onDeleteCategory() {
    this.categoryService.deleteCategory(this.categoryId).subscribe(res => {
    }, (error) => {
      if (error.status === 500) {
        this.displayDeleteCategoryErrorDialog = true;
      }
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
    if (!this.categoryService.category.categoryID) {
      this.addNewCategory(form);
    } else {
      this.updateCategory(form);
    }
  }

  onNewsSubmit(form: NgForm) {
    if (!this.newsService.news.newsID) {
      this.addNews(form);
    } else {
      this.updateNews(form);
    }
  }

  private updateNews(form: NgForm) {
    this.newsService.news.image = this.imageURL;
    this.newsService.updateNews().subscribe(res => {
    }, error => {
    }, () => {
      this.toastr.info('Updated Successfully', 'News');
      this.displayNewsDialog = false;
      this.getAllCategories();
      this.resetNewsForm(form)
    })
  }

  private addNews(form: NgForm) {
    this.newsService.news.image = this.imageURL;
    this.newsService.addNews().subscribe(res => {
      this.news = res as INews;
    }, error => {
    }, () => {
      this.toastr.success('Added Successfully', 'News');
      this.displayNewsDialog = false;
      this.getAllCategories();
      this.resetNewsForm(form)
    })
  }

  // getAllNews() {
  //   this.newsService.getNews().subscribe(res => {
  //     console.log(res)
  //   }, error => {
  //   }, () => {
  //   })
  // }
  populateDeleteNews(newsID) {
    this.displayDeleteNewsDialog = true;
    this.newsID = newsID;
  }

  onDeleteNews() {
    this.newsService.deleteNews(this.newsID).subscribe(res => {
    }, error => {
    }, () => {
      this.displayDeleteNewsDialog = false;
      this.toastr.error('Deleted Successfully', 'News');
      this.getAllCategories();
    })
  }
}
