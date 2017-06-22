import { InterpolatedChart } from './interpolated-chart.component';
import { InterpolatedStackBar } from './interpolated-stack-bar.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    InterpolatedChart,
    InterpolatedStackBar
  ],
  exports: [
    InterpolatedChart,
    InterpolatedStackBar
  ]
})
export class InterpolatedChartModule { }
