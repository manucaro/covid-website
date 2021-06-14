import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceNullWithText'
})
export class ReplaceNullWithTextPipe implements PipeTransform {

  transform(value: any, repleceText: string = 'N/A'): any {
    if (typeof value === 'undefined' || value === null || value == 0) {
      return repleceText;
    }

    return value;
  }
}
