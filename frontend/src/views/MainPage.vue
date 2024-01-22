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
    const fetchSubjectData = async (subject: string) => {
      try {        
        //const response = await fetch('https://6296-2001-7d0-87fb-e800-ca6f-49a2-39c7-4844.ngrok-free.app/subjects', {
        const response = await fetch('http://localhost:8080/entries.json', {
          method: 'GET',
        });
        const data = await response.json()
        // Check if data is an array
        if (Array.isArray(data)) {
          const matchingItem = data.find((item) => {
            return item && item.subject && item.subject === subject;
          });

          if (matchingItem) {
            return matchingItem;
          } else {
            console.log("No matching item found for subject:", subject);
            return null; // or handle the case when no match is found
          }
        } else {
          console.error('Error: Data is not an array');
          return null; // or handle the case when data is not an array
        }
      } catch (error) {
        console.error('Error:', error);
        return null; // or handle the error case
      }
    };

    const handleSelectedSubjectUpdate = async (subject: string) => {
      try {
        // You can update any other local state or perform additional actions if needed
        const item = await fetchSubjectData(subject);
        
        chartData.value = item;        

        // Continue with additional logic using the fetched item
      } catch (error) {
        // Handle errors if needed
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
