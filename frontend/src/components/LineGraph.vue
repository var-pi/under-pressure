<template>
  <div>
    <canvas ref="lineChartCanvas" height="400" width="400">
      canvas
    </canvas>
  </div>
  <input 
    id="slider" 
    v-model="sliderValue"
    type="range" 
    :min="0" 
    :max="100" />
  <label for="slider">
    {{ sliderValue }}
  </label>
  <button @click="addEntry()">
    Sisesta
  </button>
</template>

<script setup lang="ts">
import Chart from "chart.js/auto";
import { onMounted, ref, Ref, watch, defineProps } from "vue";
import {
  getChartConfig,
  initializeChart,
  updateChartData,
} from "../utils/chartConfig";
import { 
  setEntry,
  getEntries
 } from "../api/api";
import { ChartData } from "../interfaces/interfaces";

const props = defineProps<{
  newSelectedSubject: string,
}>();

const lineChartCanvas = ref<HTMLCanvasElement | null>(null);
const newChart: Ref<Chart | null> = ref(null);
const sliderValue = ref<number>(50);
let chartData: ChartData = {
  subject: '',
  data: [],
}

onMounted(() => {
  lineChartCanvas.value = document.querySelector("canvas");

  if (lineChartCanvas.value) {
    updateChart();
  } else {
    console.error("Canvas element not found");
  }
});

watch(() => props.newSelectedSubject, getSubjectEntries)

// TODO: move to chartConfig.ts
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
function updateChartInfo(newValue: number) {
  if (!isNaN(newValue)) {
    updateChartData(getChartConfig(), newValue);
  } else {
    console.error("Invalid input value. Please enter a valid number.");
  }
  updateChart();
}

async function addEntry() {
  try {
    const newStressValue = sliderValue.value;
    await setEntry(props.newSelectedSubject, newStressValue);    
    updateChartInfo(newStressValue);
  } catch (error) {
    console.error("Error adding entry:", error);
  }
}

async function getSubjectEntries(subject: string) {
  try {
    // Fetch entries for the selected subject TODO: make dynamic
    const result = await getEntries(subject);

    if (result.status == "success") {
      chartData.data = result.data;
      console.log("Successfully fetched entries.", result.message);
      chartData.subject = subject;
      chartData.data = result.data;
      initializeChart(getChartConfig(), chartData);
      updateChart();
    } else {
      console.log("Failed to get entries.", result.message);
    }
  } catch (error) {
    console.error("Error while fetching subject data:", error);
  }
}
</script>

