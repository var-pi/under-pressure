<template>
  <div id="contents">
    <LineGraph
      :new-selected-subject="newSelectedSubject" />
    <button id="fetch-subjects" @click="getAllSubjects">
      Fetch Subjects
    </button>
    <button @click="getUserSubjects(3)">
      User
    </button>
    <button @click="addFollowedSubject('Algebra I')">
      Add subject
    </button>
    <DropdownSubjects
      :subjects="allSubjects"
      @new-selected-subject="addFollowedSubject" />
    <DropdownPersonalSubjects
      :personal-subjects="personalSubjects"
      @handle-selected-subject-update="updateSelectedSubject" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  getSubjects,
  getMySubjects,
  followSubject,
  unfollowSubject,
} from "../api/api";
import DropdownSubjects from "../components/DropdownSubjects.vue";
import DropdownPersonalSubjects from "../components/DropdownPersonalSubjects.vue";
import LineGraph from "../components/LineGraph.vue";
import { ApiResponse } from "../interfaces/interfaces"

const allSubjects = ref<string[]>([]);
const personalSubjects = ref<string[]>([]);
const newSelectedSubject = ref("")

// Methods
async function getAllSubjects() {
  try {
    // Ideally should be type ApiResponse<string[]>
    const apiResponse: ApiResponse<String[]> = await getSubjects();

    // Check if the ApiResponse is not null before extracting the value
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

async function getUserSubjects(userId: number) {
  try {
    // Ideally as type ApiResponse<string[]>
    const apiResponse: ApiResponse<String[]> = await getMySubjects(userId);    

    // Check if the ApiResponse is not null before extracting the value
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

async function addFollowedSubject(subjectName: string) {
  const result = await followSubject(3, subjectName);
  console.log(result);
}

function updateSelectedSubject(subject: string) {
  newSelectedSubject.value = subject;
}
</script>