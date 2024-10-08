import { Component } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import {NgFor, NgIf} from '@angular/common';  // Import NgFor
import "ag-charts-enterprise";
import {logisticsDataset} from "../utils/data";
import {overViewChartDataset, getChartDataByFilters} from "../utils/chartsData";
import {Dataset, ProcessedDataset} from "../utils/type";
import { AgGridAngular } from 'ag-grid-angular';
import {
  ChartRef,
  ColDef, FilterModel,
  GetContextMenuItemsParams, GridApi,
  GridOptions, GridReadyEvent, IGetRowsParams, IServerSideDatasource, IServerSideGetRowsParams,
  MenuItemDef,
  RowModelType, SetFilterValuesFuncParams,
  SideBarDef
} from 'ag-grid-community';
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { GridChartsModule } from "@ag-grid-enterprise/charts-enterprise";
import  "ag-grid-charts-enterprise";

/* Core Data Grid CSS */
import 'ag-grid-community/styles/ag-grid.css';
/* Quartz Theme Specific CSS */
import 'ag-grid-community/styles/ag-theme-quartz.css';
import {makeRequest} from "../utils/request";
import {NgxSpinnerComponent, NgxSpinnerService} from "ngx-spinner";

ModuleRegistry.registerModules([ClientSideRowModelModule, GridChartsModule]);

@Component({
  selector: 'app-agchart-revised',
  standalone: true,
  imports: [AgCharts, NgFor, NgIf, AgGridAngular, NgxSpinnerComponent],
  templateUrl: './agchart-revised.component.html',
  styleUrl: './agchart-revised.component.scss'
})
export class AgchartRevisedComponent {

  public stateStack: { chartOptions: any; gridOptions: any }[] = [];
  public options: AgChartOptions | null = null;
  public reportChart: AgChartOptions | null = null;
  public report: Dataset[] = [];
  public enableCharts = true
  public enableRangeSelection = true
  public sideBar: SideBarDef | string | string[] | boolean | null = "filters";
  public rowSelection: "multiple" | "single" | undefined = "multiple";
  public popupParent: HTMLElement | null = document.body;
  public gridApi: GridApi | null  = null;
  public chartChanged = false;

  public gridOptions: GridOptions<any> | null = null

  rowData: any[] = [];

  // Column Definitions: Defines the columns to be displayed.

  colDefs: ColDef[] = [
    { field: "Name" },
    { field: "Emission" },
    {
      field: "Reported Date",
    },
    { field: "Category",
      filter: "agSetColumnFilter",
      filterParams: {
        values: (params: SetFilterValuesFuncParams) => {
          makeRequest({
            method: "GET",
            url: "/categories"
          })
            .then(({data}) => params.success(data?.results || []))
        }
      }
    },
    {
      field: "Market",
      filter: "agSetColumnFilter",
      filterParams: {
        filterType: 'set',
        values: ['EU', "USA", "China"]
      }
    }
  ];

  constructor(private spinner: NgxSpinnerService) {
    this.spinner.show()
    overViewChartDataset()
      .then(({data: overViewChartDate}) => {
        if(!this.options)
          this.options = this.createInitialOverviewChart(overViewChartDate);
      })
      .finally(() => {
        this.spinner.hide()
      })
  }

  createServerSideDatasource(filters?: Record<string, any>) {
    return {
      getRows: (params: IServerSideGetRowsParams
      ) => {
        const startRow = params?.request?.startRow || 0;
        const endRow = params?.request?.endRow || 100;
        const pageSize = endRow - startRow;
        const currentPage = Math.floor(startRow / pageSize) + 1;

        const filterModel: any = params?.request?.filterModel || {};
        console.log(filterModel)

        const options: Record<string, any> = {
          ...filters,
          page: currentPage,
          limit: 100
        }

        if(filterModel?.Market) {
          options["market"] = filterModel?.Market?.values
        }

        if(filterModel?.Category) {
          options["category"] = filterModel?.Category?.values
        }

        getChartDataByFilters(options).then((rows) => {
          params.success({
            rowData: rows
          })
        })
      }
    };
  }

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

