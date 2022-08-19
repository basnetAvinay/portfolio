import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import * as _ from 'lodash';
import {BarRoundCorner, ChartModelValue, VerticalBarModel} from './bar-chart.component';
import {ComponentFactoryResolver} from '@angular/core';
import {TooltipDirective} from '../../../directives/tooltip.directive';
import {Tooltip, TooltipButton} from '../tooltip/tooltip';
import {TooltipComponent} from '../tooltip/tooltip.component';

export const ChartTransitionTime = 200;
export const TOOLTIP_REMOVAL_DEBOUNCE_TIME = 500;

const _debounceDestroyToolTip = _.debounce(() => {
  ChartUtils.destroyToolTip();
}, TOOLTIP_REMOVAL_DEBOUNCE_TIME);

export enum D3ScaleType {
  BAND = 'BAND',
  TIME = 'TIME',
  LINEAR = 'LINEAR',
  POWER = 'POWER',
  LOG = 'LOG',
  ORDINAL = 'ORDINAL'
}

export class ChartUtils {
  public static getLinearScale(domain, range): d3.ScaleLinear<number, number> {
    const scale = d3.scaleLinear()
      .domain(domain)
      .range(range);
    scale['type'] = D3ScaleType.LINEAR;
    return scale;
  }

  public static getBandScale(domain, range, innerPadding = 0, outerPadding = 0): d3.ScaleBand<string> {
    const scale = d3.scaleBand()
      .range(range)
      .domain(domain)
      .paddingInner(innerPadding)
      .paddingOuter(outerPadding);
    scale['type'] = D3ScaleType.BAND;
    return scale;
  }

  public static getOrdinalScale(domain, range): d3.ScaleOrdinal<any, any> {
    const scale = d3.scaleOrdinal()
      .range(range)
      .domain(domain);
    scale['type'] = D3ScaleType.ORDINAL;
    return scale;
  }

  public static getTimeScale(domain, range): d3.ScaleTime<any, any> {
    const scale = d3.scaleTime()
      .range(range)
      .domain(domain);
    scale['type'] = D3ScaleType.TIME;
    return scale;
  }


  public static getToolTip() {
    return d3Tip().attr('class', 'd3-tip')
      .offset([-5, -5])
      .html(function (d) {
        return d;
      });
  }

  public static getToolTipForBarChart() {
    return d3Tip().attr('class', 'd3-tip')
      .offset([-5, 0])
      .html(function (data) {
        return (data);
      });
  }

  /*
   return transition
   */
  public static getLinearTransition(transitionTime: number) {
    return d3.transition(null)
      .duration(transitionTime)
      .ease(d3.easeLinear);
  }

  /*
  returns 0 single period and 2 for double period.
   */
  public static getMaxArrayLength(dataset: VerticalBarModel[]) {
    const index = dataset.reduce((p, c, i, a) => a[p].series.length > c.series.length ? p : i, 0);
    return dataset[index].series.length;
  }

  /*
  type is 'norm' to generate norm line and 'value' to generate line graph
   */
  public static getLineGenerator(xScale: any, yScale: d3.ScaleLinear<number, number>): d3.Line<ChartModelValue> {
    return d3.line<ChartModelValue>()
      .x((d, i) => {
        if (xScale.hasOwnProperty('bandwidth')) {
          return xScale(d['name']) + xScale.bandwidth() / 2;
        } else {
          return xScale(d['name']);
        }
      })
      .y((d, i) => {
        return yScale(d['value']);
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

  /**
   * @ignore
   */
  public static wrapTickText(tickTexts: d3.Selection<d3.BaseType, {}, d3.BaseType, number>, width: number) {
    tickTexts.each((datum, index, groups) => {
      const tickText = d3.select(groups[index]);
      const words = tickText.text().split(/\s+/).reverse();
      const tickTextY = tickText.attr('y');
      const tickTextDy = parseFloat(tickText.attr('dy'));
      const tickTextX = parseFloat(tickText.attr('x') || '0');
      const lineHeight = 1.1;
      tickText.text(null);
      let word, lineNum = 0;
      let tspan = tickText.append('tspan')
        .attr('x', tickTextX)
        .attr('y', tickTextY)
        .attr('dy', tickTextDy + 'em');
      while (word = words.pop()) {
        const tspanText = tspan.text() || '';
        tspan.text(tspanText.concat(' ' + word));
        if ((<SVGTSpanElement>tspan.node()).getComputedTextLength() > width && tspanText !== '') {
          tspan.text(tspanText);
          tspan = tickText.append('tspan')
            .attr('x', tickTextX)
            .attr('y', tickTextY)
            .attr('dy', `${++lineNum * lineHeight + tickTextDy}em`)
            .text(word);
        }
      }
    });
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
    let top = y + 20;
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
export const callback = (fn: Function, timeout= 50) => {
  callbackFn = fn;
  callBackTimer = setTimeout(() => fn(), timeout);
};

export const clearCallback = () => {
  clearTimeout(callBackTimer);
  callbackFn = undefined;
};

let holdTooltipInterval: NodeJS.Timeout;


export const isDragMode = (): boolean => {
  return window['isDragModeActive'] as boolean;
};

export const setDragMode = () => {
  window['isDragModeActive'] = true;
};

export const unsetDragMode = () => {
  window['isDragModeActive'] = false;
};
