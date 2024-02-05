<template>
  <div id="contents">
    <LineGraph :new-stress-value="submittedSliderValue" :chart-data="chartData">
    </LineGraph>
    <input id="slider" v-model="sliderValue" type="range" :min="0" :max="100" />
    <label for="slider">
      {{ sliderValue }}
    </label>
    <button id="fetch-subjects" @click="fetchSubjects">Fetch Subjects</button>
    <button @click="getUserSubjects()">Fetch User Subjects</button>
    <button @click="followAlgebraI('Algebra I')">Follow Algebr I</button>
    <button @click="unfollowAlgebraI('Algebra I')">Unfollow Algebra I</button>
    <button @click="setEntryForAlgebraI()">Set Entry For Algebra I</button>
    <button @click="getEntriesOfAlgebraI()">Get Entries Of Algebra I</button>
    <DropdownSubjects
      :subjects="allSubjects"
      @new-selected-subject="followAlgebraI"
    />
    <DropdownPersonalSubjects
      :personal-subjects="personalSubjects"
      @handle-selected-subject-update="getSubjectEntries"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  getSubjects,
  getMySubjects,
  followSubject,
  unfollowSubject,
  getEntries,
  setEntry,
} from "../api/api";
import DropdownSubjects from "../components/DropdownSubjects.vue";
import DropdownPersonalSubjects from "../components/DropdownPersonalSubjects.vue";
import LineGraph from "../components/LineGraph.vue";
import { ApiResponse, subject } from "@/api/types";

const sliderValue = ref<number>(50);
let submittedSliderValue = 50;
const allSubjects = ref<string[]>([]);
const personalSubjects = ref<string[]>([]);
const chartData = ref(); // Will be changed with new interface

// Methods
async function getUserSubjects() {
  try {
    // Ideally as type ApiResponse<string[]>
    const apiResponse: ApiResponse<subject[]> = await getMySubjects();

    if (apiResponse) {
      // Extract the array of strings
      const subjectsArray: string[] = apiResponse.data as string[];

      // Assign the value to allSubjects
      personalSubjects.value = subjectsArray;
    } else {
      // Handle the case when the API call is not successful
      console.error("Failed to get subjects.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function setEntryForAlgebraI() {
  try {
    const result = await setEntry("Algebra I", sliderValue.value);
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

async function followAlgebraI(subjectName: string) {
  await followSubject(subjectName);
}

async function unfollowAlgebraI(subjectName: string) {
  await unfollowSubject(subjectName);
}

async function fetchSubjects() {
  try {
    // Ideally should be type ApiResponse<string[]>
    const apiResponse: ApiResponse<subject[]> = await getSubjects();

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

async function getEntriesOfAlgebraI() {
  try {
    // Fetch entries for the selected subject TODO: make dynamic
    const result = await getEntries("Algebra I");

    if (result.status == "success") {
      console.log("Successfully fetched entries.", result.data);
    } else {
      console.log("Failed to get entries.", result.message);
    }
  } catch (error) {
    console.error("Error while fetching subject data:", error);
  }
}

async function getSubjectEntries(subject: string) {
  try {
    // Fetch entries for the selected subject TODO: make dynamic
    const result = await getEntries(subject);

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

../api/api

