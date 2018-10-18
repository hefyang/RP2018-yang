import {Option} from "./option";

export interface Question {
  questionId: number;
  questionTitle: string;
  questionType: string;
  options: Option[];
  rightAnswer: string;
}
