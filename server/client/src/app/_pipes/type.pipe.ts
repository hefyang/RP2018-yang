import { Pipe, PipeTransform } from '@angular/core';
import {Exam} from "../_models/exam";

@Pipe({
  name: 'type'
})
export class TypePipe implements PipeTransform {

  transform(exams: Exam[], type: string): Exam[] {
    if (!exams) return [];
    if (!type) return exams;
    type = type.toLowerCase();
    return exams.filter(ex => {
      return type.includes(ex.examType.toLowerCase());
    });
  }

}
