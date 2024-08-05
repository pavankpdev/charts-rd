import { Component } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import {NgFor, NgIf} from '@angular/common';  // Import NgFor
import "ag-charts-enterprise";
import {logisticsDataset} from "../utils/data";
import {overViewChartDataset} from "../utils/overview";
import {Dataset} from "../utils/type";
import { AgGridAngular } from 'ag-grid-angular';
import {ChartRef, ColDef, GetContextMenuItemsParams, MenuItemDef, SideBarDef} from 'ag-grid-community';
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { GridChartsModule } from "@ag-grid-enterprise/charts-enterprise";
import  "ag-grid-charts-enterprise";

/* Core Data Grid CSS */
import 'ag-grid-community/styles/ag-grid.css';
/* Quartz Theme Specific CSS */
import 'ag-grid-community/styles/ag-theme-quartz.css';

ModuleRegistry.registerModules([ClientSideRowModelModule, GridChartsModule]);

@Component({
  selector: 'app-agchart-revised',
  standalone: true,
  imports: [AgCharts, NgFor, NgIf, AgGridAngular],
  templateUrl: './agchart-revised.component.html',
  styleUrl: './agchart-revised.component.scss'
})
export class AgchartRevisedComponent {
  public options: AgChartOptions;
  public reportChart: AgChartOptions | null = null;
  public report: Dataset[] = [];
  public enableCharts = true
  public enableRangeSelection = true
  public sideBar: SideBarDef | string | string[] | boolean | null = "filters";
  public popupParent: HTMLElement | null = document.body;

  gridOptions = {
    getContextMenuItems: (params: GetContextMenuItemsParams) => {
      const defaultItems = params.defaultItems || [];
      const cellRanges = params.api.getCellRanges()

      let selectedCategories: string[] = [];

      const isCategoryColumnSelected = cellRanges?.some((range) =>
        range.columns.some((col) => col.getColId() === "Category")
      )

      if (isCategoryColumnSelected && cellRanges) {
        cellRanges.forEach(range => {
          if (range.columns.some((col) => col.getColId() === "Category")) {
            const startRowIndex = Math.min(range.startRow?.rowIndex || 0, range.endRow?.rowIndex || 0);
            const endRowIndex = Math.max(range.startRow?.rowIndex || 0, range.endRow?.rowIndex || 0);

            for (let rowIndex = startRowIndex; rowIndex <= endRowIndex; rowIndex++) {
              const rowNode = params.api.getRowNode(rowIndex.toString());
              if (rowNode) {
                const categoryValue = params.api.getCellValue({
                  rowNode,
                  colKey: 'Category',
                  useFormatter: true
                });
                if (categoryValue && !selectedCategories.includes(categoryValue)) {
                  selectedCategories.push(categoryValue);
                }
              }
            }
          }
        });
      }

      const customItems: (string | MenuItemDef)[] = [
        {
          name: 'Open selected category',
          action: () => {
            this.rowData = logisticsDataset
              .filter((logi) => selectedCategories.includes(logi.category))
              .map((logi) => ({
                Name: logi.name,
                Emission: logi.emission,
                "Reported Date": logi.reportedDate,
                Category: logi.category,
                Market: logi.market
              }))
          },
        },
        'separator',
      ];

      return isCategoryColumnSelected ? [...customItems, ...defaultItems] : defaultItems

    }
  }

