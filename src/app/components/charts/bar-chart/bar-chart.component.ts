import {
  Component,
  ComponentFactoryResolver,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as d3 from 'd3';
import { Subject } from 'rxjs';
import {TooltipDirective} from '../../../directives/tooltip.directive';
import {ChartConstants} from './chart.contants';
import {callback, ChartUtils, TOOLTIP_REMOVAL_DEBOUNCE_TIME} from './chart.utils';
import {TooltipButton} from '../tooltip/tooltip';

export interface GoalDef {
  featureId: string;
  metrics: string;
  operator: string;
  goalType: string;
  values: Array<number>;
  inputValues: Array<number>;
  toolTip?: string;
  chartPoint?: number; // this should be removed
}

export interface BarRoundCorner {
  topLeft: boolean;
  topRight: boolean;
  bottomLeft: boolean;
  bottomRight: boolean;
}

export interface BarChartModel {
  name: string;
  value: number;
  referenceValue: number;
}

export interface BarMetricInfo {
  name: string;
  popLabel: string;
  isClickable: boolean;
}

export interface VerticalBarModel {
  name: string;
  series: SeriesItem[];
  description?: string;
  maxValue?: number;
  extras?: any;
}

export interface SeriesItem {
  name: string;
  period?: string;
  value: any;
  referenceValue: any;
  sum?: number;
  maxValue?: number;
  goalDef?: GoalDef;
  selected?: boolean;
  isSingleToggleActive?: boolean;
  isRelatedWithRightYAxis?: boolean;
  color?: string;
}
export interface ChartModelValue {
  name: string;
  referenceValue: any;
  sum?: number;
  value: any;
  value1?: any;
  value2?: any;
}

/**
 * It's a component to represent data through visualization. It creates a bar chart & norm indicator based on provided data. Layout for the chart can be configured with inputs.
 *
 * @example
 * <!-- For simple bar chart -->
 * <app-bar-chart [domain]='[0, 1000]' [data]='891'></app-bar-chart>
 * <!-- For chart with norm indicator -->
 * <app-bar-chart [domain]='[0, 1000]' [data]='891' [normData]='600'></app-bar-chart>
 * <!-- For chart with norm indicator & custom norm tooltip -->
 * <app-bar-chart [domain]='[0, 1000]' [data]='891' [normData]='600' [normTooltipText]=''$600''></app-bar-chart>
 * <!-- For chart with custom bar height -->
 * <app-bar-chart [domain]='[0, 1000]' [data]='891' [barHeight]='40'></app-bar-chart>
 * <!-- For chart with norm indicator, custom norm indicator height, norm outline width & norm line width -->
 * <app-bar-chart [domain]='[0, 1000]' [data]='891' [normData]='600' [normHeight]='16' [normOutlineWidth]='9' [normLineWidth]='3'></app-bar-chart>
 * <!-- For chart with additional classes -->
 * <app-bar-chart [domain]='[0, 1000]' [data]='891' [normData]='600' [barClass]='my-bar' [normOutlineClass]='my-outline' [normLineClass]='my-line'></app-bar-chart>
 */
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html'
})
export class BarChartComponent implements OnInit, OnChanges, OnDestroy, DoCheck {

  /**
   * Tooltip host to create a tooltip content.
   */
  @ViewChild(TooltipDirective, {static: true}) tooltipHost: TooltipDirective;

  /**
   * Emits respective drill option on tooltip drill button click.
   */
  @Output() toolTipEmitter = new EventEmitter<string>();
  /**
   * Data for plotting the chart. If it's null chart doesn't shows up.
   */
  @Input() data!: number;

  /**
   * Data for indicating the norm. If it's null then, norm tooltip doesn't shows up.
   */
  @Input() normData!: number;

  /**
   * Range for indicating the provided data in chart. Should be provided as [num1, num2] eg:- [10, 20] or [30, 30], otherwise chart doesn't shows up.
   */
  @Input() domain!: [number, number];

