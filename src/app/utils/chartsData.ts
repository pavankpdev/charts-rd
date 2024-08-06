import {makeRequest, makeRequestWithQS} from "./request";
import {Dataset, PaginatedType, ProcessedDataset} from "./type";

export async function overViewChartDataset(){
  return makeRequest({
    method: "GET",
    url: '/ov'
  })
}

export async function getChartDataByFilters<T extends Dataset>(filters: Record<string, any>): Promise<ProcessedDataset[]> {
  const {data} = await makeRequestWithQS<PaginatedType<T>>(
    filters,
    {
      url: `/custom`,
      method: "GET"
    }
  )

  return data?.results.map((logi: Dataset) => ({
    Name: logi.name,
    Emission: logi.emission,
    "Reported Date": Number(logi.reportedDate.slice(0,4)),
    Category: logi.category,
    Market: logi.market
  }))
}
