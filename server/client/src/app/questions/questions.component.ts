import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ExamService} from "../_services/exam.service";
import {Option} from "../_models/option";
import {Question} from "../_models/question";
import {Answer} from "../_models/answer";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {

  title: string;
  previousSection: string;

  question: Question;
  options: Option[];
  questionTitle: string;
  questionId: number;
  isFinished: boolean;
  examName: string;
  attempt: number;

  correct: boolean;
  selectAnswer: Option;
  answer: Answer;

  sub: any;

  constructor(
    private router: Router,
    private examService: ExamService,
    private route: ActivatedRoute) {

    this.title = 'Questions';
    this.previousSection = 'exam';
  }

  select(opt:Option) {
    this.answer.correct = this.correct = this.compareAnswer(opt.option);
    this.selectAnswer = opt;
  }

  private compareAnswer(answer) {
    return answer === this.question.rightAnswer;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {

      this.questionId = params.question;
      this.examName = params.exam;
      this.attempt = params.attempt;

      this.selectAnswer = null;

      this.examService
        .getQuestion(params.exam, this.questionId)
        .subscribe(res => {
          this.question = res[0];
          this.options = res[0].options;
          this.questionTitle = res[0].questionTitle;
          this.isFinished = Boolean(res[1]);
          this.correct = null;

          const usesId = localStorage.getItem('userId');
          this.answer = {
            userId: usesId,
            examName: this.examName,
            time: this.attempt,
            questionId: this.questionId,
            questionType: this.question.questionType,
            correct: this.correct
          };
        });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
