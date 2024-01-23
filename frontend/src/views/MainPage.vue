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
    <button @click="getUserSubjects('Hjalmar')">User</button>
    <button @click="addWatchedSubject('Matemaatiline maailmapilt')">
      Add subject
    </button>
    <DropdownSubjects
      :subjects="localSubjects"
      @newSelectedSubject="handleSelectedSubjectUpdate"
    />
    <DropdownPersonalSubjects
      :personalSubjects="personalSubjects"
      @addSelectedSubject="addWatchedSubject"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import {
  getSubjects,
  postPersonalSubjects,
  addPersonalSubject,
  addEntry,
} from "../api/api";
import DropdownSubjects from "../components/DropdownSubjects.vue";
import DropdownPersonalSubjects from "../components/DropdownPersonalSubjects.vue";
import LineGraph from "../components/LineGraph.vue";

const sliderValue = ref<number>(50);
const submittedSliderValue = ref<number>(50);
const localSubjects = ref<string[]>([]);
const personalSubjects = ref<string[]>([])
const chartData = ref() // Will be changed with new interface

// Methods
const getUserSubjects = async (userId: string) => {
  try {
    // Will be changed with new interface
    console.log(userId)
    personalSubjects.value = await getSubjects();
  } catch (error) {
    console.error("Error:", error);
  }
};
const addStaticEntry = async () => {
  const result = await addEntry("1", "Algebra I", 55);
  console.log(result);
};
const addWatchedSubject = async (subjectName: string) => {
  const result = await addPersonalSubject("Hjalmar", subjectName);
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
    // Will be changed with new interface
    //chartData.value = await getSubjectData(subject);
  } catch (error) {
    console.error("Error while fetching subject data:", error);
  }
};

</script>

