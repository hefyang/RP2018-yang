import { Pipe, PipeTransform } from '@angular/core';
import {Option} from "../_models/option";

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(options: Option[], args?: any): any {
    if (!options) return [];
    options.sort((a:Option, b: Option) => {
      if (a.option < b.option) {
        return -1;
      } else if (a.option > b.option) {
        return 1;
      } else {
        return 0
      }
    });
    return options;
  }

}
