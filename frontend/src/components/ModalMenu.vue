<template>
  <div v-if="props.isOpen" class="modal-mask">
    <div ref="target" class="modal-container">
      <div class="modal-header">
        <p>Vali õppeaineid</p>
      </div>
      <DropdownMenu
        :is-loading="!showScrollableSubjects"
        :is-dropdown-visible="showScrollableSubjects"
        :menu-items="allSubjects"
        class="modal-body"
      >
        <template #default="{ item }">
          <div class="menu-line-wrapper">
            <DefaultButton class="menubtn" @click="toggleFollowStatus(item)">
              {{ item }}
            </DefaultButton>
            <DefaultButton
              v-if="personalSubjects.has(item)"
              class="optional-menu-btn emoji"
              content="item in followed Subjects"
            >
              ✔
            </DefaultButton>
            <DefaultButton v-else class="optional-menu-btn emoji">
              ✖
            </DefaultButton>
          </div>
        </template>
      </DropdownMenu>
      <div class="modal-footer">
        <slot name="footer"> </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";
import { onClickOutside } from "@vueuse/core";
import { api } from "@/api/api";

import DropdownMenu from "@/components/DropdownMenu.vue";
import { Subject } from "@/api/types";
import DefaultButton from "@/components/buttons/DefaultButton.vue";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["modal-close"]);

const target = ref(null);
onClickOutside(target, () => emit("modal-close"));

const isDropdownVisible = ref(false);
const allSubjects = ref([] as string[]);
const personalSubjects = ref(new Set());
let showScrollableSubjects = ref<boolean>(false);

async function toggleAllSubjects() {
  if (!isDropdownVisible.value) {
    showScrollableSubjects.value = false;
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await getAllSubjects();
    await getPersonalSubjects();
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

async function getPersonalSubjects() {
  try {
    const subjects: Subject[] = await api.getSubjects();
    // Check if the ApiResponse is not null before extracting the value
    if (subjects) {
      // Extract the array of strings
      personalSubjects.value = new Set(subjects);
      console.log(personalSubjects);
    } else {
      console.error("Failed to get subjects.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

const toggleFollowStatus = (text: string) => {
  if (personalSubjects.value.has(text)) {
    handleUnfollow(text);
    personalSubjects.value.delete(text);
  } else {
    addFollowedSubject(text);
    personalSubjects.value.add(text);
  }
};

async function addFollowedSubject(subjectName: string) {
  await api.followSubject(subjectName);
}

async function handleUnfollow(subjectItem: string) {
  await api.unfollowSubject(subjectItem);
  await getPersonalSubjects;
}

watch(() => props.isOpen, toggleAllSubjects);
</script>

<style scoped lang="scss">
@import "@/styles/colors/colors.css";
@import "@/styles/fontStyles.css";
@import "@/styles/default";

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
@media only screen and (max-width: 500px) {
  .modal-container {
    max-width: 300px;
  }
}
@media only screen and (max-width: 300px) {
  .modal-container {
    max-width: 200px;
    padding: 5px 7px;
  }
}
.modal-header {
  @include default;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.modal-header > p {
  font-size: 18px;
  color: var(--col-fg-default);
}
.modal-body {
  --row-height: 48px;
}
.scrollable-content {
  max-height: 450px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.scrollable-content::-webkit-scrollbar {
  display: none;
}

@media screen and (max-width: 2200px) {
  .scrollable-content {
    max-height: var(--width-l); /* TODO */
  }
}

@media screen and (max-width: 900px) {
  .scrollable-content {
    max-height: var(--width-m);
  }
}

@media screen and (max-width: 550px) {
  .scrollable-content {
    max-height: var(--width-s);
  }
}
#close-btn {
  margin-left: auto;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.menu-line-wrapper {
  @include default;
  position: relative;
  height: var(--row-height);
  border-radius: 0 !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: none !important;
}
.menubtn {
  width: 100%;
  height: 100%;
  border-radius: 0px !important;
  text-indent: 16px;
  border: none !important;
}
.optional-menu-btn {
  position: absolute;
  right: 0;
  height: 100%;
  width: 48px;
  border-radius: 0px !important;
  border: none !important;
  opacity: 1;
}
</style>

