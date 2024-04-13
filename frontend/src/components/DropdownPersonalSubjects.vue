<template>
  <DefaultButton
    id="dropbtn"
    :class="{ opened: isOpened, ready: !isLoading }"
    @click="toggleMenu"
  >
    Minu õppeained
  </DefaultButton>
  <DropdownMenu
    :is-loading
    :is-opened
    :items="subjectStore.subjects.personal"
    :max-visible="2.5"
  >
    <template #default="{ item, index }">
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

#dropbtn {
  --total-border-height: 2px;
  width: 100%;
  height: calc(var(--default-size) + var(--total-border-height));
  &.opened {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    &.ready {
      --total-border-height: 1px;
      border-bottom: none;
    }
  }
}

.menu-entry {
  &.fallback {
    @include default;
    color: var(--col-fg-accent);
  }
  --total-border-height: 1px;
  width: 100%;
  height: calc(var(--default-size) + var(--total-border-height));
  border-radius: 0 !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: none !important;
  &.no-top-border {
    --total-border-height: 0px;
    border-top: none !important;
  }
}
</style>