  /**
   * Text to show up on bar hover.
   */
  @Input() barTooltipText!: string;

  /**
   * Should the tooltip cover the entire bar
   */
  @Input() toolTipOverlay = false;
  @Input() yAxisTickFormat = '';

  /**
   * Options to drill through the tooltip itself.
   */
  @Input() drillOptions!: string[];

  /**
   * Drill options that are hidden, but applicable when bar is clicked.
   */
  @Input() hiddenDrillOptions!: string[];

  /**
   * Text to show up on norm indicator hover.
   */
  @Input() normTooltipText!: string;

  /**
   * Height for the chart.
   */
  @Input() barHeight = 25;

  /**
   * Height for the norm indicator. Should not be greater than the 1/10th of bar height, otherwise it's fixed internally. And, if norm data is null, it's ignored.
   */
  @Input() normHeight = 16;

  /**
   * Width for the norm indicator outline. And, if norm data is null, it's ignored.
   */
  @Input() normOutlineWidth = 7;

  /**
   * Width for the norm indicator line. Should not be greater than the half of norm outline width, otherwise it's fixed internally. And, if norm data is null, it's ignored.
   */
  @Input() normLineWidth = 1;

  /**
   * Class name for bar.
   */
  @Input() barClass = '';

  /**
   * Class name for norm outline.
   */
  @Input() normOutlineClass = '';

  /**
   * Class name for norm line.
   */
  @Input() normLineClass = '';

  @Input() barColor = '#e31b6d';

  @Input() barHoverColor = 'rgba(6, 38, 153, 0.5)';

  @Input() normOutlineColor = 'rgba(131, 36, 84, 0.2)';

  @Input() normLineColor = '#832454';

  @Input() barTransitionTime = 500;

  @Input() normTransitionTime = 600;

  @Input() isTopLeftRounded = false;

  @Input() isTopRightRounded = false;

  @Input() isBottomRightRounded = false;

  @Input() isBottomLeftRounded = false;

  @Input() borderRadius = 0;

  @ViewChild('svgContainer', {read: ElementRef, static: true}) svgContainerRef!: ElementRef<SVGSVGElement>;

  @Input() goalDef: GoalDef = null;

  @Input() goalStrokeWidth = 1.6;

  @Input() graphPaddingRight = 0;

  @Input() barMetricInfo!: BarMetricInfo;

  @Input() hasBackgroundBar = false;

  @Input() backgroundBarColor = '#e6e7e8';

  @Input() isShowLabels = false;

  @Input() isDrillable = false;

  @Input() drillLabel = 'View';

  @Input() toolTipDirection: 'n' | 'w' | 'e';

  @Output() clickedMetric = new EventEmitter();

  @Input() renderDelay = 0;

  @Input() isDirectionToolTipClose = false;

  @Input() useResizeObserver = true;

  private rendered = false;

  private svgContainerWidth: number;

