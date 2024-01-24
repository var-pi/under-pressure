<template>
  <div>
    <canvas ref="lineChartCanvas" height="400" width="400"></canvas>
  </div>
</template>

<script setup lang="ts">
import Chart from "chart.js/auto";
import { onMounted, ref, Ref, watch, defineProps } from "vue";
import {
  getChartConfig,
  initializeChart,
  updateChartData,
} from "../utils/chartConfig";
import { ChartData } from "../interfaces/interfaces";

const lineChartCanvas = ref<HTMLCanvasElement | null>(null);
const newChart: Ref<Chart | null> = ref(null);

const props = defineProps<{
  newStressValue: number,
  chartData: ChartData,
}>();

onMounted(() => {
  lineChartCanvas.value = document.querySelector("canvas");

  if (lineChartCanvas.value) {
    updateChart();
  } else {
    console.error("Canvas element not found");
  }
});

watch(() => props.newStressValue, updateChartInfo);
watch(() => props.chartData, initializeChartInfo);

function updateChart() {
  const canvas = lineChartCanvas.value;

  if (canvas) {
    const context = canvas.getContext("2d");

    if (context) {
      if (newChart.value) {
        newChart.value.destroy();
      }

      const chartConfig = getChartConfig();
      const chartInstance = new Chart(context, chartConfig);
      newChart.value = chartInstance as Chart;

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
  const newValue = props.newStressValue;
  if (!isNaN(newValue)) {
    updateChartData(getChartConfig(), [newValue]);
  } else {
    console.error("Invalid input value. Please enter a valid number.");
  }
  updateChart();
}

// Function to update the chart with new chart value
function initializeChartInfo() {
  initializeChart(getChartConfig(), props.chartData);
  updateChart();
}

// Call updateChart when the component is mounted
onMounted(() => {
  lineChartCanvas.value = document.querySelector("canvas"); // or use another method to get the canvas element
  updateChart();
});
</script>

