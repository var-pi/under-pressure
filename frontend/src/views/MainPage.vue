<template>
  <ModalMenu v-model:is-opened="isOpened.modal" />

  <div id="chart-row" :class="{ mobile: isMobile }">
    <LineGraph :is-mobile />
    <SliderInput v-model="sliderValue" :is-vertical="!isMobile" />
  </div>
  <div id="buttons-row">
    <ModalButton
      :is-hidden="isOpened.personal"
      @click="isOpened.modal = true"
    />
    <DropdownPersonalSubjects v-model:is-opened="isOpened.personal" />
    <EntryButton :value="sliderValue" :is-hidden="isOpened.personal" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import DropdownPersonalSubjects from "@/components/DropdownPersonalSubjects.vue";
import LineGraph from "@/components/LineGraph.vue";
import ModalMenu from "@/components/ModalMenu.vue";
import EntryButton from "@/components/EntryButton.vue";
import ModalButton from "@/components/buttons/ModalButton.vue";
import SliderInput from "@/components/SliderInput.vue";

const isOpened = ref({ modal: false, personal: false });
const sliderValue = ref<number>(50);
const isMobile = ref(false);
const mobileMaxWidth = 900;

onMounted(() => {
  setIfVertical();
  window.addEventListener("resize", setIfVertical);
});

function setIfVertical() {
  isMobile.value = window.innerWidth < mobileMaxWidth;
}

watchEffect(() => {
  if (isOpened.value.modal) isOpened.value.personal = false;
});
</script>

<style scoped>
#chart-row {
  display: flex;
  flex: 1;
  flex-direction: row;
  &.mobile {
    flex-direction: column;
  }
}
#buttons-row {
  display: flex;
  overflow: hidden;
}
</style>
