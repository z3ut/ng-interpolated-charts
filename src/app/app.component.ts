import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
  stackBarData = [
    {
      name: 'surface',
      backgroundColor: 'white',
      data: [
        { date: new Date('2015-01-01T00:00:00'), color: 'orange', value: 'dry' },
        { date: new Date('2015-01-02T00:00:00'), color: 'orange', value: 'dry' },
        { date: new Date('2015-01-03T00:00:00'), color: 'orange', value: 'dry' },
        { date: new Date('2015-01-04T00:00:00'), color: 'green', value: 'wet' },
        { date: new Date('2015-01-05T00:00:00'), color: 'green', value: 'wet' },

        { date: new Date('2015-01-09T00:00:00'), color: 'green', value: 'wet' },
        { date: new Date('2015-01-10T00:00:00'), color: 'green', value: 'wet' },
        { date: new Date('2015-01-11T00:00:00'), value: 'ice' },
        { date: new Date('2015-01-12T00:00:00'), value: 'ice' },
        { date: new Date('2015-01-13T00:00:00'), value: 'ice' }
      ]
    },
    {
      name: 'precipitation',
      backgroundColor: 'white',
      data: [
        { date: new Date('2015-01-01T00:00:00'), color: 'yellow', value: 'sun' },
        { date: new Date('2015-01-02T00:00:00'), color: 'yellow', value: 'sun' },
        { date: new Date('2015-01-03T00:00:00'), color: 'yellow', value: 'sun' },
        { date: new Date('2015-01-04T00:00:00'), color: 'yellow', value: 'sun' },
        { date: new Date('2015-01-05T00:00:00'), color: 'blue', value: 'rain' },
        { date: new Date('2015-01-06T00:00:00'), color: 'blue', value: 'rain' },
        { date: new Date('2015-01-07T00:00:00'), color: 'blue', value: 'rain' },

        { date: new Date('2015-01-11T00:00:00'), value: 'cloud' },
        { date: new Date('2015-01-12T00:00:00'), value: 'cloud' },
        { date: new Date('2015-01-13T00:00:00'), value: 'cloud' }
      ]
    }
  ];
  stackBarHeight = 200;
  yAxisValueFormat = value => `${value}°C`;
  valueFormatter = ({interpolatedValue}) => `${interpolatedValue.toFixed(1)}°C`;

  barValueFormatter = ({value}) => `${value}мм`;
}
