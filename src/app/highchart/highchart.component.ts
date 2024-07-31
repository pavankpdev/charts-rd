import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import {HighchartsChartModule} from "highcharts-angular";
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import XRange from 'highcharts/modules/xrange';
import HighchartsMore from 'highcharts/highcharts-more';


HighchartsMore(Highcharts);
XRange(Highcharts);
@Component({
  selector: 'app-highchart',
  standalone: true,
  templateUrl: './highchart.component.html',
  styleUrl: './highchart.component.scss',
  imports: [HighchartsChartModule],

})

export class HighchartComponent {

  getRandomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: any[] = [
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
        categories: [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
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
        data: [48, 43, 36, 29],
        stack: 'male',
        color: '#573744',
        dataLabels: {
          format: "{y}%",
        },

      }, {
        name: 'Category 2',
        type: 'column',
        data: [64, 62, 53, 53],
        stack: 'male',
        color: "#8F393C",
        dataLabels: {
          format: "{y}%"
        }
      }, {
        name: 'Category 3',
        type: 'line',
        data: [45, 40, 42, 26, 20, 18, 15, 10, 0],
        color: "#4299E1",
        stack: 'male',
      }, {
        name: 'Trend Line',
        type: 'line',
        data: [64, 62, 53, 53, 45, 40, 35, 30, 25, 0],
        color: "#0BC5EA",
      }]
    },
    {
      chart: {
        zooming: {
          type: 'xy'
        },
        type: 'column',
        height: 600 // Increase the height here
      },
      title: {
        text: 'DKI IS 2024',
        align: 'left'
      },
      subtitle: {
        text: 'Last edit 2 days ago',
        align: 'left'
      },
      xAxis: [{
        categories: ['Baseline', 'Reduction', 'Reduced', 'Compensation', 'Compensated'],
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value}',
          style: {
            color: "#4A5568"
          }
        },
        title: {
          text: 'Values',
          style: {
            color: "#4A5568"
          }
        }
      }],
      tooltip: {
        shared: true
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
            format: '{y}',
            color: 'white',
          }
        }
      },
      series: [
        {
          name: 'Supply Chain',
          type: 'column',
          data: [3.45, 2.00, 3.39, 3.33, 3.02],
          color: '#8B0000',
          stack: 'stack1'
        },
        {
          name: 'Inhouse',
          type: 'column',
          data: [4.39, 2.00, 3.33, 3.19, 2.39],
          color: '#A52A2A',
          stack: 'stack1'
        },
        {
          name: 'Logistics',
          type: 'column',
          data: [8.92, 3.19, 7.28, 6.45, 6.29],
          color: '#B22222',
          stack: 'stack1'
        },
        {
          name: 'Use Phase (Fuel & Energy Supply)',
          type: 'column',
          data: [12.24, 5.00, 10.24, 9.24, 9.02],
          color: '#CD5C5C',
          stack: 'stack1'
        },
        {
          name: 'Use Phase (Tailpipe)',
          type: 'column',
          data: [19.02, 0, 17.02, 0, 0],
          color: '#E9967A',
          stack: 'stack1'
        },
        {
          name: 'End of Life',
          type: 'column',
          data: [16.51, 10.00, 14.51, 15.02, 15.51],
          color: '#FA8072',
          stack: 'stack1'
        },
        {
          name: 'Other',
          type: 'column',
          data: [12.84, 0, 10.84, 0, 0],
          color: '#FF6347',
          stack: 'stack1'
        },
        // Transparent fillers without data labels
        {
          name: 'Fill',
          type: 'column',
          data: [0, 31.32, 0,31.32, 0],
          stack: 'stack1',
          color: 'rgba(0,0,0,0)', // Completely transparent
          enableMouseTracking: false,
          dataLabels: {
            enabled: false
          }
        }]
    },

  ];
}
