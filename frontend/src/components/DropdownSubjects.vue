<template>
  <div class="dropdown">
    <button id="dropbtn" @click="toggleMenu">
      Subjects
    </button>
    <LoaderComponent 
      :loading="isLoading" />
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
          v-for="subjectItem in allSubjects"
          :key="subjectItem"
          class="menubtn"
          @click="addFollowedSubject(subjectItem)">
          {{ subjectItem }}
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
import LoaderComponent from "@/components/LoaderComponent.vue";
import { ApiResponse, Subject } from "@/api/types";

const filter = ref<string>("");
const isDropdownVisible = ref(false);
const allSubjects = ref([] as string[]);
let isLoading = ref<boolean>(false);

async function toggleMenu() {
  if (!isDropdownVisible.value) {
    isLoading.value = true;
    await getAllSubjects();
  }
  isLoading.value = false;
  isDropdownVisible.value = !isDropdownVisible.value;
}

async function getAllSubjects() {
  try {
    const apiResponse: ApiResponse<Subject[]> = await getSubjects();
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
@import "@/styles/colors/colors.css";
@import "@/styles/DropdownStyles/dropdownBtnStyle.css";

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
.menubtn {
  width: 180px;
}
#search-bar {
  width: 190px;
}
</style>
