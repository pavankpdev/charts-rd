import { Component } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { AgChartOptions as AgChartOptionsE } from "ag-charts-enterprise";

@Component({
  selector: 'app-agchart',
  standalone: true,
  imports: [AgCharts],
  templateUrl: './agchart.component.html',
  styleUrl: './agchart.component.scss'
})
export class AgchartComponent {
  public options: AgChartOptions;
  public options2: AgChartOptions;
  public options3: AgChartOptionsE;
  constructor() {
    this.options = {
      // Data: Data to be displayed in the chart
      data: [
        { year: '2024', part1: 25, part2: 71, part3: 4, total: 100 },
        { year: '2025', part1: 0, part2: 69, part3: 0, total: 69 },
        { year: '2026', part1: 0, part2: 0, part3: 6, total: 6 },
        { year: '2027', part1: 0, part2: 0, part3: 0, total: 0 },
        { year: '2028', part1: 0, part2: 0, part3: 0, total: 0 }
      ],
      title: {
        text: 'Green Energy Management',
      },
      subtitle: {
        text: 'Last edit 2 days ago',
      },
      // Series: Defines which chart type and data to use
      series: [
        {
          type: 'bar',
          xKey: 'year',
          yKey: 'part1',
          yName: 'Part 1',
          stacked: true,
          fill: '#8B4513',
          stroke: '#8B4513',
          label: {
            enabled: true,
            color: 'white',
            fontSize: 14,
            formatter: (params) => `${params.value}%`,
          },
        },
        {
          type: 'bar',
          xKey: 'year',
          yKey: 'part2',
          yName: 'Part 2',
          stacked: true,
          fill: '#DAA520',
          stroke: '#DAA520',
          label: {
            enabled: true,
            color: 'white',
            fontSize: 14,
            formatter: (params) => `${params.value}%`,
          },
        },
        {
          type: 'bar',
          xKey: 'year',
          yKey: 'part3',
          yName: 'Part 3',
          stacked: true,
          fill: '#FFD700',
          stroke: '#FFD700',
          label: {
            enabled: true,
            color: 'white',
            fontSize: 14,
            formatter: (params) => `${params.value}%`,
          },
        },
        {
          type: 'line',
          xKey: 'year',
          yKey: 'total',
          yName: 'Total',
          stroke: '#1E90FF',
          strokeWidth: 3,
          marker: {
            size: 10,
            fill: '#1E90FF',
            stroke: '#1E90FF',
          },
        }
      ],
      axes: [
        {
          type: 'category',
          position: 'bottom',
          title: {
            text: 'Year',
          },
        },
        {
          type: 'number',
          position: 'left',
          title: {
            text: 'Percentage (%)',
          },
          min: 0,
          max: 100,
          label: {
            formatter: (params) => `${params.value}%`,
          },
        },
      ]
    };
    this.options2 = {
      data: [
        { year: '2021', reduction: 48.31, compensation: 15.29, goalReduction: 50, goalCompensation: 65.31 },
        { year: '2022', reduction: 43.21, compensation: 21.29, goalReduction: 45, goalCompensation: 64.50 },
        { year: '2023', reduction: 36.29, compensation: 26.11, goalReduction: 40, goalCompensation: 62.40 },
        { year: '2024', reduction: 29.29, compensation: 24.11, goalReduction: 35, goalCompensation: 53.40 },
        { year: '2025', reduction: 0, compensation: 0, goalReduction: 30, goalCompensation: 45 },
        { year: '2026', reduction: 0, compensation: 0, goalReduction: 25, goalCompensation: 40 },
        { year: '2027', reduction: 0, compensation: 0, goalReduction: 20, goalCompensation: 30 },
        { year: '2028', reduction: 0, compensation: 0, goalReduction: 15, goalCompensation: 20 },
        { year: '2029', reduction: 0, compensation: 0, goalReduction: 10, goalCompensation: 15 },
        { year: '2030', reduction: 0, compensation: 0, goalReduction: 5, goalCompensation: 10 }
      ],
      title: {
        text: 'DKI IS 2024',
      },
      series: [
        {
          type: 'bar',
          xKey: 'year',
          yKey: 'reduction',
          yName: 'IS value incl. reduction',
          stacked: true,
          fill: '#800000',
          stroke: '#800000',
          label: {
            enabled: true,
            color: 'white',
            fontSize: 14,
            formatter: (params) => `${params.value.toFixed(2)}`,
          },
        },
        {
          type: 'bar',
          xKey: 'year',
          yKey: 'compensation',
          yName: 'IS value incl. compensation',
          stacked: true,
          fill: '#A52A2A',
          stroke: '#A52A2A',
          label: {
            enabled: true,
            color: 'white',
            fontSize: 14,
            formatter: (params) => `${params.value.toFixed(2)}`,
          },
        },
        {
          type: 'line',
          xKey: 'year',
          yKey: 'goalReduction',
          yName: 'Goal incl. reduction',
          stroke: '#00BFFF',
          strokeWidth: 3,
          marker: {
            size: 8,
            fill: '#00BFFF',
            stroke: '#00BFFF',
          },
        },
        {
          type: 'line',
          xKey: 'year',
          yKey: 'goalCompensation',
          yName: 'Goal incl. compensation',
          stroke: '#ADD8E6',
          strokeWidth: 3,
          marker: {
            size: 8,
            fill: '#ADD8E6',
            stroke: '#ADD8E6',
          },
        },
      ],
      axes: [
        {
          type: 'category',
          position: 'bottom',
          title: {
            text: 'Year',
          },
        },
        {
          type: 'number',
          position: 'left',
          title: {
            text: 'Values',
          },
          min: 0,
          max: 100,
          label: {
            formatter: (params) => `${params.value}`,
          },
        },
      ],
      legend: {
        position: 'bottom',
      },
    };
    this.options3 = {
      data: [
        {
          financials: "Income\nTax",
          amount: 185,
        },
        {
          financials: "VAT",
          amount: 145,
        },
        {
          financials: "NI",
          amount: 134,
        },
        {
          financials: "Corp\nTax",
          amount: 55,
        },
        {
          financials: "Council\nTax",
          amount: 34,
        },
        {
          financials: "Social\nProtection",
          amount: -252,
        },
        {
          financials: "Health",
          amount: -155,
        },
        {
          financials: "Education",
          amount: -112,
        },
        {
          financials: "Defence",
          amount: -65,
        },
        {
          financials: "Debt\nInterest",
          amount: -63,
        },
        {
          financials: "Housing",
          amount: -31,
        },
      ],
      title: {
        text: 'DKI IS 2024',
      },
      subtitle: {
        text: 'Last edit 2 days ago',
      },
      series: [
        {
          type: "waterfall",
          xKey: "financials",
          xName: "Financials",
          yKey: "amount",
          yName: "Amount",
        },
      ],
      axes: [
        {
          type: 'category',
          position: 'bottom',
        },
        {
          type: 'number',
          position: 'left',
          title: {
            text: 'Values',
          },
          min: 0,
          max: 70,
          label: {
            formatter: (params) => `${params.value}`,
          },
        },
      ],
      legend: {
        enabled: false,
      },
    };
  }
}
