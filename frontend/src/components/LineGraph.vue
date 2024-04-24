<template>
  <div id="canvas-wrapper" :class="{ mobile: isMobile }" >
    <canvas @dblclick="resetZoomFunc()"/>
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
import { Entry } from "@/api/types";
import { ChartData } from "@/interfaces/interfaces";
import { useEventStore } from "@/stores/event";
import { useSubjectStore } from "@/stores/subject";
import zoomPlugin from "chartjs-plugin-zoom";

defineProps<{ isMobile: boolean }>();
Chart.register(zoomPlugin);

let canvas: HTMLCanvasElement | null = null;
let chart: Chart | null = null;
const chartData: ChartData = { subject: "", data: [] };

const canvasMissing: Error = new Error("Canvas element is not initialized.");
const contextMissing: Error = new Error("Failed to obtain canvas context.");

const eventStore = useEventStore();
const subjectStore = useSubjectStore();

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
  if (subject == null) return alert("Palun valige mõni aine.");
  chartData.subject = subject;
  chartData.data = await api.getEntries(subject);
  chartData.data.sort(compareEntryDates);
  initializeChart(getChartConfig(), chartData);
  updateChart();
}

function compareEntryDates(entry1: Entry, entry2: Entry): number {
  const date1 = new Date(entry1.creationDate);
  const date2 = new Date(entry2.creationDate);

  return date1 < date2 ? -1 : date1 > date2 ? 1 : 0;
}

function resetZoomFunc() {
  if (chart !== null) {
    chart.resetZoom();
  }
};
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
