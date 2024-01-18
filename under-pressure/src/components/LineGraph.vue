<template>
  <div id="graphContainer">
    <canvas ref="lineGraphRef" ></canvas>
  </div>
</template>

<script lang="ts">
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { onMounted, ref, watch, SetupContext } from 'vue';

interface LineGraphProps {
  sliderValue: number;
  selectedSubject: string;
}

export default {
  name: 'LineGraph',
  props: {
    // Prop to receive the slider value from the parent component
    sliderValue: {
      type: Number,
      default: 50,
    },
    selectedSubject: {
      type: String,
      default: "",
    }
  },
  setup(props: LineGraphProps, context: SetupContext) {
    // Initial data for labels and values in the line graph
    // Todo: get initial values from database
    let labels = ['1', '2', '3', '4', '5', '6', '7'];
    let values = [65, 59, 80, 81, 56, 55, 40];

    // Chart.js data object containing labels and datasets
    const data = {
      labels: labels,
      datasets: [{
        label: 'Stressitase',
        data: values,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.2,
      }],
    };

    // Configuration object for the Chart.js chart
    const config: ChartConfiguration = {
      type: 'line',
      data: data,
      options: {},
    };

    // Reference to the canvas element
    const lineGraphRef = ref<HTMLCanvasElement | null>(null);
    // Variable to store the Chart.js instance
    let lineGraph: Chart;

    // Vue lifecycle hook: executed when the component is mounted
    onMounted(() => {
      const canvasTag = lineGraphRef.value;
      if (canvasTag) {
        // Initialize the Chart.js instance with the provided configuration
        lineGraph = new Chart(
          canvasTag.getContext('2d') as CanvasRenderingContext2D,
          config
        );
      }
    });

    // Method to update the slider value and add it to the values array
    const updateSliderValue = (newValue: number) => {
      // Log the updated slider value
      console.log('Slider value updated in child component:', newValue);

      // Add the new slider value to the values array
      values.push(newValue);

      // Add Date as a label for the graph
      const date = new Date();
      labels.push(date.toLocaleDateString())

      // Update the chart data with the new arrays
      updateChartData();
    };

    // Method to update the chart data with the new values array
    const updateChartData = () => {
      if (lineGraphRef.value) {
        // Update the chart data with the new values array
        lineGraph.data.datasets[0].data = values;

        // Update the chart
        lineGraph.update();
      }
    };
    // Watch for changes in the selectedSubject prop
    watch(() => props.selectedSubject, (newSubject) => {
      console.log('Selected Subject:', newSubject);
      // TODO: Handle the selected subject information as needed
    });

    // Return the references and methods for external use
    return {
      lineGraphRef,
      updateSliderValue,
    };
  },
};
</script>