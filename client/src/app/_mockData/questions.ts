import {Question} from "../_models/question";

export const QUESTIONS: Question[] = [{
    questionId: 1,
    questionTitle: 'Question1',
    questionType: 'Type1',
    options:[ {
      option: 'A',
      questionDescription: 'Question1Answer1'
    }, {
      option: 'B',
      questionDescription: 'Question1Answer2'
    }, {
      option: 'C',
      questionDescription: 'Question1Answer3'
    }, {
      option: 'D',
      questionDescription: 'Question1Answer4'
    } ],
    rightAnswer: 'A'
  }, {
    questionId: 2,
    questionTitle: 'Question2',
    questionType: 'Type2',
    options:[ {
      option: 'A',
      questionDescription: 'Question2Answer1'
    }, {
      option: 'B',
      questionDescription: 'Question2Answer2'
    }, {
      option: 'C',
      questionDescription: 'Question2Answer3'
    }, {
      option: 'D',
      questionDescription: 'Question2Answer4'
    } ],
    rightAnswer: 'B'
  }
];
