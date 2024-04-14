<template>
  <div id="dropdown-personal-container">
    <DropdownMenu
      :is-loading
      :is-opened
      :items="subjectStore.subjects.personal"
      :max-visible="2.5"
    >
      <template #head>
        <DefaultButton
          id="dropbtn"
          :class="{ opened: isOpened, ready: !isLoading }"
          @click="toggleMenu"
        >
          Minu õppeained
        </DefaultButton>
      </template>

      <template #content="{ item, index }">
        <DefaultButton
          class="menu-entry"
          :class="{ 'no-top-border': index == 0 }"
          @click="subjectStore.subjects.current = item"
        >
          {{ item }}
        </DefaultButton>
      </template>

      <template #fallback>
        <div class="fallback menu-entry">Lisa aineid seadetes! ⚙️</div>
      </template>
    </DropdownMenu>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { api } from "@/api";

import DefaultButton from "@/components/buttons/DefaultButton.vue";
import DropdownMenu from "@/components/DropdownMenu.vue";
import { useSubjectStore } from "@/stores/subject";

const isOpened = defineModel<boolean>("isOpened", { required: true });
const isLoading = ref(false);
const subjectStore = useSubjectStore();

async function toggleMenu() {
  isOpened.value = !isOpened.value;
  if (!isOpened.value) {
    isLoading.value = true;
    subjectStore.subjects.personal = await api.getSubjects();
    isLoading.value = false;
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/default";

#dropdown-personal-container {
  margin: var(--default-margin);
  flex: 1;
  height: fit-content;
}

#dropbtn {
  width: 100%;
  height: var(--default-size);
  border: none;
  border-radius: 0;
}

.menu-entry {
  &.fallback {
    @include default;
    color: var(--col-fg-accent);
  }
  width: 100%;
  height: var(--default-size);
  border-radius: 0 !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: none !important;
  &.no-top-border {
    border-top: none !important;
  }
}
</style>
