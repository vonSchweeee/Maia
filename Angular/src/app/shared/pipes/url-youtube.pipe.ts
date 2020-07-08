import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlSpotify'
})
export class UrlYoutubePipe implements PipeTransform {

  transform(value: string): string {
    if (/youtube.com\/watch\?/.test(value)) {
      const filteredValue = value.split('youtube.com/watch?v=')[1];
      return filteredValue.split('&')[0];
    }
    else {
      return value;
    }
  }

}
