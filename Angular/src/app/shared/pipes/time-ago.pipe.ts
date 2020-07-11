import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string | Date, ...args: unknown[]): unknown {
    let data;

    if (!(value instanceof Date))
      data = new Date(value);

    else
      data = value;

    const diffMin = moment().diff(data, 'minutes');

    if (diffMin === 0)
      return 'Recentemente';
    if (diffMin >= 1 && diffMin < 60)
      return `${diffMin}m atrás`;
    if (diffMin >= 60 && diffMin < 1439) {
      return `${((diffMin + 3) / 60).toFixed(0)}h atrás`;
    }
    if (diffMin >= 1439 && diffMin < 525.600) {
      return `${((diffMin + 60) / 1440).toFixed(0)}d atrás`;
    }
    if (diffMin >= 525.600) {
      return moment(data).format('DD/MM/yyyy');
    }

    return '';
  }

}
