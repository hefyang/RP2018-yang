import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Answer} from "../_models/answer";
import {Option} from "../_models/option";
import {ExamService} from "../_services/exam.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() isFinished: boolean;
  @Input() questionId: number;
  @Input() examName: string;
  @Input() attempt: number;
  @Input() selectAnswer: Option;
  @Input() answer: Answer;

  constructor(
    private router: Router,
    private examService:ExamService) {

  }

  onNext() {
    if (!this.selectAnswer) return;
    this.examService.postAnswer(
      this.answer.userId,
      this.answer.examName, {
        questionId: this.answer.questionId,
        questionType: this.answer.questionType,
        answerResult: this.answer.correct,
        times: this.answer.time
      }).subscribe(() => {
      this.router
        .navigate([
          'question',
          {
            exam: this.examName,
            attempt: this.attempt,
            question: Number(this.questionId) + 1
          }]).then()
    });
  }

  onPrevious() {
    if (this.questionId == 1) return;
    this.router
      .navigate([
        'question',
        {
          exam: this.examName,
          attempt: this.attempt,
          question: Number(this.questionId) - 1
        }]).then();
  }

  onFinish() {
    if (!this.selectAnswer) return;
    this.examService.postAnswer(
      this.answer.userId,
      this.answer.examName, {
        questionId: this.answer.questionId,
        questionType: this.answer.questionType,
        answerResult: this.answer.correct,
        times: this.answer.time
      }).subscribe(() => {
        this.router
          .navigate([
            'result',
            {
              exam: this.examName,
              attempt: this.attempt
            }
          ]).then();
    });
  }

  ngOnInit() {
  }

}
