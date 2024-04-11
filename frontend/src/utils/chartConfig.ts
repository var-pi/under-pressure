// chartConfig.ts
import { ChartConfiguration, ChartDataset } from "chart.js";
import { dateFormatOptions, dateStringFormat } from "@/utils/dateFormatOptions";
import "@/styles/colors.css";

// Define the initial static data
const initialData: ChartConfiguration["data"] = {
  labels: [""],
  datasets: [
    {
      label: "",
      backgroundColor: getComputedStyle(
        document.documentElement,
      ).getPropertyValue("--col-bg-default"),
      borderColor: getComputedStyle(document.documentElement).getPropertyValue(
        "--col-fg-accent",
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
  newData: number,
): void => {
  if (!config.data) {
    config.data = { ...initialData }; // Initialize data if not already present
  }

  if (!config.data.labels) {
    config.data.labels = []; // Initialize labels if not already present
  }

  const dataset: ChartDataset = config.data.datasets[0];
  const labels: string[] = config.data.labels as string[];
  const currentDate: Date = new Date();
  const previousDate: Date = parseDate(
    config.data.labels.slice(-1)[0] as string,
    dateStringFormat as string,
  );
  
  if (previousDate.getDate() == currentDate.getDate()) {
    // Update the last data value to newData        
    dataset.data[dataset.data.length - 1] = newData;
  } else {
    previousDate.setDate(previousDate.getDate() + 1);
    evaluateDatesBetween(previousDate, currentDate, dataset, labels);
    dataset.data.push(newData);
    labels.push(currentDate.toLocaleDateString("et-EE", dateFormatOptions));
  }
};

export const initializeChart = (
  config: ChartConfiguration,
  subjectData: { subject: string; data: Entry[] },
): void => {
  const dataset: ChartDataset = config.data.datasets[0];
  const labels: string[] = config.data.labels as string[];

  dataset.label = subjectData.subject;
  labels.length = 0;
  dataset.data.length = 0;

  let previousDate = null;

  for (const entry of subjectData.data) {
    const currentDate: Date = new Date(entry.creationDate);
    const currentDateString: string = currentDate.toLocaleDateString(
      "et-EE",
      dateFormatOptions,
    );

    if (previousDate !== null) {
      const previousDay: Date = new Date(previousDate);
      previousDay.setDate(previousDay.getDate() + 1);
      evaluateDatesBetween(previousDay, currentDate, dataset, labels);
    }
    dataset.data.push(entry.stressLevel);
    labels.push(currentDateString);
    previousDate = entry.creationDate;
  }
};

function evaluateDatesBetween(
  previousDate: Date,
  currentDate: Date,
  dataset: ChartDataset,
  labels: string[],
) {
  while (previousDate < currentDate) {
    dataset.data.push(null);
    labels.push(previousDate.toLocaleDateString("et-EE", dateFormatOptions));
    previousDate.setDate(previousDate.getDate() + 1);
  }
}

function parseDate(dateString: string, format: string): Date {
  if (
    typeof format !== "string" ||
    !format.includes("DD") ||
    !format.includes("MM") ||
    !format.includes("YYYY")
  ) {
    throw new Error("Invalid date format");
  }

  const dayIndex = format.indexOf("DD");
  const monthIndex = format.indexOf("MM");
  const yearIndex = format.indexOf("YYYY");

  const day = parseInt(dateString.substring(dayIndex, dayIndex + 2), 10);
  const month =
    parseInt(dateString.substring(monthIndex, monthIndex + 2), 10) - 1;
  const year = parseInt(dateString.substring(yearIndex, yearIndex + 4), 10);

  return new Date(year, month, day);
}
