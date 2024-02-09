<template>
  <ModalMenu
    id="menuModal"
    :is-open="isModalOpened"
    @modal-close="closeModal"
  />
  <div id="contents">
    <LineGraph :new-selected-subject="newSelectedSubject">
      <template v-slot:square>
        <button id="menu-btn" class="default button emoji" @click="openModal">
          ⚙️
        </button>
      </template>
      <template v-slot:fill-width>
        <DropdownPersonalSubjects
          :modal-open="isModalOpened"
          @handle-selected-subject-update="updateSelectedSubject"
        />
      </template>
    </LineGraph>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DropdownPersonalSubjects from "@/components/DropdownPersonalSubjects.vue";
import LineGraph from "@/components/LineGraph.vue";
import ModalMenu from "@/components/ModalMenu.vue";

const newSelectedSubject = ref("");
let isModalOpened = ref(false);

function updateSelectedSubject(subject: string) {
  newSelectedSubject.value = subject;
}

const openModal = () => {
  isModalOpened.value = true;
};
const closeModal = () => {
  isModalOpened.value = false;
};
</script>

<style scoped>
@import "@/styles/colors/colors.css";
@import "@/styles/default.css";
@import "@/styles/button.css";

/* Dropdown menu buttons */
#menu-btn {
  width: 100%;
  height: 100%;
}
</style>

