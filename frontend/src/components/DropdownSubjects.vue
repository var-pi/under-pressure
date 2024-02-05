<template>
  <div class="dropdown">
    <button id="dropbtn" @click="toggleMenu">
      Subjects
    </button>
    <div
      v-if="isDropdownVisible"
      class="dropdown-content">
      <input
        id="search-bar"
        v-model="filter"
        type="text"
        placeholder="Otsi" />
      <div class="scrollable-content">
        <button
          v-for="subject in allSubjects"
          :key="subject"
          class="menubtn"
          @click=addFollowedSubject(subject)>
          {{ subject }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Script in Composition API
import { ref } from "vue";
import {
  getSubjects,
  followSubject,
} from "@/api/api";
import { ApiResponse, subject } from "@/api/types";

const filter = ref<string>("");
const isDropdownVisible = ref(false);
let allSubjects = ref([] as string[]);

async function toggleMenu() {
  if (!isDropdownVisible.value) {
    getAllSubjects();
  }
  isDropdownVisible.value = !isDropdownVisible.value;
}

async function getAllSubjects() {
  try {
    const apiResponse: ApiResponse<subject[]> = await getSubjects();
    // Check if the ApiResponse is not null before extracting the value
    if (apiResponse) {
      // Extract the array of strings
      allSubjects.value = apiResponse.data as string[];
    } else {
      console.error("Failed to get subjects.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function addFollowedSubject(subjectName: string) {
  await followSubject(subjectName);
}
</script>

<style scoped>
.dropdown-content {
  width: 200px;
  align-self: center;
}
.scrollable-content {
  max-height: 200px;
  overflow-y: scroll;
}
.dropdown {
  display: flex;
  flex-direction: column;
  align-content: center;
}
#dropbtn {
  width: 200px;
  align-self: center;
}
.menubtn {
  width: 180px;
}
#search-bar {
  width: 190px;
}
</style>
