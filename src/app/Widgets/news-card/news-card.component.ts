import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  @Input() tittle;
  @Input() author: string;
  @Input() description: string;
  @Input() url: string;
  @Input() contentNews: string;
  @Input() sourceName: string;
  @Input() image: File;
  @Input() date: Date;

  constructor() {
  }

  ngOnInit(): void {
  }

}
