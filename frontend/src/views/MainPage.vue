<template>
  <ModalMenu v-model:is-opened="isOpened.modal" />
  <LineGraph :selected-subject="selectedSubject">
    <template #square>
      <DefaultButton id="modal-open-btn" @click="isOpened.modal = true">
        <BasicIcon name="settings.png" alt="⚙️" />
      </DefaultButton>
    </template>

    <template #fill-width>
      <DropdownPersonalSubjects
        v-model:is-opened="isOpened.personal"
        @select-subject="(s) => (selectedSubject = s)"
      />
    </template>
  </LineGraph>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import DropdownPersonalSubjects from "@/components/DropdownPersonalSubjects.vue";
import LineGraph from "@/components/LineGraph.vue";
import ModalMenu from "@/components/ModalMenu.vue";
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import BasicIcon from "@/components/BasicIcon.vue";

const selectedSubject = ref("");
const isOpened = ref({ modal: false, personal: false });

watchEffect(() => {
  if (isOpened.value.modal) isOpened.value.personal = false;
});
</script>

<style scoped>
#modal-open-btn {
  width: 100%;
  height: 100%;
}
</style>
