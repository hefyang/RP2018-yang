import {Component, OnInit} from '@angular/core';
import {ExamService} from "../_services/exam.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  title: string;
  previousSection: string;

  userId:string;
  history: any;
  exams: string[];

  constructor(
    private examService:ExamService,
    private router:Router) {

    this.title = 'History';
    this.previousSection = 'main';

    this.exams = [];

    this.userId = localStorage.getItem("userId");

    this.examService.getHistory(this.userId)
      .subscribe(his => {
        this.history = his;

        this.history.map(exam => {
          if (this.exams.indexOf(exam.examName) === -1) this.exams.push(exam.examName);
        });
      })
  }

  onClick(hisItem) {
    const examName = hisItem.examName;
    const attempt = hisItem.times;
    this.router
      .navigate([
        'result',
        {
          exam: examName,
          attempt: attempt,
          history: true
        }
      ]).then();
  }

  ngOnInit() {
  }

}
