<template id="wrapper">
  <div id="graph-and-slider" :class="{ mobile: isMobile }">
    <div id="canvas-wrapper">
      <canvas> </canvas>
    </div>
    <SliderInput :is-vertical="!isMobile" v-model="sliderValue" />
  </div>

  <div id="slots-and-button">
    <div id="square-slot-wrapper">
      <slot name="square"> </slot>
    </div>
    <div id="fill-width-slot-wrapper">
      <slot name="fill-width"> </slot>
    </div>
    <DefaultButton id="enter-btn" @click="updateEntry">
      {{ sliderValue }}
    </DefaultButton>
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

const props = defineProps<{ selectedSubject: string }>();

let canvas: HTMLCanvasElement | null = null;
let chart: Chart | null = null;
const sliderValue = ref<number>(50);
const chartData: ChartData = { subject: "", data: [] };
const mobileMaxWidth = 900;
let isMobile = ref(false);

const canvasMissing: Error = new Error("Canvas element is not initialized.");
const contextMissing: Error = new Error("Failed to obtain canvas context.");

onMounted(() => {
  setIfVertical();
  window.addEventListener("resize", setIfVertical);

  canvas = document.querySelector("canvas");
  updateChart();
});

function updateChart() {
  if (!canvas) throw canvasMissing;

  const context = canvas.getContext("2d");
  if (!context) throw contextMissing;

  if (chart) chart.destroy();
  chart = new Chart(context, getChartConfig());
}

// Function to update the chart with new value
function updateChartInfo(newValue: number) {
  updateChartData(getChartConfig(), newValue);
  updateChart();
}

function updateEntry() {
  if (props.selectedSubject == "") return alert("Palun vali mõni aine.");

  api.updateEntry(props.selectedSubject, sliderValue.value);
  updateChartInfo(sliderValue.value);
}

watch(() => props.selectedSubject, getSubjectEntries);

async function getSubjectEntries(subject: string) {
  chartData.subject = subject;
  chartData.data = await api.getEntries(subject);
  chartData.data.sort(compareEntryDates);
  initializeChart(getChartConfig(), chartData);
  updateChart();
}

function setIfVertical() {
  isMobile.value = window.innerWidth < mobileMaxWidth;
}

function compareEntryDates(entry1: Entry, entry2: Entry): number {
  const date1 = new Date(entry1.creationDate);
  const date2 = new Date(entry2.creationDate);

  return date1 < date2 ? -1 : date1 > date2 ? 1 : 0;
}
</script>

<style lang="scss" scoped>
@import "@/styles/default";

/* wrapper for graph, slider and buttons */
#wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#graph-and-slider,
#slots-and-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

/* container for slider and graph */
#graph-and-slider {
  flex: 1;

  &.mobile {
    flex-direction: column;
  }
}

/* wrapper for canvas */
#canvas-wrapper {
  @include default;
  margin: var(--default-margin);
  flex: 1;

  /* chart for expressing entries */
  canvas {
    position: absolute;
    height: 100%;
    width: 100%;
  }
}

#square-slot-wrapper,
#enter-btn {
  margin: var(--default-margin);
  width: var(--default-size);
  height: var(--default-size);
}

/* slot for dropdown menu */
#fill-width-slot-wrapper {
  margin: var(--default-margin);
  flex: 1;
}
</style>

