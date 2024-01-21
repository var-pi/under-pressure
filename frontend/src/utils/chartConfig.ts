// chartConfig.ts
import { ChartConfiguration, ChartDataset } from 'chart.js';

// Define the initial static data
const initialData: ChartConfiguration['data'] = {
  labels: [],
  datasets: [
    {
      label: 'Stressitase',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(75, 192, 192)',
      data: [],
      fill: false,
      tension: 0.2,
    },
  ],
};

// Function to get the initial chart configuration
export const getChartConfig = (): ChartConfiguration => {
  return {
    type: 'line',
    data: { ...initialData }, // Use a copy to avoid modifying the original
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        
      }
    },
  };
};

// Function to update chart data
export const updateChartData = (config: ChartConfiguration, newData: number[]): void => {
  if (!config.data) {
    config.data = { ...initialData }; // Initialize data if not already present
  }

  if (!config.data.labels) {
    config.data.labels = []; // Initialize labels if not already present
  }

  // If date is same as last date then change last data value
  config.data.labels.push((new Date).toLocaleDateString());

  // Assuming a single dataset in this example
  const dataset: ChartDataset = config.data.datasets[0];

  // Update dataset's data with new values
  dataset.data = [...dataset.data, ...newData];
  console.log('Updated data to', dataset.data);
};