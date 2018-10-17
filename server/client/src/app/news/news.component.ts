import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {

  title: string;
  previousSection: string;
  post: number;
  sub: any;

  constructor(
    private route: ActivatedRoute) {
    this.title = 'News';
    this.previousSection = 'main';

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.post = params.post;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
