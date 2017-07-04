import { Component, OnChanges, ViewEncapsulation, Input, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import {
  stackBar, chartEvents, verticalDivider, markers, tooltip,
  StackBarData, TickFormat, StackBarConfig, StackBarPointData,
  StackBarEventData, VerticalDividerConfig, TooltipConfig, MarkersConfig
} from 'interpolated-charts';

@Component({
  selector: 'interpolated-stack-bar',
  template: '',
  styleUrls: ['../../interpolated-charts/dist/index.css'],
  encapsulation: ViewEncapsulation.None
})
export class InterpolatedStackBar implements OnChanges {

  @Input() data: StackBarData[];

  /* stack bar params */
  @Input() width: number;
  @Input() height: number;
  @Input() margin: { top: number, right: number, bottom: number, left: number };
  @Input() marginBetweenStacks: number;
  @Input() backgroundColor: string;
  @Input() maxTimeRangeDifferenceToDraw: number;
  @Input() xAxisTimeFormat: TickFormat;
  @Input() mouseMoveTimeTreshold: number;
  @Input() xAxisDateFrom: Date;
  @Input() xAxisDateTo: Date;

  /* stack bar events */
  @Input() onMouseEnter: ({ x, y }: { x: number, y: number }) => {};
  @Input() onMouseLeave: ({ x, y }: { x: number, y: number }) => {};
  @Input() onMouseMove: ({ x, y, selectedDate, data }: { x: number, y: number, selectedDate: Date, data: StackBarPointData[] }) => {};
  @Input() onMouseClick: ({ x, y, selectedDate, data }: { x: number, y: number, selectedDate: Date, data: StackBarPointData[] }) => {};

  /* tooltip plugin params */
  @Input() tooltipWidth: number;
  @Input() horizontalMouseMargin: number;
  @Input() verticalBorderMargin: number;
  @Input() headerFormatter: (date: Date) => string;
  @Input() topicFormatter: (data: StackBarEventData) => string = data => data.name;
  @Input() valueFormatter: (data: StackBarEventData) => string = data => data.value !== undefined ? String(data.value) : 'No data';
  @Input() tooltipSort: (a, b) => number;

  /* stack bar defaults */
  chartDefaultHeight = 120;
  chartDefaultWidth = 700;
  defaultMargin = { top: 20, right: 30, bottom: 40, left: 40 };

  /* plugin defaults */
  tooltipDefaultVerticalBorderMargin = -10;

  host;

  constructor(private element: ElementRef) {
    this.host = d3.select(element.nativeElement);
  }

  ngOnChanges() {
    if (!this.data || !this.data.length) {
      this.clearHost();
      return;
    }

    this.initializeChart();
  }

  clearHost() {
    this.host
      .html('');

    this.host
      .append('div')
      .attr('class', 'stack-bar');
  }

  initializeChart() {
    const { stackBarChartConfig, tooltipConfig,
      verticalDividerConfig } = this.createConfig();

    this.clearHost();

    const tooltipPlugin = tooltip(tooltipConfig);
    const verticalDividerPlugin = verticalDivider(verticalDividerConfig);

    const lineChart = stackBar(stackBarChartConfig)
      .on(chartEvents.chartMouseEnter, (options) => {
        verticalDividerPlugin.show();

        if (this.onMouseEnter) {
          this.onMouseEnter(options);
        }
      })
      .on(chartEvents.chartMouseLeave, (options) => {
        verticalDividerPlugin.remove();
        tooltipPlugin.remove();

        if (this.onMouseLeave) {
          this.onMouseLeave(options);
        }
      })
      .on(chartEvents.chartMouseMove, (options) => {
        verticalDividerPlugin.update(options);
        tooltipPlugin.show(options);

        if (this.onMouseMove) {
          this.onMouseMove(options);
        }
      })
      .on(chartEvents.chartMouseClick, (options) => {
        if (this.onMouseClick) {
          this.onMouseClick(options);
        }
      });

    const chartContainer = this.host.select('.stack-bar');
    chartContainer.datum(this.data).call(lineChart);

    const metadataContainer = this.host.select('.stack-bar .metadata-container');
    metadataContainer.datum([]).call(verticalDividerPlugin);
    metadataContainer.datum([]).call(tooltipPlugin);
  }

  createConfig(): { stackBarChartConfig: StackBarConfig,
      tooltipConfig: TooltipConfig, verticalDividerConfig: VerticalDividerConfig} {

    const chartHeight = this.height || this.chartDefaultHeight;
    const chartWidth = this.width || this.chartDefaultWidth;

    const { top: marginTop = 20, right: marginRight = 30,
        bottom: marginBottom = 40, left: marginLeft = 40
      } = this.margin || this.defaultMargin;

    const innerChartHeight = chartHeight - marginTop - marginBottom;
    const innerChartWidth = chartWidth - marginLeft - marginRight;

    const stackBarChartConfig: StackBarConfig = {
      width: this.width,
      height: this.height,
      margin: this.margin,
      marginBetweenStacks: this.marginBetweenStacks,
      maxTimeRangeDifferenceToDraw: this.maxTimeRangeDifferenceToDraw,
      xAxisTimeFormat: this.xAxisTimeFormat,
      mouseMoveTimeTreshold: this.mouseMoveTimeTreshold,
      xAxisDateFrom: this.xAxisDateFrom,
      xAxisDateTo: this.xAxisDateTo
    };

    const tooltipConfig: TooltipConfig = {
      chartHeight: innerChartHeight,
      chartWidth: innerChartWidth,
      tooltipWidth: this.tooltipWidth,
      horizontalMouseMargin: this.horizontalMouseMargin,
      // margin can be 0
      verticalBorderMargin: this.verticalBorderMargin == null ?
        this.tooltipDefaultVerticalBorderMargin :
        this.verticalBorderMargin,
      headerFormatter: this.headerFormatter,
      topicFormatter: this.topicFormatter,
      valueFormatter: this.valueFormatter,
      sort: this.tooltipSort
    };

    const verticalDividerConfig: VerticalDividerConfig = {
      height: innerChartHeight
    };

    return {
      stackBarChartConfig,
      tooltipConfig,
      verticalDividerConfig
    }
  }
}
