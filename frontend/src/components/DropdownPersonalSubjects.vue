<template>
  <DefaultButton id="dropbtn" :class="{ opened: isOpened }" @click="toggleMenu">
    Minu õppeained
  </DefaultButton>
  <DropdownMenu v-slot="{ item }" :is-loading :is-opened :items="subjects">
    <DefaultButton class="menubtn" @click="emit('selectSubject', item)">
      {{ item }}
    </DefaultButton>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { api } from "@/api/api";

import DefaultButton from "@/components/buttons/DefaultButton.vue";
import DropdownMenu from "@/components/DropdownMenu.vue";

const emit = defineEmits(["selectSubject"]);

const isOpened = defineModel<boolean>("isOpened", { required: true });
const isLoading = ref(false);
const subjects: Ref<string[]> = ref([]);

async function toggleMenu() {
  if (!isOpened.value) {
    isLoading.value = true;
    subjects.value = await api.getSubjects();
    isLoading.value = false;
  }
  isOpened.value = !isOpened.value;
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

.menubtn {
  width: 100%;
  height: calc(var(--default-size) + 1px); // Account for the border
  border-radius: 0 !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: none !important;
}
</style>
