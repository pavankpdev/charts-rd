import fs from "fs/promises";
import { faker } from '@faker-js/faker';

(async function () {

  const categories = [
    {
      category: "Supply Chain",
      components: ["Material Extraction", "Manufacturing", "Transportation", "Assembly", "Packaging", "Distribution", "Other"]
    },
    {
      category: "Reduction",
      components: ["Energy Efficiency", "Process Optimization", "Waste Reduction", "Material Substitution", "Logistics Improvement"]
    },
    {
      category: "Reduced",
      components: ["Operational Improvements", "Material Recycling", "Transportation Efficiency", "Energy Use Reduction", "Production Adjustments", "Packaging Reductions", "Other"]
    },
    {
      category: "Compensation",
      components: ["Carbon Offsetting", "Reforestation", "Carbon Credits", "Renewable Energy Investment", "Community Projects"]
    },
    {
      category: "Compensated",
      components: ["Offset Programs", "Sustainable Practices", "Renewable Energy", "Green Manufacturing", "Circular Economy", "Community Engagement", "Other"]
    }
  ];

  const markets = ["EU", "USA", "China"];

  const data = [];

  for (const market of markets) {
    for (let i = 0; i < 10000; i++) {
      const category = faker.helpers.arrayElement(categories);
      const component = faker.helpers.arrayElement(category.components);
      const emission = faker.number.float({min: 1, max: 4})
      const reportedDate = faker.date.past({years: 2}).toISOString().split('T')[0]; // Random date in the past 2 years

      data.push({
        name: component,
        emission: emission,
        reportedDate: reportedDate,
        category: category.category,
        market: market
      });
    }
  }

  await fs.writeFile("data.json", JSON.stringify(data, null, 2));
  console.log("Data generated and saved to data.json", data.length);

})();
