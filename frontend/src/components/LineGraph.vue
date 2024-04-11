<template>
  <div id="graph-and-slider" :class="{ mobile: isMobile }">
    <div id="canvas-wrapper">
      <canvas />
    </div>
    <SliderInput v-model="sliderValue" :is-vertical="!isMobile" />
  </div>

  <div id="slots-and-button">
    <div id="square-slot-wrapper">
      <slot name="square" />
    </div>
    <div id="fill-width-slot-wrapper">
      <slot name="fill-width" />
    </div>
    <DefaultButton id="enter-btn" @click="updateEntry">
      {{ sliderValue }}
    </DefaultButton>
  </div>
</template>

<script setup lang="ts">
import Chart from "chart.js/auto";
import { onMounted, ref, watch } from "vue";
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
const emit = defineEmits(["open-personal-dropdown"])

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

function updateChartInfo(newValue: number) {
  updateChartData(getChartConfig(), newValue);
  updateChart();
}

function updateEntry() {
  if (props.selectedSubject == "") {
    emit('open-personal-dropdown');
    return alert("Palun vali mõni aine.");
  }
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

#graph-and-slider,
#slots-and-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

#graph-and-slider {
  flex: 1;

  &.mobile {
    flex-direction: column;
  }
}

#canvas-wrapper {
  @include default;
  margin: var(--default-margin);
  flex: 1;

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

#fill-width-slot-wrapper {
  margin: var(--default-margin);
  flex: 1;
}
</style>
