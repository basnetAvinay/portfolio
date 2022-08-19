import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}
