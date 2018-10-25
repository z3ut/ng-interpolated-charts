import { InterpolatedChart } from './interpolated-chart.component';
import { InterpolatedBarChart } from './interpolated-bar-chart.component';
import { InterpolatedStackBar } from './interpolated-stack-bar.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    InterpolatedChart,
    InterpolatedBarChart,
    InterpolatedStackBar
  ],
  exports: [
    InterpolatedChart,
    InterpolatedBarChart,
    InterpolatedStackBar
  ]
})
export class InterpolatedChartModule { }
