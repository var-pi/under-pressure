<template>
  <div id="wrapper">
    <!-- <canvas id="chart" class="default" ref="lineChartCanvas"> canvas </canvas>
    <div id="slider-and-button-container">
      <div class="slider-container">
        <input
          v-model="sliderValue"
          type="range"
          class="default"
          :min="0"
          :max="100"
        />
      </div>
      <button id="enter-btn" class="default button" @click="addEntry()">
        {{ sliderValue }}
      </button>
    </div> -->
    <div id="graph-and-slider">
      <div id="canvasWrapper">
        <canvas id="chart" class="default" ref="lineChartCanvas">
          canvas
        </canvas>
      </div>
      <div id="sliderWrapper" class="default">
        <input
          type="range"
          id="slider"
          v-model="sliderValue"
          class="default"
          :min="0"
          :max="100"
        />
      </div>
    </div>
    <div id="slot-and-button">
      <div id="slotWrapper">
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

/* canvas for chart and related elements */
#wrapper {
  /* margin-top: 20px; */
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* max-height: 580px; */
  justify-content: center;
  /* aspect-ratio: 1/0.6; */
}
/* @media screen and (max-width: 1100px) {
  #wrapper {
    margin-top: 100px;
  }
}
@media screen and (max-width: 550px) {
  #wrapper {
    margin-top: 50px;
  }
}
@media screen and (max-width: 400px) {
  #wrapper {
    margin-top: 30px;
  }
} */

#graph-and-slider {
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

#canvasWrapper {
  margin: var(--default-margin);
  flex-grow: 1;
  flex-shrink: 1;
  width: max-content;
  /* flex-direction: row;
  position: relative;
  display: flex;
  position: relative; */
}

/* chart for expressing entries */
#chart {
  background-color: initial;
  height: 100%;
  width: 100%;
  position: absolute;
}
/* @media screen and (min-width: 900px) {
  #chart {
    max-width: 800px;
    max-height: 480px;
  }
}
@media screen and (max-width: 900px) {
  #chart {
    margin: 0px 10px 0 10px;
  }
} */

#sliderWrapper {
  margin: var(--default-margin);
  /* margin-left: 16px; */
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  width: 62px;
  /* border: 1px solid red; */
}

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

/* label for slider value */
/* label {
  color: #000000;
  margin-top: 1rem;
  font-size: 1rem;
} */

/* container for the slider and enter button */
/* #slider-and-button-container {
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
} */

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
/*
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
} */

/* slider element */
input[type="range"] {
  /* appearance: none; */
  /* background-color: var(--col-bg-default); */
  /* top: 50%;
  left: 50%; */
  /* width: 60vw; */
  /* height: 8vw; */
  /* transform: translate(-50%, -50%) rotate(-90deg); */
  /* overflow: hidden; */
  /* position: relative; */

  /* &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0;
    box-shadow: -20rem 0 0 20rem var(--col-bg-lighter);
  }

  &::-moz-range-thumb {
    border: none;
    width: 0;
    box-shadow: -20rem 0 0 20rem var(--col-bg-lighter);
  } */
}
/* @media screen and (min-width: 900px) {
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
} */

/* slider container */
/* .slider-container {
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
} */

#slotWrapper {
  margin: var(--default-margin);
  display: flex;
  flex: 1;
}
</style>

