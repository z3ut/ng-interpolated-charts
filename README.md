# Angular Interpolated Charts

Angular 4 component for [interpolated-charts](https://github.com/z3ut/interpolated-charts)

## Installation

1. Install package and peer dependencies with [npm](https://www.npmjs.com)

```
npm install ng-interpolated-charts interpolated-charts @types/d3 --save
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
<interpolated-chart
  [data]="chartData"
  [yAxisValueFormat]="yAxisValueFormat"
  [valueFormatter]="valueFormatter">
</interpolated-chart>
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
