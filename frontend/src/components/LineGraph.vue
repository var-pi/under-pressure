<template>
  <div>
    <canvas ref="lineChartCanvas" height="400" width="400"></canvas>
  </div>
</template>

<script setup lang="ts">
import Chart from "chart.js/auto";
import { onMounted, ref, watch, Ref, defineProps } from "vue";
import {
  getChartConfig,
  initializeChart,
  updateChartData,
} from "../utils/chartConfig";

interface ChartData {
  subject: string;
  entries: number[];
  dates: string[];
}

const props = defineProps<{
  newStressValue: number;
  chartData: ChartData;
}>();

// Reference to the canvas element
const lineChartCanvas = ref<HTMLCanvasElement | null>(null);
const newChart: Ref<Chart | null> = ref(null);

  function updateChart() {
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
}

// Function to update the chart with new value
function updateChartInfo() {
  console.log("Updating graph with the input value of:", props.newStressValue);
  const newValue = props.newStressValue;
  if (!isNaN(newValue)) {
    // Use the getChartConfig function to obtain the chart configuration
    updateChartData(getChartConfig(), [newValue]);
  } else {
    console.error("Invalid input value. Please enter a valid number.");
  }
  updateChart();
}

// Function to update the chart with new chart value
function initializeChartInfo() {
  console.log("Got new data:", props.chartData);

  initializeChart(getChartConfig(), props.chartData);

  updateChart();
}

// Call updateChart when the component is mounted
onMounted(() => {
  lineChartCanvas.value = document.querySelector("canvas"); // or use another method to get the canvas element
  updateChart();
});

// Watch for changes in chartData prop and update the chart accordingly
watch(() => props.newStressValue, updateChartInfo);
watch(() => props.chartData, initializeChartInfo);
</script>

