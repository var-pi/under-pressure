// chartConfig.ts
import { ChartConfiguration, ChartDataset } from "chart.js";
import { dateFormatOptions  } from "@/utils/dateFormatOptions";
import "@/styles/colors/colors.css";

// Define the initial static data
const initialData: ChartConfiguration["data"] = {
  labels: [""],
  datasets: [
    {
      label: "",
      backgroundColor: getComputedStyle(
        document.documentElement
      ).getPropertyValue("--col-bg-default"),
      borderColor: getComputedStyle(document.documentElement).getPropertyValue(
        "--col-fg-accent"
      ),
      data: [],
      fill: false,
      tension: 0.4,
      spanGaps: true,
    },
  ],
};

// Function to get the initial chart configuration
export const getChartConfig = (): ChartConfiguration => {
  return {
    type: "line",
    data: { ...initialData }, // Use a copy to avoid modifying the original
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false, // If true - TypeError: Cannot read properties of null (reading 'getContext')
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 10,
          },
        },
      },
    },
  };
};

// Function to update chart data
export const updateChartData = (
  config: ChartConfiguration,
  newData: number
): void => {
  if (!config.data) {
    config.data = { ...initialData }; // Initialize data if not already present
  }

  if (!config.data.labels) {
    config.data.labels = []; // Initialize labels if not already present
  }

  const currentDate: string = new Date().toLocaleDateString("et-EE", dateFormatOptions);
  const dataset: ChartDataset = config.data.datasets[0];
  const lastEntryDate: string = config.data.labels.slice(-1)[0] as string;

  if (lastEntryDate == currentDate) {
    // Update the last data value to newData
    dataset.data[dataset.data.length - 1] = newData;
  } else {
    // Add newData to data values and current date to labels
    config.data.labels.push(currentDate);
    dataset.data = [...dataset.data, newData];
  }
  console.log("Updated data to", dataset.data);
};

export const initializeChart = (
  config: ChartConfiguration,
  subjectData: { subject: string; data: Entry[] }
): void => {
  // Check if data is already initialized in the config
  if (!config.data) {
    config.data = { ...initialData };
  }
  // Initialize labels if not already present
  if (!config.data.labels) {
    config.data.labels = [];
  }
  const dataset: ChartDataset = config.data.datasets[0];
  const labels = config.data.labels;

  dataset.label = subjectData.subject;
  labels.length = 0;
  dataset.data.length = 0;

  let previousDate = null;

  for (const entry of subjectData.data) {
    const currentDate: Date = new Date(entry.creationDate);
    const currentDateString: string = currentDate.toLocaleDateString("et-EE", dateFormatOptions);

    if (previousDate !== null) {
      const previousDay: Date = new Date(previousDate);
      previousDay.setDate(previousDay.getDate() + 1);
      while (previousDay < currentDate) {
        dataset.data.push(null);
        labels.push(previousDay.toLocaleDateString("et-EE", dateFormatOptions));
        previousDay.setDate(previousDay.getDate() + 1);
      }
    }
    dataset.data.push(entry.stressLevel);
    labels.push(currentDateString);
    previousDate = entry.creationDate;
  }

  console.log(
    "Initialized chart with data:",
    dataset.data,
    "and labels:",
    labels
  );
};