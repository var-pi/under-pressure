<template>
  <ModalMenu :is-open="isModalOpened" @modal-close="isModalOpened = false" />
  <LineGraph :selected-subject="selectedSubject">
    <template #square>
      <DefaultButton id="modal-open-btn" @click="isModalOpened = true">
        <BasicIcon name="settings.png" alt="⚙️" />
      </DefaultButton>
    </template>

    <template #fill-width>
      <DropdownPersonalSubjects
        :modal-open="isModalOpened"
        @handle-selected-subject-update="(s) => (selectedSubject = s)"
      />
    </template>
  </LineGraph>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DropdownPersonalSubjects from "@/components/DropdownPersonalSubjects.vue";
import LineGraph from "@/components/LineGraph.vue";
import ModalMenu from "@/components/ModalMenu.vue";
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import BasicIcon from "@/components/BasicIcon.vue";

const selectedSubject = ref("");
let isModalOpened = ref(false);
</script>

<style scoped>
#modal-open-btn {
  width: 100%;
  height: 100%;
}
</style>

