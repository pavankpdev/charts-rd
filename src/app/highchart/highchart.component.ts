import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import {HighchartsChartModule} from "highcharts-angular";
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';


@Component({
  selector: 'app-highchart',
  standalone: true,
  templateUrl: './highchart.component.html',
  styleUrl: './highchart.component.scss',
  imports: [HighchartsChartModule],
  providers: [{
    provide: HighchartsChartModule, useFactory: () => [ more, exporting ]
  }]

})
export class HighchartComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options[] = [
    {
      chart: {
        zooming: {
          type: 'xy'
        }
      },
      title: {
        text: 'Green Energy Management',
        align: 'left'
      },
      subtitle: {
        text: 'Last edit 2 days ago',
        align: 'left'
      },
      xAxis: [{
        categories: ['2024', '2025', '2026', '2027', '2028'],
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value} %',
          style: {
            color: "#4A5568"
          }
        },
        title: {
          text: 'Percentage',
          style: {
            color: "#4A5568"
          }
        }
      }],
      tooltip: {
        shared: true
      },
      // legend: {
      //   align: 'left',
      //   verticalAlign: 'top',
      //   backgroundColor: "whit",
      // },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        name: 'Category 1',
        type: 'column',
        data: [4, 69, 6, 0, 0],
        stack: 'male',
        color: '#DCB26F',
        dataLabels: {
          format: "{y}%",
        },

      }, {
        name: 'Category 2',
        type: 'column',
        data: [71],
        stack: 'male',
        color: "#D37B32",
        dataLabels: {
          format: "{y}%"
        }
      }, {
        name: 'Category 3',
        type: 'column',
        data: [25],
        color: "#833C24",
        stack: 'male',
        dataLabels: {
          format: "{y}%"
        }
      }, {
        name: 'Trend Line',
        type: 'line',
        data: [100, 80, 75, 55, 0],
        tooltip: {
          valueSuffix: '%'
        }
      }]
    },
    {
      chart: {
        type: 'waterfall'
      },

      title: {
        text: 'Highcharts Waterfall'
      },

      xAxis: {
        type: 'category'
      },

      yAxis: {
        title: {
          text: 'USD'
        }
      },

      legend: {
        enabled: false
      },

      tooltip: {
        pointFormat: '<b>${point.y:,.2f}</b> USD'
      },
      series: [
        {
          type: "waterfall",
          "data":[
            {
              "name":"Start",
              "y":120000
            },
            {
              "name":"Product Revenue",
              "y":569000
            },
            {
              "name":"Service Revenue",
              "y":231000
            },
            {
              "name":"Positive Balance",
              "isIntermediateSum":true,
              "color":"Highcharts.getOptions().colors"[
                1
                ]
            },
            {
              "name":"Fixed Costs",
              "y":-342000
            },
            {
              "name":"Variable Costs",
              "y":-233000
            },
            {
              "name":"Balance",
              "isSum":true,
              "color":"Highcharts.getOptions().colors"[
                1
                ]
            }
          ],
          "dataLabels":{
            "enabled":true,
            "format":"{divide y 1000}k"
          },
          "pointPadding":0
        }
      ]
    }
  ];
}
