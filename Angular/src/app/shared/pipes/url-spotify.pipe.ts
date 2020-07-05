import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlSpotify'
})
export class UrlSpotifyPipe implements PipeTransform {

  transform(value: string): string {
    if (/spotify:track:/.test(value)) {
      return value.replace(/spotify:track:/, '');
    }

    if (/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(value)) {
      const arrayUrl = value.match(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)[0]
        .toString().split('/');

      return arrayUrl[arrayUrl.length - 1].split('?')[0];

    }

    else {
      return value;
    }
  }

}
