import {Component, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import {HighchartsChartModule} from "highcharts-angular";
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-chartjs',
  standalone: true,
  templateUrl: './chartjs.component.html',
  styleUrl: './chartjs.component.scss'
})

export class ChartjsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }
  public floatingBar: any;
  public stackedColumnChart: any;
  public multistackedChart: any;
  public stackedFloatingBarChart: any;

  createChart(){
    this.stackedColumnChart = new Chart("stackedColumnChart",{
      type: 'bar',
      data: {
        labels: ['2024', '2025', '2026', '2027', '2028'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [25],
            backgroundColor: '#DCB26F', // red
          },
          {
            label: 'Dataset 2',
            data: [71],
            backgroundColor: '#D37B32', // blue
          },
          {
            label: 'Dataset 3',
            data: [4, 69, 6, 0, 0],
            backgroundColor: '#833C24', // green,
          },
          {
            label: 'Dataset 4',
            data: [100, 80, 75, 55, 0],
            backgroundColor: 'blue',
            borderColor: "blue",
            type: "line",
            tension: 0.4
          },
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked'
          },
          datalabels: {
            color: 'white',
            display: function (context) {
              return context.dataset.type === 'bar'; // Show labels on bars only
            },
            anchor: 'center',
            align: 'center',
            formatter: function(value, context) {
              return value + '%'; // Show percentage symbol
            }
          }
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      },
      plugins: [ChartDataLabels]
    });
    this.floatingBar = new Chart("floatingBar", {
      type: 'bar',
      data: {
        labels: ['Baseline', 'Reduction', 'Reduced', 'Compensation', 'Compensated'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [
              [0, 70],
              [70, 60],
              [0, 50],
              [50, 40],
              [0, 40],
            ],
            backgroundColor: [
              '#833C24', // Dark Red for all bars
              '#A52A2A', // Light Red for small bars
              '#833C24', // Dark Red for all bars
              '#A52A2A', // Light Red for small bars
              '#833C24'  // Dark Red for all bars
            ]
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Floating Bar Chart'
          }
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          }
        }
      }
    })
    this.multistackedChart = new Chart("multistackedChart",{
      type: 'bar',
      data: {
        labels: [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
        datasets: [
          {
            label: 'Dataset 1',
            data: [48, 43, 36, 29],
            backgroundColor: '#573744', // red
          },
          {
            label: 'Dataset 2',
            data: [64, 62, 53, 53],
            backgroundColor: '#8F393C', // blue
          },
          {
            label: 'Dataset 3',
            data: [45, 40, 42, 26, 20, 18, 15, 10, 0],
            backgroundColor: '#4299E1',
            borderColor: "#4299E1",
            type: "line",
            tension: 0.4,
          },
          {
            label: 'Dataset 4',
            data: [64, 62, 53, 53, 45, 40, 35, 30, 25, 0],
            backgroundColor: '#0BC5EA',
            borderColor: "#0BC5EA",
            type: "line",
            tension: 0.4
          },
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked'
          },
          datalabels: {
            color: 'white',
            display: function (context) {
              return context.dataset.type === 'bar'; // Show labels on bars only
            },
            anchor: 'center',
            align: 'center',
            formatter: function(value, context) {
              return value + '%'; // Show percentage symbol
            }
          }
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      },
      plugins: [ChartDataLabels]
    });
    this.stackedFloatingBarChart = new Chart("stackedFloatingBarChart",{
      type: 'bar',
      data: {
        labels: ['Baseline', 'Reduction', 'Reduced', 'Compensation', 'Compensated'],
        datasets: [
          {
            label: 'Supply Chain',
            data: [
              [0, 3.45],
              [54,50],
              [0, 3.39],
              [54,50],
              [0, 3.02]
            ],
            backgroundColor: '#4F1508',
          },
          {
            label: 'Inhouse',
            data: [
              [3.45, 7.84],
              [57,54],
              [3.39, 7.28],
              [57,54],
              [3.02, 6.29]
            ],
            backgroundColor: '#8B0000',
          },
          {
            label: 'Logistics',
            data: [
              [7.84, 12.24],
              [60,57],
              [7.28, 10.24],
              [60,57],
              [6.29, 9.02]
            ],
            backgroundColor: '#fff',
            borderColor: '#B22222',
            borderWidth: 2
          },
          {
            label: 'Use Phase (Fuel & Energy Supply)',
            data: [
              [12.24, 19.02],
              [63,60],
              [10.24, 17.02],
              [63,60],
              [9.02, 15.51]
            ],
            backgroundColor: '#CD5C5C',
          },
          {
            label: 'Capital Goods',
            data: [
              [19.02, 25.51],
              [67,63],
              [17.02, 20.51],
              [67,63],
              [15.51, 18.51]
            ],
            backgroundColor: '#fff',
            borderColor: '#F08080',
            borderWidth: 2
          },
          {
            label: 'Other',
            data: [
              [25.51, 35.51],
              [69, 67],
              [20.51, 25.51],
              [69, 67],
              [18.51, 20.51]
            ],
            backgroundColor: '#FA8072',
          },
          {
            label: 'Final',
            data: [
              [35.51, 65.51],
              [70, 69],
              [25.51, 55.51],
              [70, 69],
              [20.51, 45.51]
            ],
            backgroundColor: '#FFA07A',
          },
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked'
          },
          datalabels: {
            color: 'white',
            display: function (context) {
              return context.dataset.type === 'bar'; // Show labels on bars only
            },
            anchor: 'center',
            align: 'center',
            formatter: function(value, context) {
              return value + '%'; // Show percentage symbol
            }
          }
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            beginAtZero: true,
            max: 70,
            ticks: {
              callback: function(value) {
                return value + '';
              }
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });

  }

}
