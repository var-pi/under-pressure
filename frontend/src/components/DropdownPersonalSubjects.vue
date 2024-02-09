<template>
  <div id="personal-subjects" class="dropdown">
    <div id="wrapper">
      <button
        id="dropbtn"
        class="default button"
        :class="{ open: isDropdownVisible || isLoading }"
        @click="toggleMenu"
      >
        Minu õppeained
      </button>
      <div class="dropdown-content default">
        <LoaderComponent :loading="isLoading" />
        <div id="content-wrapper" v-if="isDropdownVisible">
          <div id="content-with-subjects" v-if="personalSubjects.length > 0">
            <input
              id="search-bar"
              v-model="filter"
              type="text"
              placeholder="Otsi..."
            />
            <div class="scrollable-content">
              <div
                v-for="subjectItem in filteredSubjects"
                :key="subjectItem.text"
              >
                <div
                  class="subject-line-wrapper default"
                  :style="{ display: subjectItem.display }"
                >
                  <button
                    :key="subjectItem.text"
                    class="menubtn button default"
                    @click="
                      emits('handleSelectedSubjectUpdate', subjectItem.text)
                    "
                  >
                    {{ subjectItem.text }}
                  </button>
                  <button
                    class="unfollow-btn button default emoji"
                    @click="handleUnfollow(subjectItem.text)"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-else id="no-personal-subjects" class="default">
            Jälgitavaid aineid saad lisada sätetes. ⚙️
          </div>
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
      display: subject.toUpperCase().includes(filterText) ? "flex" : "none",
    };
  });
});

async function toggleMenu() {
  if (!isDropdownVisible.value) {
    isLoading.value = true;
    filter.value = "";
    await getPersonalSubjects();
    isLoading.value = false;
  }
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

