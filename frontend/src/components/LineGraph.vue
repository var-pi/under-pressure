<template>
  <button id="settings-btn">
    Settings
  </button>
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
@import "@/styles/colors/colors.css";
@import "@/styles/LineGraphStyles/sliderStyle.css";

#chart {
  background-color: var(--col-3);
  box-shadow: 0 0 15rem var(--col-2), 0 0 10rem var(--col-3), 0 0 5rem var(--col-3);
  border-radius: 10px;
}
#canvas {
  margin-top: 100px;
  display: flex;
  width: 100%;
  max-height: 580px;
  justify-content: center;
  aspect-ratio: 1/0.6;
}

label {
  color: #000000;
  margin-top: 1rem;
  font-size: 1rem;
}

#slider-component {
  display: flex;
  flex-direction: column;
  height: 70vw;
  max-height: 580px;
  max-width: 80px;
  width: 10vw;
  margin-left: 10px;
}

#enter-btn {
  background-color: var(--col-4);
  color: #fff;
  aspect-ratio: 1/1;
  border-radius: 50%;
  padding: 0.5rem 1rem;
  margin-top: 20px;
  border: none;
  cursor: pointer;
  font-size: 70%;
  width: 8vw;
  height: 8vw;
  max-width: 80px;
  max-height: 80px;
  &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }
}

#settings-btn {
    max-width: 70px;
    max-height: 70px;
    width: 10vw;
    height: 10vw;
    aspect-ratio: 1/1;
    margin: 10px;
    position: fixed;
    top: 10px;
    right: 10px;
  }

@media screen and (min-width: 900px) {
  #chart {
    max-width: 800px;
    max-height: 480px;
  }
  input[type="range"] {
    max-width: 480px;
    max-height: 80px;
  }
}
@media screen and (max-width: 900px) {
  #slider-component {
    flex-direction: row;
    justify-content: start;
    width: 70vw;
    height: 10vw;
    max-height: 80px;
    max-width: 600px;
    align-self: flex-end;
    margin: 0 30px 0 0;
  }
  #chart {
    margin: 0px 10px 0 10px;
  }
  #canvas {
    flex-direction: column;
  }
  input[type="range"] {
    transform: none;
  }
  .slider {
    width: 80vw;
    height: 10vw;
    max-height: 80px;
    max-width: 580px;
    align-items: flex-start;
  }
  .wrapper {
    left: auto;
    top: auto;
    margin: 10px 0 0 0px;
  }
  #enter-btn {
    margin: 10px;
    right: 30px;
  }
}

@media screen and (max-width: 550px) {
  #canvas {
    margin-top: 50px;
  }
  #settings-btn {
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    margin: 5px;
  }
}

@media screen and (max-width: 400px) {
  #canvas {
    margin-top: 30px;
  }
  #settings-btn {
    width: 20px;
    height: 20px;
    margin: 5px;
  }
  #enter-btn {
    margin-left: 0;
  }
  .slider {
    width: 90vw;
    height: 13vw;
    max-height: 80px;
    max-width: 480px;
    align-items: flex-start;
  }
  #slider-component {
    min-height: 12vw;
    min-width: 70vw;
    align-self: flex-end;
    margin: 0 30px 0 0;
  }
  #enter-btn {
    width: 10vw;
    height: 10vw;
  }
  input[type="range"] {
    width: 55vw;
    height: 10vw;
  }
}
</style>