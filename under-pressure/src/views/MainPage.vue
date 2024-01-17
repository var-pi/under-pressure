<template>
  <div>
    <LineGraph></LineGraph>
    <input type="range" :min="1" :max="100" v-model="rangeValue">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LineGraph from '@/components/LineGraph.vue';

export default defineComponent({
  components: {
    LineGraph,
  },
  data() {
    return {
      rangeValue: 50,
    };
  },
});
</script>
