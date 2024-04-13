<template>
  <div v-show="isOpened" id="mask">
    <OnClickOutside @trigger="isOpened = false">
      <div id="modal-container" :class="{ loading: isLoading }">
        <div id="header">Vali õppeaineid</div>
        <DropdownMenu
          v-slot="{ item, index }"
          :is-loading
          :is-opened
          :items="subjectStore.subjects.all"
          :max-visible="2.5"
        >
          <div class="line-wrapper" :class="{ first: index == 0 }">
            <DefaultButton class="main-btn" @click="toggleFollowStatus(item)">
              {{ item }}
            </DefaultButton>
            <DefaultButton
              v-if="subjectStore.subjects.personal.includes(item)"
              class="side-btn"
            >
              <BasicIcon name="check.png" alt="✔" />
            </DefaultButton>
          </div>
        </DropdownMenu>
      </div>
    </OnClickOutside>
  </div>
</template>

<script setup lang="ts">
import { ref, defineModel, watch } from "vue";
import { OnClickOutside } from "@vueuse/components";
import { api } from "@/api";

import DropdownMenu from "@/components/DropdownMenu.vue";
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import BasicIcon from "@/components/BasicIcon.vue";

import { useSubjectStore } from "@/stores/subject";

const isOpened = defineModel<boolean>("isOpened", { required: true });
const isLoading = ref(false);

const subjectStore = useSubjectStore();

function fetchSubjectsIfNeeded() {
  if (isOpened.value && subjectStore.subjects.all.length == 0) fetchSubjects();
}

async function fetchSubjects() {
  isLoading.value = true;

  const [allSubjects, personalSubjects] = await Promise.all([
    api.getSubjectsAll(),
    api.getSubjects(),
  ]);

  subjectStore.subjects.all = allSubjects;
  subjectStore.subjects.personal = personalSubjects;

  isLoading.value = false;
}

function toggleFollowStatus(subject: string) {
  if (subjectStore.subjects.personal.includes(subject)) unfollow(subject);
  else follow(subject);
}

function follow(subject: string) {
  subjectStore.subjects.personal.push(subject);
  api.followSubject(subject);
}

function unfollow(subject: string) {
  const index = subjectStore.subjects.personal.indexOf(subject);
  subjectStore.subjects.personal.splice(index, 1);
  api.unfollowSubject(subject);
}

watch(() => isOpened.value, fetchSubjectsIfNeeded);
</script>

<style scoped lang="scss">
@import "@/styles/default";
@import "@/styles/font";

#mask {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

#modal-container {
  @include default;
  display: block;
  position: fixed;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  border: none;
  min-width: max-content;
  width: 400px;
  max-width: 95vw;
  background-color: var(--col-bg-default);

  .line-wrapper {
    @include default;
    position: relative;
    height: var(--default-size);
    border-radius: 0 !important;
    border-left: none !important;
    border-right: none !important;
    border-bottom: none !important;
    &.first {
      border-top: none !important;
    }
  }
  .main-btn {
    @include default-font;
    width: 100%;
    height: 100%;
    border-radius: 0px !important;
    border: none !important;
  }
  .side-btn {
    position: absolute;
    right: 0;
    aspect-ratio: 1;
    height: 100%;
    border-radius: 0px !important;
    border: none !important;
  }
}

#header {
  @include default;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  height: var(--default-size);
}

#modal-container:not(.loading) #header {
  border-bottom: none;
}
</style>
