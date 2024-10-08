import {logisticsDataset} from "./src/app/utils/data";

(function (){
  // Step 1: Aggregate emissions by market and year
  const aggregatedData = logisticsDataset.reduce((acc, item) => {
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
  const yearlyTotalEmissions = {};
  Object.values(aggregatedData).forEach(item => {
    if (!yearlyTotalEmissions[item.year]) {
      yearlyTotalEmissions[item.year] = 0;
    }
    yearlyTotalEmissions[item.year] += item.totalEmission;
  });


  const percentageData = Object.values(aggregatedData).map(item => ({
    market: item.market,
    year: item.year,
    emissionPercentage: (item.totalEmission / yearlyTotalEmissions[item.year]) * 100
  }));

// Step 3: Calculate total emissions across all markets by year
  const totalEmissionsByYear = Object.keys(yearlyTotalEmissions).map(year => ({
    year: parseInt(year, 10),
    totalEmission: yearlyTotalEmissions[year]
  }));

// percentageData now contains emission percentages per market per year
// totalEmissionsByYear contains total emissions per year across all markets
  console.log(aggregatedData)
  console.log(yearlyTotalEmissions)
  console.log(percentageData);
  console.log(totalEmissionsByYear);
})()
