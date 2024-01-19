<template>
  <div id="contents">
    <LineGraph ref="lineGraph" :sliderValue="rangeValue" />
    <input type="range" id="slider" :min="0" :max="100" v-model="rangeValue">
    <label for="slider">{{ rangeValue }}</label>
    <button @click="fetchSubjects">Fetch Subjects</button>
    <button @click="submitStressValue">Sisesta</button>
    <DropdownSubjects :subjects="subjects" />
  </div>
</template>

<script lang="ts">
// Script in Options API
import { defineComponent } from 'vue';
import LineGraph from '../components/LineGraph.vue';
import DropdownSubjects from '../components/DropdownSubjects.vue';

interface FetchedItem {
  data: string[];
}

export default defineComponent({
  components: {
    LineGraph,
    DropdownSubjects
  },
  data() {
    return {
      rangeValue: 50,
      subjects: [] as any[],
    };
  },
  methods: {
    fetchSubjects() {
      console.log("Fetching subjects");
      fetch("http://172.17.159.197:8081/subjects", {
        method: "GET",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify({ subject: subject }), 
      })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        this.subjects = [];
        const array = data.data;
        for (const item of array) {
          const matches = item.value.match(/\(\d+,"([^"]+)"\)/);
          if (matches && matches[1] !== undefined) [
            this.subjects.push(matches[1])
          ]
        }        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    },
    submitStressValue() {
      // Access the child component using the ref and call the method
      if ((this.$refs.lineGraph as any).updateSliderValue) {
        (this.$refs.lineGraph as any).updateSliderValue(this.rangeValue);
      }
    },
  },
});
</script>