// chartConfig.ts
import { ChartConfiguration, ChartDataset } from "chart.js";

// Define the initial static data
const initialData: ChartConfiguration['data'] = {
  labels: [],
  datasets: [
    {
      label: '',
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

  // Create current date with the same format as in the database
  // TODO: format date into 'et-EE'
  const currentDate: string = new Date().toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const dataset: ChartDataset = config.data.datasets[0];
  
  // If last 
  if (config.data.labels.slice(-1)[0] == currentDate) {
    // Update the last data value to newData
    console.log("siin");
    
    dataset.data[dataset.data.length - 1] = newData;
  } else {
    console.log("hoopis siin");
    // Add newData to data values and currentDate to labels
    config.data.labels.push(currentDate);
    dataset.data = [...dataset.data, newData];
  }  
  console.log('Updated data to', dataset.data);
};

export const initializeChart = (config: ChartConfiguration, subjectData: { subject: string, data: Entry[] }): void => {
    // Check if data is already initialized in the config
    if (!config.data) {
      config.data = { ...initialData };
    }
    if (!config.data.labels) {
      config.data.labels = []; // Initialize labels if not already present
    }
    const dataset: ChartDataset = config.data.datasets[0];
    const labels = config.data.labels

    dataset.label = subjectData.subject;
    labels.length = 0;
    dataset.data.length = 0;
  
    for (const entry of subjectData.data) {
      // typeof entry.createdAt is undefined
      console.log(typeof entry.creationDate);
      dataset.data.push(entry.stressLevel)
      labels.push(entry.creationDate)
    }

    console.log('Initialized chart with data:', dataset.data, 'and labels:', labels);
}