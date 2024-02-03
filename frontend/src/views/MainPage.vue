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
      @additionalSelectedSubject="addWatchedSubject"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import {
  getSubjects,
  getMySubjects,
  getEntries,
  followSubject,
  unfollowSubject,
  setEntry,
  createUser,
} from "../api/api";
import DropdownSubjects from "../components/DropdownSubjects.vue";
import DropdownPersonalSubjects from "../components/DropdownPersonalSubjects.vue";
import LineGraph from "../components/LineGraph.vue";
import { ApiResponse } from "../interfaces/interfaces"

const sliderValue = ref<number>(50);
const submittedSliderValue = ref<number>(50);
const localSubjects = ref<string[]>([]);
const personalSubjects = ref<string[]>([])
const chartData = ref() // Will be changed with new interface

// Methods
async function getUserSubjects(userId: string) {
  try {
    // Ideally as type ApiResponse<string[]>
    const apiResponse: ApiResponse<string[]> = await getMySubjects(userId);

    if (apiResponse) {
      // Extract the array of strings
      const subjectsArray: string[] = apiResponse.data as string[];

      // Assign the value to localSubjects
      personalSubjects.value = subjectsArray;
    } else {
      // Handle the case when the API call is not successful
      console.error('Failed to get subjects.');
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function addStaticEntry() {
  const result = await setEntry("1", "Algebra I", 55);
  console.log(result);
}

async function addWatchedSubject(subjectName: string) {
  const result = await followSubject("Hjalmar", subjectName);
  console.log(result);
}

async function fetchSubjects() {
  try {
    // Ideally should be type ApiResponse<string[]>
    const apiResponse: ApiResponse<string[]> = await getSubjects();

    // Check if the ApiResponse was successful before extracting the value
    if (apiResponse) {
      // Extract the array of strings
      const subjectsArray: string[] = apiResponse.data as string[];

      // Assign the value to localSubjects
      localSubjects.value = subjectsArray;
    } else {
      // Handle the case when the API call is not successful
      console.error('Failed to get subjects.');
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function handleSelectedSubjectUpdate(subject: string) {
  try {
    // Will be changed with new interface
    //chartData.value = await getSubjectData(subject);
  } catch (error) {
    console.error("Error while fetching subject data:", error);
  }
}


</script>

