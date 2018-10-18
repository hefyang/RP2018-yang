import { Component, OnInit } from '@angular/core';
import {Exam} from "../_models/exam";
import {ExamService} from "../_services/exam.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  title: string;
  previousSection: string;
  exams: Exam[];
  examTypes: string[];

  constructor(
    private examService: ExamService,
    private router: Router) {

    this.title = 'Exam';
    this.previousSection = 'main';

    this.examTypes = [];

    this.examService.getExams()
      .subscribe(exams => {
        this.exams = exams;
        console.log(this.exams);

        this.exams.map(ex => {
          if (this.examTypes.indexOf(ex.examType) === -1) this.examTypes.push(ex.examType);
        });
        console.log(this.examTypes);

      });
  }

  onClick(exam: Exam) {
    const userId = localStorage.getItem('userId');
    const examType = exam.examType;
    const examName = exam.examName;
    const totalNumber = exam.totalNumber;
    this.examService.getExam(userId, {
      examType: examType,
      examName: examName,
      totalQuestionNumber: totalNumber
    }).subscribe(res => {
        this.router
          .navigate([
            'question',
            {
              exam: res.examName,
              attempt: res.times,
              question: 1
            }]).then();
      });
  }

  ngOnInit() {
  }

}
