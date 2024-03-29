<template>
  <div id="wrapper">
    <div id="graph-and-slider" :class="{ mobile: isMobile }">
      <div id="canvas-wrapper">
        <canvas id="chart" ref="lineChartCanvas"> canvas </canvas>
      </div>
      <SliderInput :is-vertical="!isMobile" v-model="sliderValue" />
    </div>
    <div id="slot-and-button">
      <div id="square-slot-wrapper">
        <slot name="square"></slot>
      </div>
      <div id="fill-width-slot-wrapper">
        <slot name="fill-width"></slot>
      </div>
      <DefaultButton id="enter-btn" class="" @click="addEntry()">
        {{ sliderValue }}
      </DefaultButton>
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
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import SliderInput from "@/components/SliderInput.vue";

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
const mobileMaxWidth = 900;
let isMobile = ref(false);

onMounted(() => {
  lineChartCanvas.value = document.querySelector("canvas");

  if (lineChartCanvas.value) {
    updateChart();
  } else {
    console.error("Canvas element not found");
  }

  window.addEventListener("resize", setIfVertical);
  setIfVertical();
});

watch(() => props.newSelectedSubject, getSubjectEntries);

function setIfVertical() {
  isMobile.value = window.innerWidth < mobileMaxWidth;
}

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

<style lang="scss" scoped>
@import "@/styles/fontStyles.css";
@import "@/styles/colors/colors.css";
@import "@/styles/default";

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

  &.mobile {
    flex-direction: column;
  }
}

/* wrapper for canvas */
#canvas-wrapper {
  margin: var(--default-margin);
  flex-grow: 1;
  flex-shrink: 1;
}

/* chart for expressing entries */
#chart {
  @include default;
  background-color: initial;
  height: 100%;
  width: 100%;
  position: absolute;
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

#square-slot-wrapper {
  margin: var(--default-margin);
  width: 64px;
  height: 64px;
}

/* slot for dropdown menu */
#fill-width-slot-wrapper {
  margin: var(--default-margin);
  display: flex;
  flex: 1;
}
</style>

