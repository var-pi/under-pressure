<template>
  <div id="contents">
    <LineGraph
      :new-selected-subject="newSelectedSubject" />
    <button id="fetch-subjects" @click="fetchSubjects">
      Fetch Subjects
    </button>
    <button @click="addEntry()">
      Sisesta
    </button>
    <button id="fetch-subjects" @click="fetchSubjects">Fetch Subjects</button>
    <button @click="getUserSubjects()">Fetch User Subjects</button>
    <button @click="followAlgebraI('Algebra I')">Follow Algebr I</button>
    <DropdownSubjects
      :subjects="allSubjects"
      @new-selected-subject="followAlgebraI"
    />
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
import { ApiResponse, subject } from "@/api/types";

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
    const apiResponse: ApiResponse<subject[]> = await getMySubjects();

    // Check if the ApiResponse is not null before extracting the value
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

async function followAlgebraI(subjectName: string) {
  await followSubject(subjectName);
}

async function unfollowAlgebraI(subjectName: string) {
  await unfollowSubject(subjectName);
}

function updateSelectedSubject(subject: string) {
  newSelectedSubject.value = subject;
}

</script>

../api/api

