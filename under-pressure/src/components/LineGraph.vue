<template>
  <div>
    <canvas ref="lineGraphRef" width="400" height="400"></canvas>
  </div>
</template>

<script lang="ts">
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { onMounted, ref } from 'vue';

export default {
  name: 'LineGraph',
  setup() {
    const labels = ['1', '2', '3', '4', '5', '6', '7'];

    const data = {
      labels: labels,
      datasets: [{
        label: 'Stressitase',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.2,
      }],
    };

    const config: ChartConfiguration = {
      type: 'line',
      data: data,
      options: {}
    };

    const lineGraphRef = ref<HTMLCanvasElement | null>(null);

    onMounted(() => {
      const canvasTag = lineGraphRef.value;
      if (canvasTag) {
        const lineGraph = new Chart(
          canvasTag.getContext('2d') as CanvasRenderingContext2D,
          config
        );
      }
    });

    return {
      lineGraphRef,
    };
  },
};
</script>

<style scoped>

</style>
