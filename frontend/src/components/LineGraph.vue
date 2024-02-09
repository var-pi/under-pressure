<template>
  <div id="wrapper">
    <div id="graph-and-slider">
      <div id="canvas-wrapper">
        <canvas id="chart" ref="lineChartCanvas" class="default">
          canvas
        </canvas>
      </div>
      <div id="slider-wrapper" class="default">
        <input
          id="slider"
          v-model="sliderValue"
          type="range"
          class="default"
          :min="0"
          :max="100"
        />
      </div>
    </div>
    <div id="slot-and-button">
      <div id="slot-wrapper">
        <slot></slot>
      </div>
      <button id="enter-btn" class="default button" @click="addEntry()">
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
@import "@/styles/button.css";
@import "@/styles/default.css";

#wrapper {
  --default-margin: 8px;
}

/* wrapper for graph, slider and buttons */
#wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* container for slider and graph */
#graph-and-slider {
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

/*  @media screen and (max-width: 900px) {
    #graph-and-slider {
      flex-direction: column;
    }
  } */

/* wrapper for canvas */
#canvas-wrapper {
  margin: var(--default-margin);
  flex-grow: 1;
  flex-shrink: 1;
  width: max-content;
}

/* chart for expressing entries */
#chart {
  background-color: initial;
  height: 100%;
  width: 100%;
  position: absolute;
}

/* wrapper fpr slider */
#slider-wrapper {
  margin: var(--default-margin);
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  width: 62px;
}

/* stress value slider */
#slider {
  background-color: initial;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  margin: 0;
  border: 0 !important;
  writing-mode: vertical-lr;
  -webkit-appearance: none;
  appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0;
    height: 0;
    box-shadow: 0 500px 0 500px var(--col-bg-lighter);
  }

  &::-webkit-slider-runnable-track {
    background-color: initial;
  }

  &::-moz-range-thumb {
    border: 0;
    width: 0;
    box-shadow: 0 500px 0 500px var(--col-bg-default);
  }
}

@-moz-document url-prefix() {
  #slider {
    background-color: var(--col-bg-lighter);
    transform: scaleY(-1); /* Firefox is weird */
  }
}

/* submit value button and slot for dropdown menu */
#slot-and-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

/* button for submitting slider value */
#enter-btn {
  margin: var(--default-margin);
  flex-shrink: 0;
  flex-grow: 0;
  width: 64px;
  height: 64px;
}

/* slot for dropdown menu */
#slot-wrapper {
  margin: var(--default-margin);
  display: flex;
  flex: 1;
}
</style>

