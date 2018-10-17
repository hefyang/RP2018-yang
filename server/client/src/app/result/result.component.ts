import {Component, OnDestroy, OnInit} from '@angular/core';
import Presentation from "../_presentTools/presentation";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {ExamService} from "../_services/exam.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy {

  title: string;
  previousSection: string;

  sub: any;
  userId: string;
  examName: string;
  attempt: number;

  constructor(
    private http: HttpClient,
    private examService: ExamService,
    private route: ActivatedRoute) {

    this.title = 'Result';

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {

      this.userId = localStorage.getItem("userId");

      this.previousSection = params.history ? 'history' : 'main';
      this.examName = params.exam;
      this.attempt = params.attempt;

      this.examService.getResult(this.userId, this.examName, this.attempt)
        .subscribe( res => {

          console.log(res);       // Temp

          const tempArray:any = res;
          const resultData = [];
          for(let i = 0; i< tempArray[0].length; i++) {
            resultData.push({
              State: tempArray[0][i].questionType,
              freq: {
                True: tempArray[0][i].totalRight,
                False: tempArray[0][i].totalWrong
              }
            })
          }

          console.log(resultData);       // Temp

          const presentation = new Presentation();
          presentation.dashboard("#dashboard", resultData);

          presentation.dashboard2("#dashboard2", res);
        });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
