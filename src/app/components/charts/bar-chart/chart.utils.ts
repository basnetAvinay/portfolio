import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import * as _ from 'lodash';
import {BarRoundCorner} from './bar-chart.component';
import {ComponentFactoryResolver} from '@angular/core';
import {Tooltip, TooltipButton} from '../tooltip/tooltip';
import {TooltipComponent} from '../tooltip/tooltip.component';
import {TooltipDirective} from "../tooltip/tooltip.directive";

export const TOOLTIP_REMOVAL_DEBOUNCE_TIME = 500;

const _debounceDestroyToolTip = _.debounce(() => {
  ChartUtils.destroyToolTip();
}, TOOLTIP_REMOVAL_DEBOUNCE_TIME);

export class ChartUtils {

  public static getToolTipForBarChart() {
    return d3Tip().attr('class', 'd3-tip')
      .offset([-5, 0])
      .html(function (data) {
        return (data);
      });
  }

  /*
  to destroy tooltip
   */
  public static destroyToolTip() {
    d3.selectAll('.d3-tip').remove();
  }

  public static debounceDestroyToolTip() {
    _debounceDestroyToolTip();
  }

  public static cancelDestroyToolTip() {
    _debounceDestroyToolTip.cancel();
  }

  public static flushDestroyToolTip() {
    _debounceDestroyToolTip.flush();
  }


  /*
  init tooltip
   */
  public static initToolTip(tip, datum, node, applyOffset = true, direction: 'n' | 'w' | 'e' = null, i?: number) {
    tip.destroy();
    d3.select(node).style('cursor', 'pointer');
    tip
      .attr('class', 'd3-tip n')
      .style('display', 'block')
      .style('padding-right', '7px');
    if (applyOffset) {
      tip.offset(ChartUtils.tipOffset(node as Element));
      tip.direction(direction ? direction : (ChartUtils.tipDirection(node as Element)));
    }
    tip
      .style('z-index', 4)
      .style('opacity', 1)
      .show(datum, i, node);
  }

  public static tipDirection(element: Element, eastRatio = 0.25): string {
    const clientWidth = document.documentElement.clientWidth;
    const elementClientRect = element.getBoundingClientRect();
    const elementMidX = elementClientRect.left + elementClientRect.width / 2;
    let direction = 'n';
    if (elementMidX / clientWidth < eastRatio) {
      direction = 'e';
    } else if (elementMidX / clientWidth > 0.75) {
      direction = 'w';
    }
    return direction;
  }

  public static tipOffset(element: Element): [number, number] {
    const direction = ChartUtils.tipDirection(element);
    if (direction === 'e') {
      return [-4, 6];
    } else if (direction === 'w') {
      return [-4, -6];
    }
    return [-4, 0];
  }


  public static getRightRoundedRectPath(x: number, y: number, w: any, h: number, r: number, barRoundCorner: BarRoundCorner): string {
    let rectPath: string;
    if (r > w) {
      r = w;
    }
    rectPath = `M${x + r},${y}`;
    rectPath += `h${w - 2 * r}`;

    if (barRoundCorner.topRight) {
      rectPath += `a${r},${r} 0 0 1 ${r},${r}`;
    } else {
      rectPath += `h${r}`;
      rectPath += `v${r}`;
    }
    rectPath += `v${h - 2 * r}`;

    if (barRoundCorner.bottomRight) {
      rectPath += `a${r},${r} 0 0 1 ${-r},${r}`;
    } else {
      rectPath += `v${r}`;
      rectPath += `h${-r}`;
    }
    rectPath += `h${2 * r - w}`;

    if (barRoundCorner.bottomLeft) {
      rectPath += `a${r},${r} 0 0 1 ${-r},${-r}`;
    } else {
      rectPath += `h${-r}`;
      rectPath += `v${-r}`;
    }
    rectPath += `v${2 * r - h}`;

    if (barRoundCorner.topLeft) {
      rectPath += `a${r},${r} 0 0 1 ${r},${-r}`;
    } else {
      rectPath += `v${-r}`;
      rectPath += `h${r}`;
    }
    rectPath += `z`;
    return rectPath;
  }

