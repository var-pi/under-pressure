// chartConfig.ts
import { ChartConfiguration, ChartDataset } from 'chart.js';

// Define the initial static data
const initialData: ChartConfiguration['data'] = {
  labels: ["02.02.2024"],
  datasets: [
    {
      label: 'Stressitase',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(75, 192, 192)',
      data: [13],
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
      animation: false, // If true - TypeError: Cannot read properties of null (reading 'getContext')
    },
  };
};

// Function to update chart data
export const updateChartData = (config: ChartConfiguration, newData: number): void => {
  if (!config.data) {
    config.data = { ...initialData }; // Initialize data if not already present
  }

  if (!config.data.labels) {
    config.data.labels = []; // Initialize labels if not already present
  }

  const currentDate: string = (new Date).toLocaleDateString()
  const dataset: ChartDataset = config.data.datasets[0];
  
  if (config.data.labels.slice(-1)[0] == currentDate) {
    // Update the last data value to newData
    dataset.data[dataset.data.length - 1] = newData;
  } else {
    // Add newData to data values and currentDate to labels
    config.data.labels.push(currentDate);
    dataset.data = [...dataset.data, newData];
  }  
  console.log('Updated data to', dataset.data);
};

export const initializeChart = (config: ChartConfiguration, subjectData: { subject: string, entries: number[], dates: string[] }): void => {
    // Check if data is already initialized in the config
    if (!config.data) {
      config.data = { ...initialData };
    }
    if (!config.data.labels) {
      config.data.labels = []; // Initialize labels if not already present
    }

    config.data.labels.length = 0;

    for (const date in subjectData.dates) {
      config.data.labels.push(date);
    }

    const dataset: ChartDataset = config.data.datasets[0];

    dataset.data = subjectData.entries;

    dataset.label = subjectData.subject;

    console.log('Initialized chart with data:', dataset.data, 'and labels:', config.data.labels);
}