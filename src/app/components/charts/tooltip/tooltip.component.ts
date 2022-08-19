import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { Tooltip } from './tooltip';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {
  @Input() public data: Tooltip;

  @ViewChild('tooltip', {read: ElementRef, static: true})
  public tooltipElement: ElementRef;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }
}
