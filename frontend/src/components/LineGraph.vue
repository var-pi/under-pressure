<template>
  <div id="canvas">
    <canvas id="chart" ref="lineChartCanvas"> canvas </canvas>
    <div id="slider-and-button-container">
      <div class="slider-container">
        <input v-model="sliderValue" type="range" :min="0" :max="100" />
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
import { api } from "@/api/api";
import { Entry } from "@/api/types";
import { ChartData } from "@/interfaces/interfaces";

const props = defineProps<{
  newSelectedSubject: string;
}>();

const lineChartCanvas = ref<HTMLCanvasElement | null>(null);
const newChart: Ref<Chart | null> = ref(null);
const sliderValue = ref<number>(50);
let chartData: ChartData = {
  subject: "",
  data: [],
};

onMounted(() => {
  lineChartCanvas.value = document.querySelector("canvas");

  if (lineChartCanvas.value) {
    updateChart();
  } else {
    console.error("Canvas element not found");
  }
});

watch(() => props.newSelectedSubject, getSubjectEntries);

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
    await api.updateEntry(props.newSelectedSubject, newStressValue);
    updateChartInfo(newStressValue);
  } catch (error) {
    console.error("Error adding entry:", error);
  }
}

async function getSubjectEntries(subject: string) {
  try {
    const entries: Entry[] = await api.getEntries(subject);
    chartData.subject = subject;
    chartData.data = entries;
    initializeChart(getChartConfig(), chartData);
    updateChart();
  } catch (error) {
    console.error("Error while fetching subject data:", error);
  }
}
</script>

<style scoped>
@import "@/styles/fontStyles.css";
@import "@/styles/colors/colors.css";

/* chart for expressing entries */
#chart {
  background-color: var(--col-3);
  border-radius: 10px;
}
@media screen and (min-width: 900px) {
  #chart {
    max-width: 800px;
    max-height: 480px;
  }
}
@media screen and (max-width: 900px) {
  #chart {
    margin: 0px 10px 0 10px;
  }
}
/* canvas for chart and related elements */
#canvas {
  margin-top: 20px;
  display: flex;
  width: 100%;
  max-height: 580px;
  justify-content: center;
  aspect-ratio: 1/0.6;
}
@media screen and (max-width: 1100px) {
  #canvas {
    margin-top: 100px;
  }
}
@media screen and (max-width: 900px) {
  #canvas {
    flex-direction: column;
  }
}
@media screen and (max-width: 550px) {
  #canvas {
    margin-top: 50px;
  }
}
@media screen and (max-width: 400px) {
  #canvas {
    margin-top: 30px;
  }
}

/* label for slider value */
label {
  color: #000000;
  margin-top: 1rem;
  font-size: 1rem;
}

/* container for the slider and enter button */
#slider-and-button-container {
  display: flex;
  flex-direction: column;
  height: 70vw;
  max-height: 580px;
  max-width: 80px;
  width: 10vw;
  margin: 0 0 0 10px;
}
@media screen and (max-width: 900px) {
  #slider-and-button-container {
    flex-direction: row;
    justify-content: start;
    width: 70vw;
    height: 10vw;
    max-height: 80px;
    max-width: 650px;
    align-self: flex-end;
    margin: 10px 10px 10px 30px;
  }
}
@media screen and (max-width: 400px) {
  #slider-and-button-container {
    min-height: 13vw;
    min-width: 70vw;
  }
}

/* button for submitting slider value */
#enter-btn {
  background-color: var(--col-5);
  color: #fff;
  aspect-ratio: 1/1;
  border-radius: 50%;
  padding: 0.5rem 1rem;
  margin-top: 20px;
  border: none;
  cursor: pointer;
  font-size: 70%;
  font-family: var(--font-family);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.05);
  width: 8vw;
  height: 8vw;
  max-width: 80px;
  max-height: 80px;

  &:hover {
    box-shadow: rgba(0, 1, 0, 0.5) 0 2px 8px;
    opacity: 0.95;
  }
}

@media screen and (max-width: 900px) {
  #enter-btn {
    margin: 10px;
    right: 30px;
    margin: 0;
  }
}
@media screen and (max-width: 400px) {
  #enter-btn {
    width: 10vw;
    height: 10vw;
    margin-left: 0;
  }
}

/* slider element */
input[type="range"] {
  appearance: none;
  background-color: var(--col-4);
  top: 50%;
  left: 50%;
  width: 60vw;
  height: 8vw;
  transform: translate(-50%, -50%) rotate(-90deg);
  border-radius: 1rem;
  overflow: hidden;
  position: relative;

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
@media screen and (min-width: 900px) {
  input[type="range"] {
    max-width: 480px;
    max-height: 80px;
  }
}
@media screen and (max-width: 900px) {
  input[type="range"] {
    transform: none;
    top: 0;
    left: 0;
  }
}
@media screen and (max-width: 400px) {
  input[type="range"] {
    width: 55vw;
    height: 10vw;
  }
}

/* slider container */
.slider-container {
  width: 10vw;
  height: 70vw;
  max-height: 480px;
  max-width: 80px;
  position: relative;
}
@media screen and (max-width: 900px) {
  .slider-container {
    width: 80vw;
    height: 10vw;
    max-height: 80px;
    max-width: 580px;
    align-items: flex-start;
  }
}
@media screen and (max-width: 400px) {
  .slider-container {
    width: 90vw;
    height: 13vw;
    max-height: 80px;
    max-width: 480px;
  }
}
</style>

