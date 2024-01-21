<!-- MainPage.vue -->
<template>
  <div id="contents">
    <LineGraph :newStressValue="submittedSliderValue"></LineGraph>
    <input type="range" id="slider" :min="0" :max="100" v-model="sliderValue" />
    <label for="slider">{{ sliderValue }}</label>
    <button @click="fetchSubjects">Fetch Subjects</button>
    <button @click="submittedSliderValue = sliderValue">Sisesta</button>
    <DropdownSubjects :subjects="subjects" />
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
    const subjects = ref(props.subjects);
    const sliderValue = ref(50);
    const submittedSliderValue = ref(50); // Initialize it with the default value or any other value you want


    // Methods
    const fetchSubjects = async () => {
      console.log('Fetching subjects');
      try {
        const response = await fetch('https://1403-2001-bb8-2002-98-bdb3-dd6f-41d1-b4f3.ngrok-free.app', {
          method: 'GET',
        });
        const data = await response.json();
        const newData = data.data
          .map((item: any) => item.value.match(/\(\d+,"([^"]+)"\)/))
          .filter((matches: RegExpMatchArray | null) => matches && matches[1] !== undefined)
          .map((matches: RegExpMatchArray) => matches[1]);

        subjects.value = newData;
        
      } catch (error) {
        console.error('Error:', error);
      }
    };

    return {
      sliderValue,
      fetchSubjects,
      submittedSliderValue,
    };
  },
});
</script>
