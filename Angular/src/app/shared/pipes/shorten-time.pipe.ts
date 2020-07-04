import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenTime'
})
export class ShortenTimePipe implements PipeTransform {

  transform(value: string): string {
    if (/([0][0]):(?:[012345]\d):(?:[012345]\d)/.test(value))
      return value.substring(value.length, value.indexOf(':') + 1);
    else
        return value;
  }

}
