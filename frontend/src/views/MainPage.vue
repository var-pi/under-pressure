<template>
  <div id="contents">
    <LineGraph
      :newStressValue="submittedSliderValue"
      :chartData="chartData"
    ></LineGraph>
    <input type="range" id="slider" :min="0" :max="100" v-model="sliderValue" />
    <label for="slider">{{ sliderValue }}</label>
    <button id="fetch-subjects" @click="fetchSubjects">Fetch Subjects</button>
    <button @click="addEntry()">Sisesta</button>
    <button @click="getUserSubjects('Hjalmar')">User</button>
    <button @click="addFollowedSubject('Matemaatiline maailmapilt')">
      Add subject
    </button>
    <DropdownSubjects
      :subjects="allSubjects"
      @newSelectedSubject="addFollowedSubject"
    />
    <DropdownPersonalSubjects
      :personalSubjects="personalSubjects"
      @handleSelectedSubjectUpdate="getSubjectEntries"
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
let submittedSliderValue = 50;
const allSubjects = ref<string[]>([]);
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

      // Assign the value to allSubjects
      personalSubjects.value = subjectsArray;
    } else {
      // Handle the case when the API call is not successful
      console.error('Failed to get subjects.');
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function addEntry() {
  try {
    const result = await setEntry("1", "Algebra I", sliderValue.value);
    if (result.status == "success") {
      // Updates after change. Needs to be fixed
      submittedSliderValue = sliderValue.value;
      sliderValue.value = 50;
      console.log("Successfully added entry:", result.message);
    } else {
      console.log("Failed adding entry:", result.message);
    }
  } catch (error) {
    console.error("Error adding entry:", error);
  }
}

async function addFollowedSubject(subjectName: string) {
  const result = await followSubject("1", subjectName);
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

      // Assign the value to allSubjects
      allSubjects.value = subjectsArray;
    } else {
      // Handle the case when the API call is not successful
      console.error("Failed to get subjects.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getSubjectEntries(subject: string) {
  try {
    // Fetch entries for the selected subject TODO: make dynamic
    const result = await getEntries("1", subject);

    if (result.status == "success") {
      chartData.value = result.data;
      console.log("Successfully fetched entries.", result.message);
    } else {
      console.log("Failed to get entries.", result.message);
    }
  } catch (error) {
    console.error("Error while fetching subject data:", error);
  }
}
</script>