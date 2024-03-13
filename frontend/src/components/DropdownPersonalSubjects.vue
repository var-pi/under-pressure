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
      <div
        v-if="isDropdownVisible || isLoading"
        class="dropdown-content default"
      >
        <LoaderComponent :loading="isLoading" />
        <div v-if="isDropdownVisible" id="content-wrapper">
          <div v-if="personalSubjects.length" id="content-with-subjects">
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
                  class="menu-line-wrapper default"
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
import { ref, computed, watch, defineEmits, defineProps } from "vue";
import { api } from "@/api/api";

import LoaderComponent from "@/components/LoaderComponent.vue";
import { Subject } from "@/api/types";

const props = defineProps<{
  modalOpen: boolean;
}>();

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

watch(
  () => props.modalOpen,
  () => {
    isDropdownVisible.value = false;
  }
);
</script>

<style scoped>
@import "@/styles/colors/colors.css";
@import "@/styles/button.css";

#personal-subjects {
  width: 100%;
}

:root {
  --width-s: 45vw;
  --width-m: 35vw;
  --width-l: 25vw;
  --width-xl: 440px;
  --height: 5vw;
  --height-xl: 66px;
}

#wrapper {
  width: 100%;
  --row-height: 48px;
}

#dropbtn {
  padding: 0;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 64px;
  text-decoration: none;
  transform: translate3d(0, 0, 0);
  vertical-align: baseline;
  white-space: nowrap;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
}

#dropbtn.open {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}
.menubtn {
  width: 100%;
  height: 100%;
  border-radius: 0px !important;
  text-indent: 16px;
  border: none !important;
}
#content-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
}
#content-with-subjects {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.unfollow-btn {
  position: absolute;
  right: 0;
  height: 100%;
  width: 48px;
  border-radius: 0px !important;
  border: none !important;
  opacity: 0;
}
.menu-line-wrapper:hover .unfollow-btn {
  opacity: 1;
}

#search-bar {
  text-indent: 16px;
  text-align: center;
  padding: 0px;
  border: none;
  width: 100%;
  height: var(--row-height);
  background-color: initial;
  font-family: var(--font-family);
  color: var(--col-fg-default);

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: var(--col-bg-lighter);
  }
}
.dropdown-content {
  display: flex;
  flex-direction: column;
  border-top: none !important;
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
}
.scrollable-content {
  max-height: var(--width-xl);
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.scrollable-content::-webkit-scrollbar {
  display: none;
}
.dropdown {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-line-wrapper {
  display: flex;
  flex: 1;
  position: relative;
  height: var(--row-height);
  border-radius: 0 !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: none !important;
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

#no-personal-subjects {
  height: 64px;
  border: 0;
  color: var(--col-fg-accent);
}
</style>

