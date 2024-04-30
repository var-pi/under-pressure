<template>
  <div v-show="isOpened" id="mask">
    <OnClickOutside @trigger="isOpened = false">
      <div id="modal-container" :class="{ loading: isLoading }">
        <DropdownMenu
          :is-loading
          :is-opened
          :items="subjectStore.subjects.all"
          :priority-items="subjectStore.subjects.personal"
          :max-visible="10"
        >
          <template #head>
            <div id="header">Vali õppeaineid</div>
          </template>
          <template #priority-content="{ priorityItem, index}">
            <div class="line-wrapper" :class="{ first: index == 0 }">
              <DefaultButton
                class="main-btn chosen"
                @click="toggleFollowStatus(priorityItem)"
              >
                {{ priorityItem }}
              </DefaultButton>
            </div>
          </template>

          <template #content="{ item, index }">
            <div class="line-wrapper" :class="{ first: index == 0 && subjectStore.subjects.personal.length == 0}">
              <DefaultButton
                class="main-btn"
                :class="{
                  chosen: subjectStore.subjects.personal.includes(item),
                }"
                @click="toggleFollowStatus(item)"
              >
                {{ item }}
              </DefaultButton>
            </div>
          </template>
        </DropdownMenu>
      </div>
    </OnClickOutside>
  </div>
</template>

<script setup lang="ts">
import { ref, defineModel, watch, onMounted } from "vue";
import { OnClickOutside } from "@vueuse/components";
import { api } from "@/api";

import DropdownMenu from "@/components/DropdownMenu.vue";
import DefaultButton from "@/components/buttons/DefaultButton.vue";

import { useSubjectStore } from "@/stores/subject";
import { useEventStore } from "@/stores/event";

const isOpened = defineModel<boolean>("isOpened", { required: true });
const isLoading = ref(false);

const subjectStore = useSubjectStore();
const eventStore = useEventStore();

onMounted(() => {
  eventStore.on("personalmissing", requestToSelect);
});

function requestToSelect() {
  alert("Palun vali mõni aine jälgitavaks.");
  isOpened.value = true;
}

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
  subjectStore.subjects.current = subject;
  api.followSubject(subject);
}

function unfollow(subject: string) {
  const index = subjectStore.subjects.personal.indexOf(subject);
  subjectStore.subjects.personal.splice(index, 1);
  if (subjectStore.subjects.current == subject)
    subjectStore.subjects.current = null;
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
  --max-width: 95vw;

  @include default;
  display: block;
  position: fixed;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  border: none;
  width: 400px;
  min-width: max-content;
  max-width: var(--max-width);
  background-color: var(--col-bg-default);

  .line-wrapper {
    @include default;
    max-width: var(--max-width);
    min-height: fit-content;
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
    padding: 16px;
    width: 100%;
    border-radius: 0px !important;
    border: none !important;
    &.chosen {
      color: var(--col-fg-accent);
    }
  }
}

#header {
  @include default;
  border: none;
  height: var(--default-size);
}

#modal-container:not(.loading) #header {
  border-bottom: none;
}
</style>
