import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryIcon',
  standalone: true
})
export class CategoryIconPipe implements PipeTransform {

  transform(category: string): string {

    const icons: Record<string, string> = {
      Food: '\u{1F37D}\u{FE0F}',
      Transport: '\u{1F68C}',
      Shopping: '\u{1F6CD}\u{FE0F}',
      Bills: '\u{1F4C4}',
      Entertainment: '\u{1F3AC}',
      Other: '\u{1F4A1}'
    };

    return `${icons[category] ?? ''} ${category}`;
  }
}