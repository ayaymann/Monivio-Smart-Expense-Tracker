import {
  Directive,
  ElementRef,
  Input,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appHighlightOverBudget]',
  standalone: true
})
export class HighlightOverBudgetDirective {

  @Input()
  appHighlightOverBudget!: number;

  @Input()
  budgetThreshold = 100;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnChanges(): void {

    const amount = this.appHighlightOverBudget;

    if (amount > this.budgetThreshold) {

      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'background-color',
        '#dfe4ff'
      );

    } else {

      this.renderer.removeStyle(
        this.elementRef.nativeElement,
        'background-color'
      );

    }
  }
}