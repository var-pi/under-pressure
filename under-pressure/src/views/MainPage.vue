<template>
  <div id="contents">
    <LineGraph ref="lineGraph" :sliderValue="rangeValue" />
    <input type="range" id="slider" :min="0" :max="100" v-model="rangeValue">
    <label for="slider">{{ rangeValue }}</label>
    <button @click="submitStressValue">Sisesta</button>
    <DropdownSubjects/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LineGraph from '@/components/LineGraph.vue';
import DropdownSubjects from '@/components/DropdownSubjects.vue';

export default defineComponent({
  components: {
    LineGraph,
    DropdownSubjects
  },
  data() {
    return {
      rangeValue: 50,
    };
  },
  methods: {
    submitStressValue() {
      // Access the child component using the ref and call the method
      if (this.$refs.lineGraph) {
        (this.$refs.lineGraph as any).updateSliderValue(this.rangeValue);
      }
    },
  },
});
</script>