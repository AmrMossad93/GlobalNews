import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from '../../../Services/news.service';
import {INews} from '../../../Models/news';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
  id;
  news = {} as INews;

  constructor(private route: ActivatedRoute, private newsService: NewsService) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    this.newsService.getNewsByID(this.id).subscribe(res => {
      this.news = res as INews;
    })
  }
}
