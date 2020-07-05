import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, characters: number): unknown {
    if (value.length <= characters)
      return value;

    return value.substr(0, characters - 3) + '...';
  }

}
