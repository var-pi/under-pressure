<template>
  <div id="contents">
    <LineGraph ref="lineGraph" :sliderValue="rangeValue" :selectedSubject="selectedSubject" />
    <input type="range" id="slider" :min="0" :max="100" v-model="rangeValue">
    <label for="slider">{{ rangeValue }}</label>
    <button @click="submitStressValue">Sisesta</button>
    <DropdownSubjects @button-clicked="handleDropdownButtonClick" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LineGraph from '@/components/LineGraph.vue';
import DropdownSubjects from '@/components/DropdownSubjects.vue';

export default defineComponent({
  components: {
    LineGraph,
    DropdownSubjects,
  },
  data() {
    return {
      rangeValue: 50,
      selectedSubjects: "",
    };
  },
  methods: {
    submitStressValue() {
      // Access the child component using the ref and call the method
      if ((this.$refs.lineGraph as any).updateSliderValue) {
        (this.$refs.lineGraph as any).updateSliderValue(this.rangeValue);
      }
    },
    handleDropdownButtonClick(selectedSubject: string) {
      // Handle the event emitted by DropdownSubjects
      // Update the selectedSubject property
      this.selectedSubject = selectedSubject;
    },
  },
});
</script>