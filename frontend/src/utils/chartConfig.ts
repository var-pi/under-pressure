import { ChartConfiguration, ChartDataset, ChartOptions } from "chart.js";
import { dateFormatOptions, dateStringFormat } from "@/utils/dateFormatOptions";
import "@/styles/colors.css";
import { ZoomPluginOptions } from "chartjs-plugin-zoom/types/options";

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
      pointRadius: 5.5,
      pointHoverRadius: 5,
      pointHitRadius: 10,
      spanGaps: true,
    },
  ],
};

const chartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  scales: {
    x: {
      display: false,
    },
    y: {
      min: 0,
      max: 100,
      ticks: {
        stepSize: 10,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      titleFont: {
        weight: "bold",
        size: 15,
      },
      bodyFont: {
        size: 15,
      },
      caretSize: 0,
      caretPadding: 8,
    },
  },
};

const zoomOptions: ZoomPluginOptions = {
  pan: {
    enabled: true,
    mode: "x",
    modifierKey: "ctrl",
  },
  zoom: {
    drag: {
      enabled: true,
      threshold: 50,
    },
    pinch: {
      enabled: true,
    },
    mode: "x",
  },
};

export const getChartConfig = (): ChartConfiguration => {
  return {
    type: "line",
    data: { ...initialData },
    options: {
      ...chartOptions,
      plugins: {
        ...chartOptions.plugins,
        zoom: zoomOptions,
      },
    },
  };
};

export const updateChartData = (
  config: ChartConfiguration,
  newData: number,
): void => {
  const labels: string[] = config.data.labels as string[];
  const dataset: ChartDataset = config.data.datasets[0];
  const currentDate: Date = new Date();
  const previousDate: Date | null =
    labels.length > 0
      ? parseDate(labels.slice(-1)[0] as string, dateStringFormat as string)
      : null;

  if (previousDate === null) {
    dataset.data.push(newData);
    labels.push(currentDate.toLocaleDateString("et-EE", dateFormatOptions));
  } else if (previousDate.getDate() == currentDate.getDate()) {
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