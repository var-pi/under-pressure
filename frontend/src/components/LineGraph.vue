<template>
  <div id="canvas-wrapper" :class="{ mobile: deviceStore.isMobile }">
    <canvas @dblclick="resetZoomFunc()" />
  </div>
</template>

<script setup lang="ts">
import Chart from "chart.js/auto";
import { onMounted, watch } from "vue";
import {
  getChartConfig,
  initializeChart,
  updateChartData,
} from "@/utils/chartConfig";
import { api } from "@/api";
import { ChartData } from "@/interfaces/interfaces";
import { useEventStore } from "@/stores/event";
import { useSubjectStore } from "@/stores/subject";
import { useDeviceStore } from "@/stores/device";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(zoomPlugin);

let canvas: HTMLCanvasElement | null = null;
let chart: Chart | null = null;
const chartData: ChartData = { subject: "", data: [] };

const canvasMissing: Error = new Error("Canvas element is not initialized.");
const contextMissing: Error = new Error("Failed to obtain canvas context.");

const eventStore = useEventStore();
const subjectStore = useSubjectStore();
const deviceStore = useDeviceStore();

onMounted(() => {
  canvas = document.querySelector("canvas");
  updateChart();

  eventStore.on("entryupdated", (e) => updateChartInfo(e.value));
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

watch(() => subjectStore.subjects.current, getSubjectEntries);

async function getSubjectEntries(subject: string | null) {
  if (subject == null) {
    chartData.subject = "";
    chartData.data = [];
  } else {
    chartData.subject = subject;
    chartData.data = await api.getEntries(subject);
  }
  initializeChart(getChartConfig(), chartData);
  updateChart();
}

function resetZoomFunc() {
  if (chart !== null) {
    chart.resetZoom();
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/default";

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
</style>
