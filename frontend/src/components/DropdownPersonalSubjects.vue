<template>
  <DefaultButton
    id="dropbtn"
    :class="{ opened: isOpened, ready: !isLoading }"
    @click="toggleMenu"
  >
    Minu õppeained
  </DefaultButton>
  <DropdownMenu
    v-slot="{ item, index }"
    :is-loading
    :is-opened
    :items="subjects"
    :max-visible="2.5"
  >
    <DefaultButton
      class="menubtn"
      :class="{ first: index == 0 }"
      @click="emit('selectSubject', item)"
    >
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

.menubtn {
  --total-border-height: 1px;
  width: 100%;
  height: calc(var(--default-size) + var(--total-border-height));
  border-radius: 0 !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: none !important;
  &.first {
    --total-border-height: 0px;
    border-top: none !important;
  }
}
</style>
