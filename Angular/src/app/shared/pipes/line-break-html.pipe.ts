import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineBreakHtml'
})
export class LineBreakHtmlPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.replace(/\\n/g, '<br><br>');
  }

}
