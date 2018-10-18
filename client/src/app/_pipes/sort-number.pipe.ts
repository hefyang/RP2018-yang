import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortNumber'
})
export class SortNumberPipe implements PipeTransform {

  transform(history: any, args?: any): any {
    if (!history) return [];
    history.sort((a, b) => {
      a = Number(a.times);
      b = Number(b.times);
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0
      }
    });
    return history;
  }

}
