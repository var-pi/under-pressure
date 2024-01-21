<!-- MainPage.vue -->
<template>
  <div id="contents">
    <LineGraph :newStressValue="submittedSliderValue"></LineGraph>
    <input type="range" id="slider" :min="0" :max="100" v-model="sliderValue" />
    <label for="slider">{{ sliderValue }}</label>
    <button @click="fetchSubjects">Fetch Subjects</button>
    <button @click="submittedSliderValue = sliderValue">Sisesta</button>
    <DropdownSubjects :subjects="localSubjects" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import DropdownSubjects from '../components/DropdownSubjects.vue';
import LineGraph from "../components/LineGraph.vue"


interface MainPageProps {
  subjects: string[];
}

export default defineComponent({
  components: {
    DropdownSubjects,
    LineGraph
  },
  props: {
    subjects: {
      type: Array as PropType<string[]>,
      required: true,
      default: () => [],
    },
  },
  setup(props: MainPageProps) {
    const sliderValue = ref(50);
    const submittedSliderValue = ref(50); // Initialize it with the default value or any other value you want
    const localSubjects = ref(props.subjects.slice()); // Copy the props to local state

    // Methods
    const fetchSubjects = async () => {
      try {
        //const response = await fetch('https://6296-2001-7d0-87fb-e800-ca6f-49a2-39c7-4844.ngrok-free.app/subjects', {
        const response = await fetch('http://localhost:8080/subjects.json', {
          method: 'GET',
        });
        const data = await response.json();
        localSubjects.value = data.data as string[];
      } catch (error) {
        console.error('Error:', error);
      }
    };

    return {
      sliderValue,
      localSubjects,
      fetchSubjects,
      submittedSliderValue,
    };
  },
});
</script>
