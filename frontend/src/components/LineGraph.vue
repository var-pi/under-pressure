<template>
  <div>
    <canvas ref="lineChartCanvas" height="400" width="400"></canvas>
  </div>
</template>

<script lang="ts">
import Chart from 'chart.js/auto';
import { onMounted, ref, watch, Ref } from 'vue';
import { getChartConfig, updateChartData } from '../utils/chartConfig';

interface Props {
  newStressValue: number;
  chartData: object;
}

export default {
  name: 'LineGraph', // Component name
  props: {
    newStressValue: {
      type: Number,
      required: true,
    },
    chartData: {
      type: Object, // Prop specifying the data for the chart
      required: true,
      default: () => ({ labels: [], values: [] }), // Default empty data
    },
  },

  setup(props: Props) {
    // Reference to the canvas element
    const lineChartCanvas = ref();
    const inputValue = ref('');
    const chartInstance: Ref<Chart | null> = ref(null);

    // Function to update the chart
    const updateChart = () => {
      const canvas = lineChartCanvas.value as HTMLCanvasElement;

      // Check if the element is a canvas
      if (canvas) {
        const context = canvas.getContext('2d');

        // Check if 2D rendering context is available
        if (context) {
          
          // If there is an existing chart, destroy it
          if (chartInstance.value) {
            chartInstance.value.destroy();
          }

          // Create a new Chart instance using Chart.js library
          const newChart = new Chart(context, getChartConfig());
          // Store the new chart instance on the canvas element
          chartInstance.value = newChart;

          console.log('Created chart');
        } else {
          console.error('Could not obtain 2D rendering context from canvas');
        }
      } else {
        console.error('Canvas element not found');
      }
    };


    // Function to update the chart with new data
    const updateChartInfo = () => {
      console.log('Updating graph with the input value of:', props.newStressValue);
      const newValue = props.newStressValue;
      if (!isNaN(newValue)) {
        // Use the getChartConfig function to obtain the chart configuration
        updateChartData(getChartConfig(), [newValue]);
      } else {
        console.error('Invalid input value. Please enter a valid number.');
      }
      updateChart();
    };

    // Call updateChart when the component is mounted
    onMounted(updateChart);

    // Watch for changes in chartData prop and update the chart accordingly
    watch([() => props.chartData, () => props.newStressValue], updateChartInfo);


    return {
      lineChartCanvas, // Expose the canvas reference to the template or other parts of the component
      inputValue,
      updateChartInfo,
    };
  },
};
</script>
