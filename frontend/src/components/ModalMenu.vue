<template>
  <div v-if="props.isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div ref="target" class="modal-container">
        <div class="modal-header">
          <button id="close-btn" @click.stop="emit('modal-close'); showScrollableSubjects = false">
            X
          </button>
        </div>
        <div class="modal-body">
          <div id="wrapper">
            <LoaderComponent 
              :loading="!showScrollableSubjects"
            />
            <DropdownMenu 
              :is-dropdown-visible="showScrollableSubjects"
              :menu-items="allSubjects">
              <template v-slot="{ item }">
                <button
                  :style="{ display: item.display }"
                  class="menubtn button default"
                  @click="addFollowedSubject(item.text)"
                >
                  {{ item.text }}
                </button>
              </template>
            </DropdownMenu>
          </div>
          </div>
        </div>
        <div class="modal-footer">
          <slot name="footer">
          </slot>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";
import { onClickOutside } from '@vueuse/core';
import { api } from "@/api/api";

import LoaderComponent from "@/components/LoaderComponent.vue";
import DropdownMenu from "@/components/DropdownMenu.vue";
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
let showScrollableSubjects = ref<boolean>(false);

async function toggleAllSubjects() {
  if (!isDropdownVisible.value) {
    showScrollableSubjects.value = false;
    filter.value = "";
    await getAllSubjects();
  }
  showScrollableSubjects.value = true;
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
@import "@/styles/fontStyles.css";
@import "@/styles/DropdownStyles/dropdownBtnStyle.css";
@import "@/styles/button.css";
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
  background-color: var(--col-bg-default);
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
  max-height: 450px;
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.dropdown-content {
  justify-content: center;
  width: 340px;
}
#close-btn {
  margin-left: auto;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.menubtn {
  width: 100%;
  height: var(--row-height);
  border-radius: 0px;
  text-indent: 16px;
  border: none;
}
</style>