import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exam'
})
export class ExamPipe implements PipeTransform {

  transform(history: any, examName: string): any {
    if (!history) return [];
    if (!examName) return history;
    examName = examName.toLowerCase();
    return history.filter(hisItem => {
      return examName === hisItem.examName.toLowerCase();
    });
  }

}
