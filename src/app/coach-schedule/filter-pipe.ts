import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filterTerm: string, field: string): any[] { 
    if (!items || !filterTerm || !field) {
        return items;
    }
    filterTerm = filterTerm.toLowerCase();

    return items.filter(item => item[field].toLowerCase().includes(filterTerm));
  }
}
