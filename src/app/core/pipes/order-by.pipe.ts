import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  standalone:false
})
export class OrderByPipe implements PipeTransform {
  transform<T>(array: T[] | null, field: string, order: 'asc' | 'desc' = 'asc'): T[] {
    if (!array || !field) {
      return array || [];
    }
    return array.sort((a: any, b: any) => {
      const valueA = a[field];
      const valueB = b[field];

      if (valueA < valueB) return order === 'asc' ? -1 : 1;
      if (valueA > valueB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }
}
