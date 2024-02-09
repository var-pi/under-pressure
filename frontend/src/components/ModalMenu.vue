<template>
  <div v-if="props.isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div ref="target" class="modal-container">
        <div class="modal-header">
          <button id="close-btn" @click.stop="emit('modal-close')">
            X
          </button>
        </div>
        <div class="modal-body">
          <LoaderComponent 
            :loading="isLoading"
          />
          <div
            v-if="!isLoading"
            class="dropdown-content"
          >
            <input
              id="search-bar"
              v-model="filter"
              type="text"
              placeholder="Otsi"
            />
            <div class="scrollable-content">
              <button
                v-for="subjectItem in filteredSubjects"
                :key="subjectItem.text"
                :style="{ display: subjectItem.display }"
                class="menu-btn"
                @click="addFollowedSubject(subjectItem.text)"
              >
                {{ subjectItem.text }}
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <slot name="footer">
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits, watch } from "vue";
import { onClickOutside } from '@vueuse/core';
import { api } from "@/api/api";

import LoaderComponent from "@/components/LoaderComponent.vue";
import { Subject } from "@/api/types";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["modal-close"]);

const target = ref(null)
onClickOutside(target, ()=>emit('modal-close'))

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

async function toggleAllSubjects() {
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

watch(() => props.isOpen, toggleAllSubjects);

</script>

<style scoped>
@import "@/styles/colors/colors.css";
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-container {
  width: 400px;
  margin: 20vh auto;
  padding: 20px 30px;
  background-color: var(--col-3);
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
.modal-header {
  display: flex;
  justify-content: center;
}
.modal-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 30px 10px 30px;
}
.scrollable-content {
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.scrollable-content::-webkit-scrollbar {
    display: none;
}
.dropdown-content {
  justify-content: center;
  width: 340px;
}
#search-bar {
  width: 332px;
}
.menu-btn {
  width: 340px;
}
#close-btn {
  margin-left: auto;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>