  initializeGridOptions(datasource: IServerSideDatasource, modifyColumnFilters?: {field: string, filter: Record<string, any>}[]) {
    this.gridOptions = {
      rowModelType: "serverSide",
      cacheBlockSize: 100,
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
                  "Reported Date": Number(logi.reportedDate.slice(0,4)),
                  Category: logi.category,
                  Market: logi.market
                }))
            },
          },
          'separator',
        ];

        return isCategoryColumnSelected ? [...customItems, ...defaultItems] : defaultItems
      },
      serverSideDatasource: datasource,
      columnDefs: this.colDefs,
      onGridReady: (event: GridReadyEvent<any>) => {
        this.gridApi = event.api;
        if (modifyColumnFilters) {
          const promise = Promise.all(modifyColumnFilters.map((def) => {
            return this.gridApi?.setColumnFilterModel(def.field, def.filter)
          }))

          promise.then(() => this.gridApi?.onFilterChanged())
        }
      }
    }
  }

  createInitialOverviewChart(overViewChartDate: any):AgChartOptions {
    return {
      height: 600,
      data: overViewChartDate.marketBasedEmissionByYear.sort((a: any, b: any) => a.year - b.year),
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
            nodeClick: async (event: any) => {
              try {
                this.spinner.show()
                this.stateStack.push({
                  chartOptions: this.options,
                  gridOptions: {}
                } as any);

                const datasource = this.createServerSideDatasource({
                  market: event.yKey,
                  year: event?.datum.year
                });

                const filterModification = [
                  {
                    field: "Market",
                    filter: {
                      filterType: 'set',
                      values: [event.yKey]
                    }
                  }
                ]

                if (!this.gridApi) {
                  this.initializeGridOptions(datasource, filterModification);
                } else {
                  this.gridApi?.setGridOption("serverSideDatasource",datasource);
                  this.gridApi.setColumnFilterModel("Market", {
                    filterType: 'set',
                    values: [event.yKey]
                  })
                  this.gridApi.onFilterChanged()
                }

                // Fetch new data for the updated chart

                const filter = {
                  market: event.yKey,
                  year: event?.datum.year
                }

                const newData = await getChartDataByFilters(filter);

                this.options = {
                  data: newData,
                  title: {
                    text: `Data of ${filter.market} Market for the year ${filter.year}`,
                  },
                  series: [
                    {
                      type: 'bar',
                      xKey: 'Category',
                      yKey: 'Emission',
                      yName: 'Emission from respective category',
                      nodeClickRange: 'nearest',
                      listeners: {
                        nodeClick: async (event: any) => {
                          try {
                            this.spinner.show()
                            this.stateStack.push({
                              chartOptions: this.options,
                              gridOptions: filter
                            } as any);
                            const datasource = this.createServerSideDatasource({
                              category: event.datum.Category,
                            });

                            alert(event.datum.Category)

                            const filterModification = [
                              {
                                field: "Market",
                                filter: {
                                  filterType: 'set',
                                  values: ['EU', 'USA', 'China']
                                }
                              },
                              {
                                field: "Category",
                                filter: {
                                  filterType: 'set',
                                  values: [event.datum.Category]
                                }
                              }
                            ]

                            if (!this.gridApi) {

                              this.initializeGridOptions(datasource, filterModification);
                            } else {
                              this.gridApi?.setGridOption("serverSideDatasource",datasource);
                              const promise = Promise.all(filterModification.map((def) => {
                                return this.gridApi?.setColumnFilterModel(def.field, def.filter)
                              }))

                              promise.then(() => this.gridApi?.onFilterChanged())
                            }

                            const newData = await getChartDataByFilters({
                              category: event.datum.Category,
                            });

                            this.options = {
                              data: newData,
                              title: {
                                text: `Emission data of the ${event.datum.Category} category`
                              },
                              series: [
                                {
                                  type: "bar",
                                  xKey: 'Name',
                                  yKey: 'Emission',
                                  yName: "Name"
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
                                  min: 0,
                                  max: 5,
                                }
                              ]
                            }
                          } catch (err) {
                            alert("Some error occured!")
                          } finally {
                            this.spinner.hide()
                          }
                        }
                      }
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
                      min: 0,
                      max: 5,
                    }
                  ]
                };
              } catch (err) {
                console.log(err)
                alert("Some error occured!")
              } finally {
                this.spinner.hide()
              }
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
            nodeClick: async (event: any) => {
              try {
                this.spinner.show()
                this.stateStack.push({
                  chartOptions: this.options,
                  gridOptions: {}
                } as any);

                const datasource = this.createServerSideDatasource({
                  market: event.yKey,
                  year: event?.datum.year
                });

                const filterModification = [
                  {
                    field: "Market",
                    filter: {
                      filterType: 'set',
                      values: [event.yKey]
                    }
                  }
                ]

                if (!this.gridApi) {
                  this.initializeGridOptions(datasource, filterModification);
                } else {
                  this.gridApi?.setGridOption("serverSideDatasource",datasource);
                  this.gridApi.setColumnFilterModel("Market", {
                    filterType: 'set',
                    values: [event.yKey]
                  })
                  this.gridApi.onFilterChanged()
                }

                // Fetch new data for the updated chart

                const filter = {
                  market: event.yKey,
                  year: event?.datum.year
                }

                const newData = await getChartDataByFilters(filter);

                this.options = {
                  data: newData,
                  title: {
                    text: `Data of ${filter.market} Market for the year ${filter.year}`,
                  },
                  series: [
                    {
                      type: 'bar',
                      xKey: 'Category',
                      yKey: 'Emission',
                      yName: 'Emission from respective category',
                      nodeClickRange: 'nearest',
                      listeners: {
                        nodeClick: async (event: any) => {
                          try {
                            this.spinner.show()
                            this.stateStack.push({
                              chartOptions: this.options,
                              gridOptions: filter
                            } as any);
                            const datasource = this.createServerSideDatasource({
                              category: event.datum.Category,
                            });

                            alert(event.datum.Category)

                            const filterModification = [
                              {
                                field: "Market",
                                filter: {
                                  filterType: 'set',
                                  values: ['EU', 'USA', 'China']
                                }
                              },
                              {
                                field: "Category",
                                filter: {
                                  filterType: 'set',
                                  values: [event.datum.Category]
                                }
                              }
                            ]

                            if (!this.gridApi) {

                              this.initializeGridOptions(datasource, filterModification);
                            } else {
                              this.gridApi?.setGridOption("serverSideDatasource",datasource);
                              const promise = Promise.all(filterModification.map((def) => {
                                return this.gridApi?.setColumnFilterModel(def.field, def.filter)
                              }))

                              promise.then(() => this.gridApi?.onFilterChanged())
                            }

                            const newData = await getChartDataByFilters({
                              category: event.datum.Category,
                            });

                            this.options = {
                              data: newData,
                              title: {
                                text: `Emission data of the ${event.datum.Category} category`
                              },
                              series: [
                                {
                                  type: "bar",
                                  xKey: 'Name',
                                  yKey: 'Emission',
                                  yName: "Name"
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
                                  min: 0,
                                  max: 5,
                                }
                              ]
                            }
                          } catch (err) {
                            alert("Some error occured!")
                          } finally {
                            this.spinner.hide()
                          }
                        }
                      }
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
                      min: 0,
                      max: 5,
                    }
                  ]
                };
              } catch (err) {
                console.log(err)
                alert("Some error occured!")
              } finally {
                this.spinner.hide()
              }
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
            nodeClick: async (event: any) => {
              try {
                this.spinner.show()
                this.stateStack.push({
                  chartOptions: this.options,
                  gridOptions: {}
                } as any);

                const datasource = this.createServerSideDatasource({
                  market: event.yKey,
                  year: event?.datum.year
                });

                const filterModification = [
                  {
                    field: "Market",
                    filter: {
                      filterType: 'set',
                      values: [event.yKey]
                    }
                  }
                ]

                if (!this.gridApi) {
                  this.initializeGridOptions(datasource, filterModification);
                } else {
                  this.gridApi?.setGridOption("serverSideDatasource",datasource);
                  this.gridApi.setColumnFilterModel("Market", {
                    filterType: 'set',
                    values: [event.yKey]
                  })
                  this.gridApi.onFilterChanged()
                }

                // Fetch new data for the updated chart

                const filter = {
                  market: event.yKey,
                  year: event?.datum.year
                }

                const newData = await getChartDataByFilters(filter);

                this.options = {
                  data: newData,
                  title: {
                    text: `Data of ${filter.market} Market for the year ${filter.year}`,
                  },
                  series: [
                    {
                      type: 'bar',
                      xKey: 'Category',
                      yKey: 'Emission',
                      yName: 'Emission from respective category',
                      nodeClickRange: 'nearest',
                      listeners: {
                        nodeClick: async (event: any) => {
                          try {
                            this.spinner.show()
                            this.stateStack.push({
                              chartOptions: this.options,
                              gridOptions: filter
                            } as any);
                            const datasource = this.createServerSideDatasource({
                              category: event.datum.Category,
                            });

                            alert(event.datum.Category)

                            const filterModification = [
                              {
                                field: "Market",
                                filter: {
                                  filterType: 'set',
                                  values: ['EU', 'USA', 'China']
                                }
                              },
                              {
                                field: "Category",
                                filter: {
                                  filterType: 'set',
                                  values: [event.datum.Category]
                                }
                              }
                            ]

                            if (!this.gridApi) {

                              this.initializeGridOptions(datasource, filterModification);
                            } else {
                              this.gridApi?.setGridOption("serverSideDatasource",datasource);
                              const promise = Promise.all(filterModification.map((def) => {
                                return this.gridApi?.setColumnFilterModel(def.field, def.filter)
                              }))

                              promise.then(() => this.gridApi?.onFilterChanged())
                            }

                            const newData = await getChartDataByFilters({
                              category: event.datum.Category,
                            });

                            this.options = {
                              data: newData,
                              title: {
                                text: `Emission data of the ${event.datum.Category} category`
                              },
                              series: [
                                {
                                  type: "bar",
                                  xKey: 'Name',
                                  yKey: 'Emission',
                                  yName: "Name"
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
                                  min: 0,
                                  max: 5,
                                }
                              ]
                            }
                          } catch (err) {
                            alert("Some error occured!")
                          } finally {
                            this.spinner.hide()
                          }
                        }
                      }
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
                      min: 0,
                      max: 5,
                    }
                  ]
                };
              } catch (err) {
                console.log(err)
                alert("Some error occured!")
              } finally {
                this.spinner.hide()
              }
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

  resetChart() {
    this.spinner.show()
    if (this.stateStack.length > 0) {
      const previousState = this.stateStack.pop();
      this.options = previousState?.chartOptions || null;
      const datasource = this.createServerSideDatasource(previousState?.gridOptions)
      if (!this.gridApi) {
        this.initializeGridOptions(datasource);
      } else {
        this.gridApi?.setGridOption("serverSideDatasource",datasource);
      }
    }
    if(this.stateStack.length === 0) {
      this.gridOptions = null
      this.gridApi = null
    }
    this.spinner.hide()
  }


}
