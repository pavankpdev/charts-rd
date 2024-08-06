export type Dataset = {
  "name": string,
  "emission": number,
  "reportedDate": string,
  "category": string,
  "market": string
}

export type AggregatedDataset = {
  "market": string,
  year: number,
  totalEmission: number
}

export type MarketBasedEmissionByYear = Pick<AggregatedDataset, "market" | "year"> & {
  emissionPercentage: number
}

export type PaginatedType<T> = {
  page: number,
  limit: number,
  totalItems: number,
  totalPages: number,
  results: T[]
}

export type ProcessedDataset = {
  Name: string;
  Emission: number;
  "Reported Date": number;
  Category: string;
  Market: string;
};
