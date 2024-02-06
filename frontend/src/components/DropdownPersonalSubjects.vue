<template>
  <div class="dropdown">
    <button id="dropbtn" @click="toggleMenu">
      My subjects
    </button>
    <LoaderComponent 
      :loading="isLoading" />
    <div v-if="isDropdownVisible" class="dropdown-content">
      <input
        id="search-bar"
        v-model="filter"
        type="text"
        placeholder="Otsi" />
      <div class="scrollable-content">
        <div v-for="subjectItem in personalSubjects" :key="subjectItem" class="btn-line">
          <button
            class="menubtn"
            @click="emits('handleSelectedSubjectUpdate', subjectItem)">
            {{ subjectItem }}
          </button>
          <button
            class="unfollow-btn"
            @click="handleUnfollow(subjectItem)">
            Unfollow
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, defineEmits } from "vue";
import {
  getMySubjects,
  unfollowSubject,
} from "@/api/api";
import LoaderComponent from "@/components/LoaderComponent.vue";
import { ApiResponse, Subject } from "@/api/types";

const emits = defineEmits(["handleSelectedSubjectUpdate"]);

const filter = ref("");
const isDropdownVisible = ref(false);
const personalSubjects = ref([] as string[]);
let isLoading = ref<boolean>(false);

async function toggleMenu() {
  if (!isDropdownVisible.value) {
    isLoading.value = true;
    await getPersonalSubjects();
  }
  isLoading.value = false;
  isDropdownVisible.value = !isDropdownVisible.value;
}

async function getPersonalSubjects() {
  try {
    const apiResponse: ApiResponse<Subject[]> = await getMySubjects();
    // Check if the ApiResponse is not null before extracting the value
    if (apiResponse) {
      // Extract the array of strings
      personalSubjects.value = apiResponse.data as string[];
    } else {
      console.error("Failed to get subjects.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function handleUnfollow(subjectItem: string) {
  await unfollowSubject(subjectItem);
  await getPersonalSubjects;
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
}
#search-bar {
  width: 190px;
}
.menubtn {
  width: 150px
}
.unfollow-btn {
  width: 40px;
  font-size: 8px;
}
.btn-line {
  display: flex;
}
</style>