<!-- MainPage.vue -->
<template>
  <div id="contents">
    <LineGraph
      :newStressValue="submittedSliderValue"
      :chartData="chartData"
    ></LineGraph>
    <input type="range" id="slider" :min="0" :max="100" v-model="sliderValue" />
    <label for="slider">{{ sliderValue }}</label>
    <button id="fetch-subjects" @click="fetchSubjects">Fetch Subjects</button>
    <button @click="submittedSliderValue = sliderValue">Sisesta</button>
    <button @click="addStaticEntry">Lisa</button>
    <button @click="getSubjectData('1')">User</button>
    <button @click="addWatchedSubject('1', 'Matemaatiline maailmapilt')">
      Add subject
    </button>
    <DropdownSubjects
      :subjects="localSubjects"
      @update:selectedSubject="handleSelectedSubjectUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, PropType, defineProps } from "vue";
import {
  getSubjects,
  postPersonalSubjects,
  addPersonalSubject,
  addEntry,
} from "../api/api";
import DropdownSubjects from "../components/DropdownSubjects.vue";
import LineGraph from "../components/LineGraph.vue";

// setup(props: MainPageProps) {
const sliderValue = ref<number>(50);
const submittedSliderValue = ref<number>(50); // Initialize it with the default value or any other value you want
const localSubjects = ref<string[]>([]); // Copy the props to local state
// props.subjects.slice()
const chartData = ref();

// Methods
const getSubjectData = async (userId: string) => {
  const subjects = await postPersonalSubjects(userId);
  console.log("Siit", subjects);
};
const addStaticEntry = async () => {
  const result = await addEntry("1", "Algebra I", 55);
  console.log(result);
};
const addWatchedSubject = async (userId: string, subjectName: string) => {
  const result = await addPersonalSubject(userId, subjectName);
  console.log(result);
};
const fetchSubjects = async () => {
  try {
    localSubjects.value = await getSubjects();
  } catch (error) {
    console.error("Error:", error);
  }
};
const handleSelectedSubjectUpdate = async (subject: string) => {
  try {
    const item = await getSubjectData(subject);
    chartData.value = item;
  } catch (error) {
    console.error("Error while fetching subject data:", error);
  }
};
</script>

