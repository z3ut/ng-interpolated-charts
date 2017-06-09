import { Component, OnChanges, ViewEncapsulation, Input, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { line, chartEvents, verticalDivider, markers, tooltip,
  PathDataSet, TickFormat, ChartLinePointData, LineChartConfig,
  VerticalDividerConfig, TooltipConfig, MarkersConfig  } from 'interpolated-charts';

@Component({
  selector: 'interpolated-chart',
  template: '',
  styleUrls: ['./interpolated-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InterpolatedChart implements OnChanges {

  @Input() data: PathDataSet[];

  /* line chart params */
  @Input() width: number;
  @Input() height: number;
  @Input() margin: { top: number, right: number, bottom: number, left: number };
  @Input() maxTimeRangeDifferenceToDraw: number;
  @Input() xAxisTimeFormat: TickFormat;
  @Input() yAxisValueFormat: TickFormat;
  @Input() curve: d3.CurveFactory;
  @Input() interpolationMaxIterationCount: number;
  @Input() interpolationAccuracy: number;
  @Input() mouseMoveTimeTreshold: number;

  /* line chart events */
  @Input() onMouseEnter: ({ x, y }: { x: number, y: number }) => {};
  @Input() onMouseLeave: ({ x, y }: { x: number, y: number }) => {};
  @Input() onMouseMove: ({ x, y, selectedDate, data }: { x: number, y: number, selectedDate: Date, data: ChartLinePointData[] }) => {};
  @Input() onMouseClick: ({ x, y, selectedDate, data }: { x: number, y: number, selectedDate: Date, data: ChartLinePointData[] }) => {};

  /* marker plugin params */
  @Input() cx: (data: ChartLinePointData) => number;
  @Input() cy: (data: ChartLinePointData) => number;
  @Input() radius: (data: ChartLinePointData) => number;
  @Input() fill: (data: ChartLinePointData) => string;
  @Input() stroke: (data: ChartLinePointData) => string;
  @Input() strokeWidth: (data: ChartLinePointData) => number;
  @Input() markerSort: (a: ChartLinePointData, b: ChartLinePointData) => number;

  /* tooltip plugin params */
  @Input() tooltipWidth: number;
  @Input() horizontalMouseMargin: number;
  @Input() verticalBorderMargin: number;
  @Input() headerFormatter: (date: Date) => string;
  @Input() topicFormatter: (data: ChartLinePointData) => string;
  @Input() valueFormatter: (data: ChartLinePointData) => string;
  @Input() tooltipSort: (a, b) => number;

  /* line chart defaults */
  chartDefaultHeight = 500;
  chartDefaultWidth = 700;
  defaultMargin = { top: 20, right: 30, bottom: 40, left: 30 };

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
    const { lineChartConfig, markersConfig, tooltipConfig,
      verticalDividerConfig } = this.createConfig();

    this.clearHost();

    const markersPlugin = markers(markersConfig);
    const tooltipPlugin = tooltip(tooltipConfig);
    const verticalDividerPlugin = verticalDivider(verticalDividerConfig);

    const lineChart = line(lineChartConfig)
      .on(chartEvents.chartMouseEnter, (options) => {
        verticalDividerPlugin.show();

        if (this.onMouseEnter) {
          this.onMouseEnter(options);
        }
      })
      .on(chartEvents.chartMouseLeave, (options) => {
        verticalDividerPlugin.remove();
        markersPlugin.remove();
        tooltipPlugin.remove();

        if (this.onMouseLeave) {
          this.onMouseLeave(options);
        }
      })
      .on(chartEvents.chartMouseMove, (options) => {
        verticalDividerPlugin.update(options);
        markersPlugin.show(options);
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
    chartContainer.datum(this.data).call(lineChart);

    const metadataContainer = this.host.select('.chart .metadata-container');
    metadataContainer.datum([]).call(verticalDividerPlugin);
    metadataContainer.datum([]).call(markersPlugin);
    metadataContainer.datum([]).call(tooltipPlugin);
  }

  createConfig(): { lineChartConfig: LineChartConfig, markersConfig: MarkersConfig,
      tooltipConfig: TooltipConfig, verticalDividerConfig: VerticalDividerConfig} {

    const chartHeight = this.height || this.chartDefaultHeight;
    const chartWidth = this.width || this.chartDefaultWidth;

    const { top: marginTop = 20, right: marginRight = 30,
        bottom: marginBottom = 40, left: marginLeft = 40
      } = this.margin || this.defaultMargin;

    const innerChartHeight = chartHeight - marginTop - marginBottom;
    const innerChartWidth = chartWidth - marginLeft - marginRight;

    const lineChartConfig: LineChartConfig = {
      width: this.width,
      height: this.height,
      margin: this.margin,
      maxTimeRangeDifferenceToDraw: this.maxTimeRangeDifferenceToDraw,
      xAxisTimeFormat: this.xAxisTimeFormat,
      yAxisValueFormat: this.yAxisValueFormat,
      curve: this.curve,
      interpolationMaxIterationCount: this.interpolationMaxIterationCount,
      interpolationAccuracy: this.interpolationAccuracy,
      mouseMoveTimeTreshold: this.mouseMoveTimeTreshold
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
      lineChartConfig,
      markersConfig,
      tooltipConfig,
      verticalDividerConfig
    }
  }
}
