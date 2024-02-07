<template>
  <div class="dropdown">
    <button 
      id="dropbtn" 
      :class="{ active: isDropdownVisible}"
      @click="toggleMenu">
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
        placeholder="🔍" />
      <div class="scrollable-content">
        <button
          v-for="subjectItem in filteredSubjects"
          :key="subjectItem.text"
          :style="{ display: subjectItem.display }"
          class="menubtn"
          @click="addFollowedSubject(subjectItem.text)">
          {{ subjectItem.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Script in Composition API
import { ref, computed } from "vue";
import { api } from "@/api/api";

import LoaderComponent from "@/components/LoaderComponent.vue";
import { Subject } from "@/api/types";

const filter = ref<string>("");
const isDropdownVisible = ref(false);
const allSubjects = ref([] as string[]);
let isLoading = ref<boolean>(false);
// Filtering subjects according to search-bar input
const filteredSubjects = computed(function() {
  const filterText = filter.value.toUpperCase();
  return allSubjects.value.map(function(subject) {
    return {
      text: subject,
      display: subject.toUpperCase().includes(filterText) ? "block" : "none",
    };
  });
});

async function toggleMenu() {
  if (!isDropdownVisible.value) {
    isLoading.value = true;
    filter.value = "";
    await getAllSubjects();
  }
  isLoading.value = false;
  isDropdownVisible.value = !isDropdownVisible.value;
}

async function getAllSubjects() {
  try {
    const subjects: Subject[] = await api.getSubjectsAll();
    // Check if the ApiResponse is not null before extracting the value
    if (subjects) {
      // Extract the array of strings
      allSubjects.value = subjects;
    } else {
      console.error("Failed to get subjects.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function addFollowedSubject(subjectName: string) {
  await api.followSubject(subjectName);
}
</script>

<style scoped>
@import "@/styles/colors/colors.css";
@import "@/styles/DropdownStyles/dropdownBtnStyle.css";
</style>

