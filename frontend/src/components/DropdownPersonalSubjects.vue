<template>
  <div class="dropdown">
    <button
      id="dropbtn"
      class="default button"
      :class="{ active: isDropdownVisible }"
      @click="toggleMenu"
    >
      My subjects
    </button>
    <LoaderComponent :loading="isLoading" />
    <div v-if="isDropdownVisible" class="dropdown-content default">
      <input id="search-bar" v-model="filter" type="text" placeholder="🔍" />
      <div class="scrollable-content">
        <div
          v-for="subjectItem in filteredSubjects"
          :key="subjectItem.text"
          class="btn-line"
        >
          <button
            :key="subjectItem.text"
            :style="{ display: subjectItem.display }"
            class="menubtn button default"
            @click="emits('handleSelectedSubjectUpdate', subjectItem.text)"
          >
            {{ subjectItem.text }}
          </button>
          <button
            class="unfollow-btn button default"
            :style="{ display: subjectItem.display }"
            @click="handleUnfollow(subjectItem.text)"
          >
            Unfollow
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from "vue";
import { api } from "@/api/api";

import LoaderComponent from "@/components/LoaderComponent.vue";
import { Subject } from "@/api/types";

const emits = defineEmits(["handleSelectedSubjectUpdate"]);

const filter = ref("");
const isDropdownVisible = ref(false);
const personalSubjects = ref([] as string[]);
let isLoading = ref<boolean>(false);
// Filtering subjects according to search-bar input
const filteredSubjects = computed(function () {
  const filterText = filter.value.toUpperCase();
  return personalSubjects.value.map(function (subject) {
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
    await getPersonalSubjects();
  }
  isLoading.value = false;
  isDropdownVisible.value = !isDropdownVisible.value;
}

async function getPersonalSubjects() {
  try {
    const subjects: Subject[] = await api.getSubjects();
    // Check if the ApiResponse is not null before extracting the value
    if (subjects) {
      // Extract the array of strings
      personalSubjects.value = subjects;
    } else {
      console.error("Failed to get subjects.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function handleUnfollow(subjectItem: string) {
  await api.unfollowSubject(subjectItem);
  await getPersonalSubjects;
}
</script>

<style scoped>
@import "@/styles/colors/colors.css";
@import "@/styles/DropdownStyles/dropdownBtnStyle.css";
@import "@/styles/button.css";
</style>

