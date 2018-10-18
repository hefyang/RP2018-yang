import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  title: string;
  previousSection: string;

  constructor() {
    this.title = 'Home';
    this.previousSection = '';
  }

  ngOnInit() {
  }

}
