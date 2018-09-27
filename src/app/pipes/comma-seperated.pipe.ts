import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaSeperated'
})
export class CommaSeperatedPipe implements PipeTransform {

  transform(list: string[]): string {
    if (!list)
      return '';

    return list.join(', ');
  }

}

