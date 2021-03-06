# Angular Interpolated Charts

Angular 2 component for [interpolated-charts](https://github.com/z3ut/interpolated-charts)

## Installation

1. Install package with [npm](https://www.npmjs.com)

```
npm install ng-interpolated-charts interpolated-charts --save
```

2. Import and register module

```typescript
import { InterpolatedChartModule } from 'ng-interpolated-charts';

@NgModule({
  imports: [
    InterpolatedChartModule
  ]
})
```

## Usage

Inside template:

```html
<!-- line chart -->
<interpolated-chart
  [data]="chartData"
  [yAxisValueFormat]="yAxisValueFormat"
  [valueFormatter]="valueFormatter">
</interpolated-chart>

<!-- stack bar -->
<interpolated-stack-bar
  [data]="stackBarData">
</interpolated-stack-bar>
```

Inside component:

```typescript
chartData = [
  {
    name: 'Minsk',
    data: [
      { 'date': new Date('2015-01-01T00:00:00'), 'value': 20 },
      { 'date': new Date('2015-01-02T00:00:00'), 'value': 16 },
      { 'date': new Date('2015-01-03T00:00:00'), 'value': 21 }
    ]
  }
];
yAxisValueFormat = value => `${value}°C`;
valueFormatter = ({interpolatedValue}) => `${interpolatedValue.toFixed(1)}°C`;

stackBarData = [
  { date: new Date('2015-01-01T00:00:00'), color: 'red', name: 'dry', value: 1 },
  { date: new Date('2015-01-02T00:00:00'), color: 'red', name: 'dry', value: 1 },
  { date: new Date('2015-01-03T00:00:00'), color: 'yellow', name: 'wet', value: 2 },
  { date: new Date('2015-01-04T00:00:00'), color: 'yellow', name: 'wet', value: 2 },

  { date: new Date('2015-01-06T00:00:00'), color: 'blue', name: 'snow', value: 3 },
  { date: new Date('2015-01-07T00:00:00'), color: 'blue', name: 'snow', value: 3 },
  { date: new Date('2015-01-11T00:00:00'), color: 'green', name: 'ice', value: 4 },
  { date: new Date('2015-01-12T00:00:00'), color: 'green', name: 'ice', value: 4 },
  { date: new Date('2015-01-13T00:00:00'), color: 'green', name: 'ice', value: 4 }
];
```

## Documentation

Chart documentation [here](https://github.com/z3ut/interpolated-charts#documentation)

Component inputs:

### Line Chart config

Binding name | Config Name
--- | ---
width | width
height | height
margin | margin
maxTimeRangeDifferenceToDraw | maxTimeRangeDifferenceToDraw
xAxisTimeFormat | xAxisTimeFormat
yAxisValueFormat | yAxisValueFormat
curve | curve
interpolationMaxIterationCount | interpolationMaxIterationCount
interpolationAccuracy | interpolationAccuracy
mouseMoveTimeTreshold | mouseMoveTimeTreshold
xAxisDateFrom | xAxisDateFrom
xAxisDateTo | xAxisDateTo

Mouse events:

Binding name |
--- |
onMouseEnter |
onMouseLeave |
onMouseMove |
onMouseClick |

### Stack Bar config

Binding name | Config Name
--- | ---
width | width
height | height
margin | margin
backgroundColor | backgroundColor
maxTimeRangeDifferenceToDraw | maxTimeRangeDifferenceToDraw
xAxisTimeFormat | xAxisTimeFormat
mouseMoveTimeTreshold | mouseMoveTimeTreshold
xAxisDateFrom | xAxisDateFrom
xAxisDateTo | xAxisDateTo

Mouse events:

Binding name |
--- |
onMouseEnter |
onMouseLeave |
onMouseMove |
onMouseClick |

### Marker plugin config

Binding name | Config Name
--- | ---
cx | cx
cy | cy
radius | radius
fill | fill
stroke | stroke
strokeWidth | strokeWidth
**markerSort** | sort

### Tooltip plugin config

Binding name | Config Name
--- | ---
tooltipWidth | tooltipWidth
horizontalMouseMargin | horizontalMouseMargin
verticalBorderMargin | verticalBorderMargin
headerFormatter | headerFormatter
topicFormatter | topicFormatter
valueFormatter | valueFormatter
**tooltipSort** | sort

## Development

[Library creation docs](https://github.com/angular/angular-cli/wiki/stories-create-library)

Library location in project - projects/ng-interpolated-charts.

Build library (with ng-packagr to Angular Package Format): ```ng build ng-interpolated-charts```

Publish to npm: ```npm publish projects/ng-interpolated-charts```
