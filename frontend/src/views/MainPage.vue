<!-- MainPage.vue -->
<template>
  <div id="contents">
    <LineGraph :newStressValue="submittedSliderValue" :chartData="chartData"></LineGraph>
    <input type="range" id="slider" :min="0" :max="100" v-model="sliderValue" />
    <label for="slider">{{ sliderValue }}</label>
    <button id="fetch-subjects" @click="fetchSubjects">Fetch Subjects</button>
    <button @click="submittedSliderValue = sliderValue">Sisesta</button>
    <DropdownSubjects :subjects="localSubjects" :selectedSubject="selectedSubject" @update:selectedSubject="handleSelectedSubjectUpdate"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { getSubjects, getSubjectData } from '../api/api';
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
    selectedSubject: {
      type: String,
      default: null,
    },
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
    const chartData = ref();

    // Methods
    const fetchSubjects = async () => {
      try {
        localSubjects.value = await getSubjects();
      } catch (error) {
        console.error('Error:', error);
      }
    };
    const handleSelectedSubjectUpdate = async (subject: string) => {
      try {
        const item = await getSubjectData(subject);
        chartData.value = item;
      } catch (error) {
        console.error('Error while fetching subject data:', error);
      }
    };

    return {
      sliderValue,
      localSubjects,
      fetchSubjects,
      submittedSliderValue,
      handleSelectedSubjectUpdate,
      chartData
    };
  },
});
</script>