  rowData: any[] = [];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: "Name" },
    { field: "Emission" },
    {
      field: "Reported Date",
      filter: 'agDateColumnFilter',
      filterParams: {
        comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
          if (!cellValue) return -1; // If the cell value is null or undefined

          // Assume cellValue is in the format "YYYY-MM-DD"
          const dateParts = cellValue.split("-");
          const cellDate = new Date(
            Number(dateParts[0]),  // Year
            Number(dateParts[1]) - 1,  // Month (0-based index)
            Number(dateParts[2])  // Day
          );

          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;  // Dates are equal
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;  // Cell date is before the filter date
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;  // Cell date is after the filter date
          }
          return 0;
        },
        minValidYear: 2000,
        maxValidYear: 2024,  // Updated to match your dataset range
        inRangeFloatingFilterDateFormat: "Do MMM YYYY",
      }
    },
    { field: "Category",
      filter: "agSetColumnFilter",
    },
    {
      field: "Market",
      filter: "agSetColumnFilter",
    }
  ];

  createChartContainer(chartRef: ChartRef): void {
    const eChart = chartRef.chartElement;
    const themeName =
      document.documentElement?.getAttribute("data-default-theme") ||
      "ag-theme-quartz";
    const eParent = document.querySelector(".chart__view") as HTMLElement;
    const chartWrapperHTML = `
    <div class="chart-wrapper ${themeName}">
      <div class="chart-wrapper-top">
        <button class="chart-wrapper-close">Close Chart</button>
      </div>
      <div class="chart-wrapper-body"></div>
    </div>
  `;
    eParent.insertAdjacentHTML("beforeend", chartWrapperHTML);
    const eChartWrapper = eParent.lastElementChild as HTMLElement;
    console.log(eChart, chartWrapperHTML, eChartWrapper)
    eChartWrapper.querySelector(".chart-wrapper-body")!.appendChild(eChart);
    eChartWrapper
      .querySelector(".chart-wrapper-close")!
      .addEventListener("click", () => {
        chartRef.destroyChart();
        eParent.removeChild(eChartWrapper);
      });
  }

  private overViewChartDate = overViewChartDataset()

  constructor() {
    this.options = {
      height: 600,
      data: this.overViewChartDate.marketBasedEmissionByYear.sort((a, b) => a.year - b.year),
      title: {
        text: 'Emission Report',
      },
      subtitle: {
        text: 'Last edit 2 days ago',
      },
      // Series: Defines which chart type and data to use
      series: [
        {
          type: 'bar',
          xKey: 'year',
          yKey: 'EU',
          yName: 'EU',
          stacked: true,
          fill: '#8B4513',
          stroke: '#8B4513',
          listeners: {
            nodeClick: (event: any) => {
              this.rowData = (logisticsDataset.filter((logi) => logi.market === event.yKey && new Date(logi.reportedDate).getFullYear() === event?.datum.year).map((logi) => ({
                Name: logi.name,
                Emission: logi.emission,
                "Reported Date": Number(logi.reportedDate.slice(0,4)),
                Category: logi.category,
                Market: logi.market
              })))
            }
          },
          label: {
            enabled: true,
            color: 'white',
            fontSize: 14,
            formatter: (params) => `${params.value.toFixed(2)}%`,
          },
        },
        {
          type: 'bar',
          xKey: 'year',
          yKey: 'USA',
          yName: 'USA',
          stacked: true,
          fill: '#DAA520',
          stroke: '#DAA520',
          listeners: {
            nodeClick: (event: any) => {
              this.rowData = (logisticsDataset.filter((logi) => logi.market === event.yKey && new Date(logi.reportedDate).getFullYear() === event?.datum.year).map((logi) => ({
                Name: logi.name,
                Emission: logi.emission,
                "Reported Date": logi.reportedDate,
                Category: logi.category,
                Market: logi.market
              })))
            }
          },
          label: {
            enabled: true,
            color: 'white',
            fontSize: 14,
            formatter: (params) => `${params.value.toFixed(2)}%`,
          },
        },
        {
          type: 'bar',
          xKey: 'year',
          yKey: 'China',
          yName: 'China',
          stacked: true,
          fill: '#FFD700',
          stroke: '#FFD700',
          listeners: {
            nodeClick: (event: any) => {
              this.rowData = (logisticsDataset.filter((logi) => logi.market === event.yKey && new Date(logi.reportedDate).getFullYear() === event?.datum.year).map((logi) => ({
                Name: logi.name,
                Emission: logi.emission,
                "Reported Date": logi.reportedDate,
                Category: logi.category,
                Market: logi.market
              })))
            }
          },
          label: {
            enabled: true,
            color: 'white',
            fontSize: 14,
            formatter: (params) => `${params.value.toFixed(2)}%`,
          },
        },
      ],
      axes: [
        {
          type: 'category',
          position: 'bottom',
          title: {
            text: 'Emissions',
          },
        },
        {
          type: 'number',
          position: 'left',
          title: {
            text: 'Percentage (%)',
          },
          min: 0,
          max: 150,
          label: {
            formatter: (params) => `${params.value}%`,
          },
        },
      ]
    };
  }
}
