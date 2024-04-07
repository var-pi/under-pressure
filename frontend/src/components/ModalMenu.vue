<template>
  <div v-if="isOpened" id="mask">
    <OnClickOutside @trigger="isOpened = false">
      <div id="container">
        <div id="header">Vali õppeaineid</div>
        <DropdownMenu
          id="body"
          v-slot="{ item }"
          :is-loading
          :is-opened
          :items="subjects.all"
        >
          <div class="line-wrapper">
            <DefaultButton class="main-btn" @click="toggleFollowStatus(item)">
              {{ item }}
            </DefaultButton>
            <DefaultButton
              v-if="subjects.personal.includes(item)"
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
import { api } from "@/api/api";

import DropdownMenu from "@/components/DropdownMenu.vue";
import { Subject } from "@/api/types";
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import BasicIcon from "@/components/BasicIcon.vue";

const isOpened = defineModel<boolean>("isOpened", { required: true });

const subjects = ref({ all: [] as Subject[], personal: [] as Subject[] });
const isLoading = ref(false);

function fetchSubjectsIfNeeded() {
  if (isOpened.value && subjects.value.all.length == 0) fetchSubjects();
}

async function fetchSubjects() {
  isLoading.value = true;

  const [allSubjects, personalSubjects] = await Promise.all([
    api.getSubjectsAll(),
    api.getSubjects(),
  ]);

  subjects.value.all = allSubjects;
  subjects.value.personal = personalSubjects;

  isLoading.value = false;
}

function toggleFollowStatus(subject: Subject) {
  if (subjects.value.personal.includes(subject)) unfollow(subject);
  else follow(subject);
}

function follow(subject: Subject) {
  subjects.value.personal.push(subject);
  api.followSubject(subject);
}

function unfollow(subject: Subject) {
  const index = subjects.value.personal.indexOf(subject);
  subjects.value.personal.splice(index, 1);
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

#container {
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
}

#header {
  @include default;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  height: var(--default-size);
}

#body {
  .line-wrapper {
    @include default;
    position: relative;
    height: var(--default-size);
    border-radius: 0 !important;
    border-left: none !important;
    border-right: none !important;
    border-bottom: none !important;
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
</style>
