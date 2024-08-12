import {AfterViewInit, Component} from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { AgChartOptions as AgChartOptionsE } from "ag-charts-enterprise";
import "ag-charts-enterprise";
import {AgBarSeriesItemStylerParams} from "@ag-grid-enterprise/charts-enterprise";

@Component({
  selector: 'app-agchart',
  standalone: true,
  imports: [AgCharts],
  templateUrl: './agchart.component.html',
  styleUrl: './agchart.component.scss'
})
export class AgchartComponent implements AfterViewInit {
  public options: AgChartOptions;
  public optionsd: any;
  public options2: AgChartOptions;
  public options3: AgChartOptionsE;
  public colors: Record<string, string> = {
    'Baseline': '#8B0000',
    'Reduction': '#FF6347',
    'Reduced': '#4682B4',
    'Compensation': '#32CD32',
    'Compensated': '#FFD700',
  }

  constructor() {
    this.optionsd = {
      height: 600,
      data: [
        { category: 'Baseline', value: 65.51, label: '65,51' },
        { category: 'Reduction', value: 10.00, label: '10,00' },
        { category: 'Reduced', value: 55.51, label: '55,51' },
        { category: 'Compensation', value: 10.00, label: '10,00' },
        { category: 'Compensated', value: 45.51, label: '45,51' },
      ],
      title: {
        text: 'DKI IS',
        fontSize: 18,
      },
      subtitle: {
        text: 'DKI IS 2024 - Last edit 2 days ago',
        fontSize: 14,
      },
      // Series: Defines which chart type and data to use
      series: [
        {
          type: 'bar',
          xKey: 'category',
          yKey: 'value',
          yName: 'value',
          stacked: true,
          stroke: '#8B4513',
          fillOpacity: 0.9,
          fill: '#8B0000', // Dark red color
          highlightStyle: {
            item: {
              fill: '#A52A2A', // Slightly different color for hover effect
            },
          },
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
            text: '',
          },
          min: 0,
          max: 100,
        },
      ]
    };
    this.options = {
      height: 600,
      data: [
        { category: 'Baseline', value: 65.51, label: '65,51', fill: 0 },
        { category: 'Reduction', value: 10.00, label: '10,00', fill: 55.51 },
        { category: 'Reduced', value: 55.51, label: '55,51', fill: 0 },
        { category: 'Compensation', value: 10.00, label: '10,00', fill: 45.51 },
        { category: 'Compensated', value: 45.51, label: '45,51', fill: 0 },
      ],
      title: {
        text: 'DKI IS',
        fontSize: 18,
      },
      subtitle: {
        text: 'DKI IS 2024 - Last edit 2 days ago',
        fontSize: 14,
      },
      // Series: Defines which chart type and data to use
      series: [
        {
          type: 'bar',
          xKey: 'category',
          yKey: 'fill',
          yName: 'Fill',
          stacked: true,
          fill: 'rgba(0, 0, 0, 0)', // Completely transparent
          stroke: 'rgba(0, 0, 0, 0)', // Completely transparent
          label: {
            enabled: false, // Disable labels for filler
          },
        },
        {
          type: 'bar',
          xKey: 'category',
          yKey: 'value',
          yName: 'value',
          stacked: true,
          stroke: '#8B4513',
          fillOpacity: 0.9,
          itemStyler: ({ datum }) => {
            return {
              fill: this.colors[datum.category],
            };
          },
          highlightStyle: {
            item: {
              fill: '#A52A2A', // Slightly different color for hover effect
            },
          },
          label: {
            enabled: true,
            color: 'white',
            fontSize: 14,
            formatter: (params) => `${params.value}`,
          },
        },
      ],
      axes: [
        {
          type: 'category',
          position: 'bottom',
          paddingInner: 0.05,
          groupPaddingInner: 1,
          paddingOuter: 0
        },
        {
          type: 'number',
          position: 'left',
          title: {
            text: '',
          },
          min: 0,
          max: 100,
        },
      ],
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
          itemStyler: (param: AgBarSeriesItemStylerParams<any>) => {
            if(param?.datum?.year === "2024")
              return {
                fill: 'rgb(63, 127, 255)',
                stroke: 'black',
                strokeWidth: 2,
                background: "green",
                lineDash: [2,3]
              }

            return {}
          },

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
      height: 600,
      data: [
        { year: 'Baseline', supplyChain: 3.45, inhouse: 4.39, logistics: 8.92, usePhase: 12.24, other: 16.51, fill: 0 },
        { year: 'Reduction', supplyChain: 2.00, inhouse: 2.00, logistics: 1.00, usePhase: 1.00, other: 4.00, fill: 19.02 },
        { year: 'Reduced', supplyChain: 3.33, inhouse: 3.39, logistics: 7.28, usePhase: 10.24, other: 14.51, fill: 0 },
        { year: 'Compensation', supplyChain: 3.33, inhouse: 3.19, logistics: 6.45, usePhase: 9.24, other: 15.02, fill: 17.02 },
        { year: 'Compensated', supplyChain: 3.02, inhouse: 2.39, logistics: 6.29, usePhase: 9.02, other: 15.51, fill: 0 }
      ],
      title: {
        text: 'DKI IS 2024',
      },
      subtitle: {
        text: 'Last edit 2 days ago',
      },
      series: [
        {
          type: 'bar',
          xKey: 'year',
          yKey: 'fill',
          yName: 'Fill',
          stacked: true,
          fill: 'rgba(0, 0, 0, 0)', // Completely transparent
          stroke: 'rgba(0, 0, 0, 0)', // Completely transparent
          label: {
            enabled: false, // Disable labels for filler
          },
        },
        {
          type: 'bar',
          xKey: 'year',
          yKey: 'other',
          yName: 'Other',
          stacked: true,
          fill: '#FFA07A',
          stroke: '#FFA07A',
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
          yKey: 'usePhase',
          yName: 'Use Phase',
          stacked: true,
          fill: '#FF6347',
          stroke: '#FF6347',
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
          yKey: 'logistics',
          yName: 'Logistics',
          stacked: true,
          fill: '#CD5C5C',
          stroke: '#CD5C5C',
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
          yKey: 'inhouse',
          yName: 'Inhouse',
          stacked: true,
          fill: '#8B0000',
          stroke: '#8B0000',
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
          yKey: 'supplyChain',
          yName: 'Supply Chain',
          stacked: true,
          fill: '#A52A2A',
          stroke: '#A52A2A',
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
          max: 80, // Adjusted to make space for total values
        },
      ],
    }
  }

  ngAfterViewInit() {
    const svg = document.querySelector('svg');
    if (svg) {
      const defs = svg.querySelector('defs') || svg.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'defs'));
      const pattern = defs.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'pattern'));
      pattern.setAttribute('id', 'diagonalHatch');
      pattern.setAttribute('patternUnits', 'userSpaceOnUse');
      pattern.setAttribute('width', '10');
      pattern.setAttribute('height', '10');

      const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path1.setAttribute('d', 'M0,0 l10,10');
      path1.setAttribute('stroke', '#A52A2A');
      path1.setAttribute('stroke-width', '2');
      pattern.appendChild(path1);

      const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path2.setAttribute('d', 'M10,0 l-10,10');
      path2.setAttribute('stroke', '#A52A2A');
      path2.setAttribute('stroke-width', '2');
      pattern.appendChild(path2);
    }
  }
}