  public static initComplexToolTip(
    x, y,
    tip, node,
    componentFactoryResolver: ComponentFactoryResolver,
    tooltipHost: TooltipDirective,
    tooltipData: Tooltip,
    drillableTooltipDebounce: number,
    applyOffset = true,
    direction: 'n' | 'w' | 'e' = null,
    isDirectionTipClose = false
  ): void {
    ChartUtils.cancelDestroyToolTip();
    d3.selectAll('.d3-tip').remove();
    tip.destroy();

    if (holdTooltipInterval) {
      clearInterval(holdTooltipInterval);
    }

    // get innerHTML from
    const componentFactory = componentFactoryResolver.resolveComponentFactory(TooltipComponent);
    const viewContainerRef = tooltipHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<TooltipComponent>(componentFactory);
    componentRef.instance.data = tooltipData;
    componentRef.changeDetectorRef.detectChanges();
    const tipElement = componentRef.instance.tooltipElement.nativeElement.innerHTML;
    tip.html(() => tipElement);
    viewContainerRef.clear();

    // tip.destroy();
    d3.select(node).style('cursor', 'pointer');
    tip
      .attr('class', 'd3-tip n')
      .style('display', 'block')
      .style('padding', '0');
    if (applyOffset) {
      tip.offset(ChartUtils.tipOffset(node as Element));
      // tip.direction(direction ? direction : (ChartUtils.tipDirection(node as Element)));
    }
    tip
      .style('z-index', 6)
      .style('opacity', 1)
      .show(node);
    const tipRect = (d3.select('.d3-tip').node() as any).getBoundingClientRect();
    const svgDirection = direction || ChartUtils.tipDirection(node as Element, 0.3);
    let top: number;
    let left = x + 10;

    switch (svgDirection) {
      case 'w':
        left = x - tipRect.width - 5;
        top = y - tipRect.height / 2;
        break;
      case 'e':
        top = y - tipRect.height / 2;
        break;
      default:
        top = isDirectionTipClose ? Number(y - tipRect.height - 10) + Number(9) : y - tipRect.height - 10;
        left = x - (tipRect.width / 2);
    }
    tip
      .direction(svgDirection)
      .style('top', `${top}px`)
      .style('left', `${left}px`)
      .style('z-index', 1100)
      .style('opacity', 1)
      .show(node);
    tip.style('top', `${top}px`)
      .style('left', `${left}px`);
    // configure event listener to hold the tooltip
    const drillableTooltip = d3
      .select('.d3-tip .popover-body')
      .node() as Element;
    drillableTooltip.addEventListener('mouseenter', () => {
      if (holdTooltipInterval) {
        clearInterval(holdTooltipInterval);
      }
      clearCallback();
      holdTooltipInterval = setInterval(() => {
        ChartUtils.debounceDestroyToolTip();
      }, drillableTooltipDebounce / 2);
    });
    drillableTooltip.addEventListener('mouseleave', () => {
      clearInterval(holdTooltipInterval);
    });
    // configure event listener for drillable buttons
    if (tooltipData?.buttonGroups?.length > 0) {
      const allButtons: TooltipButton[] = tooltipData?.buttonGroups?.reduce((a, b) => a.concat(...b.buttons), []);
      d3
        .selectAll('.d3-tip .btn-pill-teal')
        .nodes()
        .forEach((n) =>
          (n as Element).addEventListener(
            'click',
            () => {
              clearInterval(holdTooltipInterval);
              allButtons.find(b => b.id === (n as Element).id).callback();
            }
          )
        );
    }
  }
}

let callbackFn: Function;
let callBackTimer;
export const callback = (fn: Function, timeout = 50) => {
  callbackFn = fn;
  callBackTimer = setTimeout(() => fn(), timeout);
};

export const clearCallback = () => {
  clearTimeout(callBackTimer);
  callbackFn = undefined;
};

let holdTooltipInterval: NodeJS.Timeout;
