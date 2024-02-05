<template>
  <div id="canvas">
    <canvas id="chart" ref="lineChartCanvas">
      canvas
    </canvas>
    <div id="slider-component">
      <div class="slider">
        <input 
          v-model="sliderValue"
          class="wrapper" 
          type="range" 
          :min="0" 
          :max="100" />
      </div>
      <button id="enter-btn" @click="addEntry()">
        Sisesta <br />
        {{ sliderValue }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Chart from "chart.js/auto";
import { onMounted, ref, Ref, watch, defineProps } from "vue";
import {
  getChartConfig,
  initializeChart,
  updateChartData,
} from "@/utils/chartConfig";
import { 
  setEntry,
  getEntries
 } from "@/api/api";
import { ChartData } from "@/interfaces/interfaces";

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

Add slider styling to separate file
<style scoped>
#canvas {
  display: flex;
  width: 100%;
  justify-content: center;
  aspect-ratio: 1/0.6;
}

.wrapper {
  position: relative;
  height: 20rem;
  width: 3rem;
}

input[type="range"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background-color: rgba(63, 63, 63, 0.979);
  top: 50%;
  left: 50%;
  margin-bottom: 1vw;
  margin-top: 0;
  padding: 0;
  width: 60vw;
  height: 8vw;
  transform: translate(-50%, -50%) rotate(-90deg);
  border-radius: 1rem;
  overflow: hidden;
  cursor: row-resize;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0;
    box-shadow: -20rem 0 0 20rem rgba(255, 255, 255, 0.2);
  }

  &::-moz-range-thumb {
    border: none;
    width: 0;
    box-shadow: -20rem 0 0 20rem rgba(255, 255, 255, 0.2);
  }
}

label {
  color: #000000;
  margin-top: 1rem;
  font-size: 1rem;
}

#enter-btn {
  background-color: #0b0b2d;
  color: #fff;
  aspect-ratio: 1/1;
  width: 8vw;
  border-radius: 50%;
  padding: 0.5rem 1rem;
  margin-top: 1.5vw;
  border: none;
  cursor: pointer;
  font-size: 70%;
  align-self: center;

  &:hover {
    color: rgb(143, 143, 143);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    width: 9vw;
    margin-top: 1vw;
  }
}

.slider {
  width: 10vw;
  height: 60vw;
  align-self: center;
}

#slider-component {
  margin-top: 4vw;
  display: flex;
  flex-direction: column;
  height: 70vw;
  width: 10vw;
}

@media screen and (min-width: 800px) {
  #chart {
    max-width: 800px;
  }
  input[type="range"] {
    height: 5vw;
  }
  #enter-btn {
    width: 5vw;

    &:hover {
      margin-top: 1vw;
      width: 6vw;
    }
  }
}
</style>