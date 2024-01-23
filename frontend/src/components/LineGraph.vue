<template>
  <div>
    <canvas ref="lineChartCanvas" height="400" width="400"></canvas>
  </div>
</template>

<script setup lang="ts">
import Chart from "chart.js/auto";
import { onMounted, ref, watch, Ref, PropType, defineProps } from "vue";
import {
  getChartConfig,
  initializeChart,
  updateChartData,
} from "../utils/chartConfig";

interface Props {
  newStressValue: number;
  chartData: ChartData;
}

interface ChartData {
  subject: string;
  entries: any[]; // You might want to replace 'any' with a more specific type if you know the structure of entries
  dates: any[]; // Similarly, replace 'any' with the actual type of dates
}

const name = "LineGraph"; // Component name

const props = defineProps<{
  newStressValue: number;
  chartData: ChartData;
}>();

// Reference to the canvas element
const lineChartCanvas = ref<HTMLCanvasElement | null>(null);
const newChart: Ref<Chart | null> = ref(null);

const updateChart = () => {
  const canvas = lineChartCanvas.value;

  if (canvas) {
    const context = canvas.getContext("2d");

    if (context) {
      if (newChart.value) {
        newChart.value.destroy();
      }

      const chartConfig = getChartConfig();
      const chartInstance = new Chart(context, chartConfig) as Chart;

      newChart.value = chartInstance;

      console.log("Created chart");
    } else {
      console.error("Could not obtain 2D rendering context from canvas");
    }
  } else {
    console.error("Canvas element not found");
  }
};

// Function to update the chart with new value
const updateChartInfo = () => {
  console.log("Updating graph with the input value of:", props.newStressValue);
  const newValue = props.newStressValue;
  if (!isNaN(newValue)) {
    // Use the getChartConfig function to obtain the chart configuration
    updateChartData(getChartConfig(), [newValue]);
  } else {
    console.error("Invalid input value. Please enter a valid number.");
  }
  updateChart();
};

// TODO:Function to update the chart with new chart value
const initializeChartInfo = () => {
  console.log("Got new data:", props.chartData);

  initializeChart(getChartConfig(), props.chartData);

  updateChart();
};

// Call updateChart when the component is mounted
onMounted(() => {
  lineChartCanvas.value = document.querySelector("canvas"); // or use another method to get the canvas element
  updateChart();
});

// Watch for changes in chartData prop and update the chart accordingly
watch(() => props.newStressValue, updateChartInfo);
watch(() => props.chartData, initializeChartInfo);
</script>

