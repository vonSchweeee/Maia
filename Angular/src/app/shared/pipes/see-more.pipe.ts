import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seeMore'
})
export class SeeMorePipe implements PipeTransform {

  transform(value: string, characters: number, charactersFull: number): unknown {
    if (value.length <= characters)
      return value;

    if (value.length < 100)
      return value.substr(0, characters - 3).replace(/ ([^ ]*)$/, '') + '...';

    return value.substr(0, charactersFull - 3).replace(/ ,([^ ,]*)$/, '') + '...';
  }

}
