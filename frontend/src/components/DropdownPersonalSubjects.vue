<template>
  <DefaultButton id="dropbtn" :class="{ opened: isOpened }" @click="toggleMenu">
    Minu õppeained
  </DefaultButton>
  <DropdownMenu v-slot="{ item }" :is-loading :is-opened :items="subjects">
    <DefaultButton class="menu-btn" @click="emit('select-subject', item)">
      {{ item }}
    </DefaultButton>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { api } from "@/api/api";

import DefaultButton from "@/components/buttons/DefaultButton.vue";
import DropdownMenu from "@/components/DropdownMenu.vue";

const emit = defineEmits(["select-subject"]);

const isOpened = defineModel<boolean>("isOpened", { required: true });
const isLoading = ref(false);
const subjects: Ref<string[]> = ref([]);

async function toggleMenu() {
  isOpened.value = !isOpened.value;
  if (!isOpened.value) {
    isLoading.value = true;
    subjects.value = await api.getSubjects();
    isLoading.value = false;
  }
}
</script>

<style scoped lang="scss">
#dropbtn {
  width: 100%;
  height: calc(var(--default-size) + 2px); // Account for the border
  &.opened {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.menu-btn {
  width: 100%;
  height: calc(var(--default-size) + 1px); // Account for the border
  border-radius: 0;
  border-left: none !important;
  border-right: none !important;
  border-bottom: none !important;
}
</style>
