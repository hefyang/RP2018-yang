import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Question} from "../_models/question";
import {Observable} from "rxjs";
import {Exam} from "../_models/exam";

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http:HttpClient) { }

  getExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>('/api/exams/');
  }

  getExam(userId:string, exam:{[key:string]:any}): Observable<{[key:string]: any}> {
    return this.http.post<{[key:string]: any}>(`/api/users/${userId}/history`, exam);
  }

  getQuestion(examName:string, questionId:number): Observable<[Question, {[key:string]:boolean}]> {
    return this.http.get<any>(`/api/exams/${examName}/${questionId}`);
  }

  postAnswer(userId: string, examName: string, answer: any) {
    return this.http.post(`/api/users/${userId}/history/${examName}`, answer);
  }

  getResult(userId: string, examName: string, attempt: number) :any {
    return this.http.get(`/api/users/${userId}/history/${examName}/${attempt}`);
  }

  getHistory(userId: string) {
    return this.http.get(`/api/users/${userId}/history`);
  }
}
