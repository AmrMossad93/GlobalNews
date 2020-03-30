import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  displayCategoryDialog: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  showCategoryDialog() {
    this.displayCategoryDialog = true;
  }
}