  private unsubscribe: Subject<void> = new Subject<void>();
  private resizeObserver: ResizeObserver;


  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    if (this.useResizeObserver) {
      this.resizeObserver = new ResizeObserver(entries => {
        this.checkWidthAndRenderChartIfNeeded();
      });
      this.resizeObserver.observe(this.svgContainerRef.nativeElement);
    }
  }

  ngDoCheck(): void {
    // Draw Chart when container width changes and also hande window resize
    if (!this.useResizeObserver) {
      this.checkWidthAndRenderChartIfNeeded();
    }
  }

  /**
   * @ignore
   */
  ngOnChanges() {
    if (this.renderDelay === 0) {
      this.prepareChart();
    } else {
      setTimeout(() => {
        this.prepareChart();
      }, this.renderDelay);
    }
  }

  private getWidth(): number {
    return this.svgContainerRef.nativeElement.getBoundingClientRect().width - this.graphPaddingRight;
  }

  public prepareChart(_width?: number): void {
    if (this.isDataAndDomainAcceptable()) {
      this.fixDomain();
      const tip = ChartUtils.getToolTipForBarChart();
      d3.selectAll('.d3-tip').remove();
      if (this.isDataInRange()) {
        const width = _width !== undefined ? _width : this.getWidth();
        const xScale = d3.scaleLinear().domain(this.domain).range([0, width]);
        const scaledData = xScale(this.data);
        const barWidth = scaledData < 0.01 * width && this.data !== this.domain[0] ? 0.01 * width : scaledData;
        const svg = d3.select(this.svgContainerRef.nativeElement);
        const barTooltipText = this.barTooltipText;
        const rect = svg.selectAll<SVGPathElement, number>('path.bar').data(this.hasBackgroundBar? [1, 2] : [1]);

        const barRoundCorner: BarRoundCorner = {
          topLeft: this.isTopLeftRounded,
          topRight: this.isTopRightRounded,
          bottomLeft: this.isBottomLeftRounded,
          bottomRight: this.isBottomRightRounded
        };

        rect.enter()
          .append('path')
          .attr('d', ChartUtils.getRightRoundedRectPath(0, 0, 0, 0, 0, barRoundCorner))
          .attr('fill', (d, i) => {
            if (this.hasBackgroundBar) {
              return [this.backgroundBarColor, this.barColor][i];
            }
            return this.barColor;
          })
          .attr('class', `bar ${this.barClass}`)
          .merge(rect)
          .each((datum, index, groups) => {
            if (this.hasBackgroundBar && !index) {
              return;
            }
            this.fixBarTooltipText();
            const current = d3.select(groups[index]);
            current.call(tip);
            current
              .on('mouseover', (event, d) => {
                const nodes = current.nodes();
                const i = nodes.indexOf(this);
                const tooltipText = this.barTooltipText;
                if (this.isDrillable) {
                  const x = event.pageX, y = event.pageY;
                  callback(() => {
                    const buttons = this.drillOptions
                      ?.filter((o) => !this.hiddenDrillOptions?.includes(o) ?? true)
                      ?.map((option) => {
                        const btn: TooltipButton = {
                          id: `btn${option}`,
                          name: option,
                          callback: () => {
                            this.toolTipEmitter.emit(option);
                            ChartUtils.destroyToolTip();
                          },
                        };
                        return btn;
                      });
                    const tooltip = {
                      toolTipData: {
                        text: tooltipText,
                      },
                      buttonGroups: buttons?.length > 0 ? [{ name: this.drillLabel, buttons }] : null,
                    };
                    ChartUtils.initComplexToolTip(
                      x, y,
                      tip,
                      nodes[i],
                      this.componentFactoryResolver,
                      this.tooltipHost,
                      tooltip,
                      TOOLTIP_REMOVAL_DEBOUNCE_TIME,
                      undefined,
                      this.toolTipDirection,
                      this.isDirectionToolTipClose
                    );
                  });
                } else {
                  ChartUtils.destroyToolTip();
                  ChartUtils.initToolTip(tip, barTooltipText, current.node());
                }
              })
              .on('mouseout', () => {
                if (this.isDrillable) {
                  ChartUtils.debounceDestroyToolTip();
                } else {
                  ChartUtils.destroyToolTip();
                }
              })
              .on('click', () => {
                if (this.isDrillable) {
                  this.clickedMetric.emit(this.drillOptions[0]);
                } else if (this.barMetricInfo && this.barMetricInfo.isClickable) {
                  this.clickedMetric.emit(this.barMetricInfo);
                }
              });
          })
          .attr('d', (d, i, elements) => {
            const elementWidth = (this.hasBackgroundBar && !i) ? width : barWidth;
            return ChartUtils.getRightRoundedRectPath(0, 0, elementWidth, this.barHeight, barWidth === 0 ? barWidth :
              this.borderRadius ? this.borderRadius : this.barHeight * 0.2, barRoundCorner);
          })
          .transition().duration(this.barTransitionTime)
          .attr('fill', (d, i) => {
            if (this.hasBackgroundBar) {
              return [this.backgroundBarColor, this.barColor][i];
            }
            return this.barColor;
          })
          .attr('class', `bar ${this.barClass}`);

        if (this.isShowLabels) {
          const text = svg.selectAll<SVGPathElement, number>('text.label-text').data([this.data]);
          text.exit().remove();
          text.enter()
            .append('text')
            .attr('class', 'label-text text-bold')
            .merge(text as any)
            .attr('x', (d) => xScale(d) / 2)
            .attr('y', this.barHeight / 2)
            .attr('dy', '4px')
            .attr(ChartConstants.textAnchor, 'middle')
            .text(d => d);
        }

        if (this.isNormDataAcceptable()) {
          if (this.isNormDataInRange()) {
            this.fixNormInputs();
            const normTip =    ChartUtils.getToolTipForBarChart();
            const normPoint = `${xScale(this.normData)}`;
            let normGroup = svg.selectAll<SVGGElement, number>('g.norm').data([1]);
            normGroup = normGroup.enter().append('g')
              .attr('class', 'norm')
              .merge(normGroup)
              .each((datum, index, groups) => {
                const current = d3.select(groups[index]);
                const normTooltipText = this.normTooltipText;
                current.call(normTip);
                current
                  .on('mouseover', function (d) {
                    ChartUtils.flushDestroyToolTip();
                    ChartUtils.initToolTip(normTip, normTooltipText, current.node());
                  })
                  .on('mouseout', function () {
                    d3.selectAll('.d3-tip').remove();
                  })
                  .on('click', () => {
                    if (this.barMetricInfo && this.barMetricInfo.isClickable) {
                      this.clickedMetric.emit(this.barMetricInfo);
                    }
                  });
              });
            const normOutline = normGroup.selectAll<SVGLineElement, number>('line.norm-outline').data([1]);
            normOutline.enter()
              .append('line')
              .attr('x1', 0)
              .attr('x2', 0)
              .attr('y1', (this.barHeight - (this.normHeight - this.normOutlineWidth)) / 2)
              .attr('y2', this.barHeight - (this.barHeight - (this.normHeight - this.normOutlineWidth)) / 2)
              .attr('stroke-width', this.normOutlineWidth)
              .attr('stroke', this.normOutlineColor)
              .attr('stroke-linecap', 'round')
              .attr('class', `norm-outline ${this.normOutlineClass}`)
              .merge(normOutline)
              .transition().duration(this.normTransitionTime)
              .attr('x1', normPoint)
              .attr('x2', normPoint)
              .attr('y1', (this.barHeight - (this.normHeight - this.normOutlineWidth)) / 2)
              .attr('y2', this.barHeight - (this.barHeight - (this.normHeight - this.normOutlineWidth)) / 2)
              .attr('stroke-width', this.normOutlineWidth)
              .attr('stroke', this.normOutlineColor)
              .attr('class', `norm-outline ${this.normOutlineClass}`);
            const normLine = normGroup.selectAll<SVGLineElement, number>('line.norm-line').data([1]);
            normLine.enter()
              .append('line')
              .attr('x1', 0)
              .attr('x2', 0)
              .attr('y1', (this.barHeight - this.normHeight) / 2)
              .attr('y2', this.barHeight - (this.barHeight - this.normHeight) / 2)
              .attr('stroke-width', this.normLineWidth)
              .attr('stroke', this.normLineColor)
              .attr('class', `norm-line ${this.normLineClass}`)
              .merge(normLine)
              .transition().duration(this.normTransitionTime)
              .attr('x1', normPoint)
              .attr('x2', normPoint)
              .attr('y1', (this.barHeight - this.normHeight) / 2)
              .attr('y2', this.barHeight - (this.barHeight - this.normHeight) / 2)
              .attr('stroke-width', this.normLineWidth)
              .attr('stroke', this.normLineColor)
              .attr('class', `norm-line ${this.normLineClass}`);
            const tooltipFixRect = normGroup.selectAll<SVGRectElement, number>('rect').data([1]);
            tooltipFixRect.enter()
              .append('rect')
              .attr('x', 0)
              .attr('y', (this.barHeight - this.normHeight) / 2)
              .attr('width', 1)
              .attr('height', this.normHeight)
              .attr('fill', 'none')
              .merge(tooltipFixRect)
              .transition().duration(this.normTransitionTime)
              .attr('x', normPoint)
              .attr('y', (this.barHeight - this.normHeight) / 2)
              .attr('height', this.normHeight);
          } else {
            this.removeNormIndicator();
            console.warn(`Bar Chart Component :: The norm data is not in range of domain.`);
          }
        } else {
          this.removeNormIndicator();
        }

        this.drawGoal(this.goalDef, svg, xScale);

        if (this.toolTipOverlay) {
          // tooltip that covers everything in the bar chart
          const toolTipRect = svg.selectAll<SVGPathElement, number>('path.overlay-tooltip').data([1]);

          const widths = [barWidth];
          if (this.goalDef) {
            for (const value of this.goalDef.values) {
              widths.push(xScale(value));
            }
          }
          toolTipRect.enter()
            .append('path')
            .attr('fill', 'transparent')
            .attr('class', `overlay-tooltip`)
            .merge(toolTipRect)
            .attr('d', ChartUtils.getRightRoundedRectPath(0, 0, Math.max(...widths), this.barHeight, barWidth === 0 ? barWidth :
              this.borderRadius ? this.borderRadius : this.barHeight * 0.2, barRoundCorner))
            .each((datum, index, groups) => {
              const tooltipText = this.barTooltipText;
              const current = d3.select(groups[index]);
              current.call(tip);
              current
                .on('mouseover', function (d) {
                  ChartUtils.initToolTip(tip, tooltipText, current.node());
                })
                .on('mouseout', function () {
                  d3.selectAll('.d3-tip').remove();
                })
                .on('click', () => {
                  if (this.barMetricInfo && this.barMetricInfo.isClickable) {
                    this.clickedMetric.emit(this.barMetricInfo);
                  }
                });
            });
        }
      } else {
        this.removeBarRect();
        this.removeNormIndicator();
        console.warn(`Bar Chart Component :: The data isn't in range of domain.`);
      }
    } else {
      this.removeBarRect();
      this.removeNormIndicator();
    }
  }

  private removeBarRect() {
    const barRoundCorner: BarRoundCorner = {
      topLeft: this.isTopLeftRounded,
      topRight: this.isTopRightRounded,
      bottomLeft: this.isBottomLeftRounded,
      bottomRight: this.isBottomRightRounded
    };
    d3.select(this.svgContainerRef.nativeElement).select('path.bar')
      .transition().duration(this.barTransitionTime)
      .attr('d', ChartUtils.getRightRoundedRectPath(0, 0, 0, 0, 0, barRoundCorner))
      .remove();
  }

  private removeNormIndicator() {
    const normGroup = d3.select(this.svgContainerRef.nativeElement).select('g.norm');
    normGroup.select('line.norm-outline')
      .transition().duration(this.normTransitionTime)
      .attr('x1', 0)
      .attr('x2', 0);
    normGroup.select('line.norm-line')
      .transition().duration(this.normTransitionTime)
      .attr('x1', 0)
      .attr('x2', 0);
    normGroup.select('rect')
      .transition().duration(this.normTransitionTime)
      .attr('x', 0);
    normGroup.transition().duration(this.normTransitionTime)
      .style('opacity', 0)
      .remove();
  }

  private isDataAcceptable(): boolean {
    return this.data != null && typeof this.data === 'number';
  }

  private isDomainAcceptable(): boolean {
    return this.domain != null && this.domain.length != null && this.domain.length === 2 && typeof this.domain[0] === 'number' && typeof this.domain[1] === 'number';
  }

  /**
   * Determines whether data if acceptable for chart.
   * @ignore
   */
  private isDataAndDomainAcceptable(): boolean {
    return this.isDataAcceptable() && this.isDomainAcceptable();
  }

  private isNormDataAcceptable(): boolean {
    return !!this.normData;
  }

  /**
   * Fix the range input.
   * @ignore
   */
  private fixDomain(): void {
    if (this.domain[0] > this.domain[1]) {
      this.domain = [this.domain[1], this.domain[0]];
    }
  }

  private isDataInRange(): boolean {
    return this.domain[0] <= this.data && this.domain[1] >= this.data;
  }

  private isNormDataInRange(): boolean {
    return this.domain[0] <= this.normData && this.domain[1] >= this.normData;
  }

  /**
   * Fix the bar tooltip text.
   * @ignore
   */
  private fixBarTooltipText(): void {
    this.barTooltipText = this.barTooltipText == null ? `${this.data}` : this.barTooltipText;
  }

  /**
   * Fixes all the norm inputs.
   * @ignore
   */
  private fixNormInputs(): void {
    this.fixNormLineWidth();
    this.fixNormHeight();
    this.fixNormTooltipText();
  }

  /**
   * Fix the norm line height.
   * @ignore
   */
  private fixNormLineWidth(): void {
    this.normLineWidth = this.normLineWidth > this.normOutlineWidth / 2 ? this.normOutlineWidth / 2 : this.normLineWidth;
  }

  /**
   * Fix the norm norm height.
   * @ignore
   */
  private fixNormHeight(): void {
    this.normHeight = this.normHeight > this.barHeight ? this.barHeight : this.normHeight;
  }

  /**
   * Fix the norm tooltip text.
   * @ignore
   */
  private fixNormTooltipText(): void {
    this.normTooltipText = this.normTooltipText == null ? `${this.normData}` : this.normTooltipText;
  }

  private checkWidthAndRenderChartIfNeeded() {
    const width = this.getWidth();
    if (width !== this.svgContainerWidth) {
      if (this.renderDelay === 0) {
        this.prepareChart(width);
      } else {
        setTimeout(() => {
          this.prepareChart(width);
        }, this.renderDelay);
      }
    }
    this.svgContainerWidth = width;
    this.rendered = true;
  }

  private drawGoal(goal: GoalDef, svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, xScale: d3.ScaleLinear<number, number>) {
    const tip = ChartUtils.getToolTipForBarChart();

    const goalPolygonData = [];
    const goalLineData = [];
    if (goal) {
      if (goal.operator === 'BTWN') {
        const polygonPoints = [];
        const from = xScale(this.goalDef.values[0]);
        let to = xScale(this.goalDef.values[1]);
        const width = to - from;
        if (width < 2) {
          to = from + 2;
        }
        polygonPoints.push({x: from, y: 0}, {x: from, y: this.barHeight}, {x: to, y: this.barHeight}, {x: to, y: 0});
        goalPolygonData.push(polygonPoints.reduce((accumulator, currentValue) => accumulator + `${currentValue.x},${currentValue.y} `, ''));
        goalLineData.push(Math.max(xScale((goal.values[0] + goal.values[1]) / 2), 1));
      } else {
        goalLineData.push(Math.max(xScale(goal.values[0]), 1));
      }
    }

    const goalTooltipText = this.barTooltipText;
    const goalGroup = svg.selectAll<SVGGElement, number>('g.goals').data([1]);
    const goalGroupSelection = goalGroup
      .enter().append('g')
      .attr('class', 'goals')
      .merge(goalGroup).each((datum, index, groups) => {
        const current = d3.select(groups[index]);
        current.call(tip);
        current
          .on('mouseover',  (event, d) => {
            const nodes = current.nodes();
            const i = nodes.indexOf(this);
            const tooltipText = goalTooltipText;
            if (this.isDrillable) {
              const x = event.pageX, y = event.pageY;
              callback(() => {
                const tooltip = {
                  toolTipData: {
                    text: tooltipText,
                  },
                  buttonGroups: [
                    {
                      name: this.drillLabel,
                      buttons: this.drillOptions?.map((option) => {
                        const btn: TooltipButton = {
                          id: `btn${option}`,
                          name: option,
                          callback: () => {
                            this.toolTipEmitter.emit(option);
                            ChartUtils.destroyToolTip();
                          },
                        };
                        return btn;
                      }),
                    },
                  ],
                };
                ChartUtils.initComplexToolTip(
                  x, y,
                  tip,
                  nodes[i],
                  this.componentFactoryResolver,
                  this.tooltipHost,
                  tooltip,
                  TOOLTIP_REMOVAL_DEBOUNCE_TIME,
                  undefined,
                  this.toolTipDirection
                );
              });
            } else {
              ChartUtils.destroyToolTip();
              ChartUtils.initToolTip(tip, goalTooltipText, current.node());
            }
          })
          .on('mouseout',  () => {
            if (this.isDrillable) {
              ChartUtils.debounceDestroyToolTip();
            } else {
              ChartUtils.destroyToolTip();
            }
          });
      });

    const betweenPolygon = goalGroupSelection.selectAll<SVGPolygonElement, number>('polygon').data(goalPolygonData);
    betweenPolygon.enter().append('polygon')
      .merge(betweenPolygon)
      .attr('points', d => d)
      .attr('fill', '#9579D3')
      .attr('stroke-dasharray', '1,1')
      .style('opacity', .7)
      .on('click', () => {
        if (this.barMetricInfo && this.barMetricInfo.isClickable) {
          this.clickedMetric.emit(this.barMetricInfo);
        }
      });

    betweenPolygon.exit().remove();

    const lessThanGreaterThanLine = goalGroupSelection.selectAll<SVGLineElement, number>('line.goal-line').data(goalLineData);
    lessThanGreaterThanLine.enter()
      .append('line')
      .merge(lessThanGreaterThanLine)
      .attr('x1', d => d)
      .attr('x2', d => d)
      .attr('y1', this.barHeight)
      .attr('y2', 0)
      .attr('stroke-width', this.goalStrokeWidth)
      .attr('stroke', '#E5228B')
      .attr('stroke-dasharray', '5,5')
      .attr('class', `goal-line`)
      .on('click', () => {
        if (this.barMetricInfo && this.barMetricInfo.isClickable) {
          this.clickedMetric.emit(this.barMetricInfo);
        }
      });

    lessThanGreaterThanLine.exit().remove();

    const rectAroundGoalLine = goalGroupSelection.selectAll<SVGRectElement, number>('rect').data(goalLineData);
    if (goal && goal.operator && goal.operator !== 'BTWN') {
      rectAroundGoalLine.enter()
        .append('rect')
        .merge(rectAroundGoalLine)
        .attr('x', goalLineData[0] - 3)
        .attr('y', function (d, i) {
          return i * 1;
        })
        .attr('height', this.barHeight)
        .attr('width', function (d) {
          return 6;
        })
        .on('click', () => {
          if (this.barMetricInfo && this.barMetricInfo.isClickable) {
            this.clickedMetric.emit(this.barMetricInfo);
          }
        })
        .style('opacity', .0)
        .style('fill', this.normLineColor);
    }
    rectAroundGoalLine.exit().remove();

  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    d3.select(this.svgContainerRef as any).remove();
    if (this.unsubscribe) {
      this.unsubscribe.next();
      this.unsubscribe.complete();
    }
  }
}

