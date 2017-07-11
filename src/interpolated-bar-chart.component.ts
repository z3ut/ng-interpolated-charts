import { Component, OnChanges, ViewEncapsulation, Input, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import {
  bar, chartEvents, verticalDivider, tooltip,
  PathDataSet, TickFormat, PointData, BarChartConfig,
  VerticalDividerConfig, TooltipConfig, MarkersConfig
} from 'interpolated-charts';

@Component({
  selector: 'interpolated-bar-chart',
  template: '',
  styleUrls: ['../../interpolated-charts/dist/index.css'],
  encapsulation: ViewEncapsulation.None
})
export class InterpolatedBarChart implements OnChanges {

  @Input() data: PathDataSet[];

  /* bar chart params */
  @Input() width: number;
  @Input() height: number;
  @Input() margin: { top: number, right: number, bottom: number, left: number };
  @Input() setStackWidth: (chartWidth:number, numberOfBars: number) => number;
  @Input() maxTimeRangeDifferenceToDraw: number;
  @Input() stackTimeDiapason: number;
  @Input() xAxisTimeFormat: TickFormat;
  @Input() yAxisValueFormat: TickFormat;
  @Input() xAxisDateFrom: Date;
  @Input() xAxisDateTo: Date;
  @Input() yAxisValueFrom: number;
  @Input() yAxisValueTo: number;

  /* bar chart events */
  @Input() onMouseEnter: ({ x, y }: { x: number, y: number }) => {};
  @Input() onMouseLeave: ({ x, y }: { x: number, y: number }) => {};
  @Input() onMouseMove: ({ x, y, selectedDate, data }: { x: number, y: number, selectedDate: Date, data: PointData[] }) => {};
  @Input() onMouseClick: ({ x, y, selectedDate, data }: { x: number, y: number, selectedDate: Date, data: PointData[] }) => {};

  /* marker plugin params */
  @Input() cx: (data: PointData) => number;
  @Input() cy: (data: PointData) => number;
  @Input() radius: (data: PointData) => number;
  @Input() fill: (data: PointData) => string;
  @Input() stroke: (data: PointData) => string;
  @Input() strokeWidth: (data: PointData) => number;
  @Input() markerSort: (a: PointData, b: PointData) => number;

  /* tooltip plugin params */
  @Input() tooltipWidth: number;
  @Input() horizontalMouseMargin: number;
  @Input() verticalBorderMargin: number;
  @Input() headerFormatter: (date: Date) => string;
  @Input() topicFormatter: (data: PointData) => string;
  @Input() valueFormatter: (data: PointData) => string;
  @Input() tooltipSort: (a, b) => number;

  /* line chart defaults */
  chartDefaultHeight = 500;
  chartDefaultWidth = 700;
  defaultMargin = { top: 20, right: 30, bottom: 40, left: 40 };

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
      .attr('class', 'chart');
  }

  initializeChart() {
    const { barChartConfig, tooltipConfig,
      verticalDividerConfig } = this.createConfig();

    this.clearHost();

    const tooltipPlugin = tooltip(tooltipConfig);
    const verticalDividerPlugin = verticalDivider(verticalDividerConfig);

    const barChart = bar(barChartConfig)
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

    const chartContainer = this.host.select('.chart');
    chartContainer.datum(this.data).call(barChart);

    const metadataContainer = this.host.select('.chart .metadata-container');
    metadataContainer.datum([]).call(verticalDividerPlugin);
    metadataContainer.datum([]).call(tooltipPlugin);
  }

  createConfig(): { barChartConfig: BarChartConfig,
      tooltipConfig: TooltipConfig, verticalDividerConfig: VerticalDividerConfig} {

    const chartHeight = this.height || this.chartDefaultHeight;
    const chartWidth = this.width || this.chartDefaultWidth;

    const { top: marginTop = 20, right: marginRight = 30,
        bottom: marginBottom = 40, left: marginLeft = 40
      } = this.margin || this.defaultMargin;

    const innerChartHeight = chartHeight - marginTop - marginBottom;
    const innerChartWidth = chartWidth - marginLeft - marginRight;

    const barChartConfig: BarChartConfig = {
      width: this.width,
      height: this.height,
      margin: this.margin,
      setStackWidth: this.setStackWidth,
      maxTimeRangeDifferenceToDraw: this.maxTimeRangeDifferenceToDraw,
      stackTimeDiapason: this.stackTimeDiapason,
      xAxisTimeFormat: this.xAxisTimeFormat,
      yAxisValueFormat: this.yAxisValueFormat,
      xAxisDateFrom: this.xAxisDateFrom,
      xAxisDateTo: this.xAxisDateTo,
      yAxisValueFrom: this.yAxisValueFrom,
      yAxisValueTo: this.yAxisValueTo,
    };

    const markersConfig: MarkersConfig = {
      cx: this.cx,
      cy: this.cy,
      radius: this.radius,
      fill: this.fill,
      stroke: this.stroke,
      strokeWidth: this.strokeWidth,
      sort: this.markerSort
    };

    const tooltipConfig: TooltipConfig = {
      chartHeight: innerChartHeight,
      chartWidth: innerChartWidth,
      tooltipWidth: this.tooltipWidth,
      horizontalMouseMargin: this.horizontalMouseMargin,
      verticalBorderMargin: this.verticalBorderMargin,
      headerFormatter: this.headerFormatter,
      topicFormatter: this.topicFormatter,
      valueFormatter: this.valueFormatter,
      sort: this.tooltipSort
    };

    const verticalDividerConfig: VerticalDividerConfig = {
      height: innerChartHeight
    };

    return {
      barChartConfig,
      tooltipConfig,
      verticalDividerConfig
    }
  }
}
