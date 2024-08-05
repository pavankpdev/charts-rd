import {logisticsDataset} from "./data";
import {AggregatedDataset, MarketBasedEmissionByYear} from "./type";

export function overViewChartDataset(){
  // Step 1: Aggregate emissions by market and year
  const aggregatedData: Record<string, AggregatedDataset> = logisticsDataset.reduce((acc: Record<string, AggregatedDataset>, item) => {
    const year = new Date(item.reportedDate).getFullYear();
    const key = `${item.market}-${year}`;

    if (!acc[key]) {
      acc[key] = {
        market: item.market,
        year: year,
        totalEmission: 0
      };
    }
    acc[key].totalEmission += item.emission;

    return acc;
  }, {});

// Step 2: Calculate emission percentages by year
  const yearlyTotalEmissions: Record<string, number> = {};
  Object.values(aggregatedData).forEach(item => {
    if (!yearlyTotalEmissions[item.year]) {
      yearlyTotalEmissions[item.year] = 0;
    }
    yearlyTotalEmissions[item.year] += item.totalEmission;
  });

  const combinedData = Object.values(aggregatedData).reduce((acc: any[], item) => {
    const yearEntry = acc.find(entry => entry.year === item.year);

    if (yearEntry) {
      yearEntry[item.market] = (item.totalEmission / yearlyTotalEmissions[item.year]) * 100;
    } else {
      acc.push({
        year: item.year,
        [item.market]: (item.totalEmission / yearlyTotalEmissions[item.year]) * 100
      });
    }

    return acc;
  }, []);


  const percentageData: MarketBasedEmissionByYear[] = Object.values(aggregatedData).map(item => ({
    market: item.market,
    year: item.year,
    emissionPercentage: (item.totalEmission / yearlyTotalEmissions[item.year]) * 100
  }));

// Step 3: Calculate total emissions across all markets by year
  const totalEmissionsByYear: Pick<AggregatedDataset, "year" | "totalEmission">[] = Object.keys(yearlyTotalEmissions).map(year => ({
    year: parseInt(year, 10),
    totalEmission: yearlyTotalEmissions[year]
  }));

// percentageData now contains emission percentages per market per year
// totalEmissionsByYear contains total emissions per year across all markets

  return {
    totalEmissionsByYear,
    marketBasedEmissionByYear: combinedData
  }
}
