<template>
  <input id="search-bar" v-model="filter" type="text" placeholder="Otsi..." />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const emits = defineEmits(["update:filterValue"]);

const filter = ref("");

watch(filter, () => {
  emits("update:filterValue", filter.value);
});
</script>

<style scoped lang="scss">
@import "@/styles/default";

#search-bar {
  @include default;
  border-radius: 0;
  border: none;
  text-align: center;
  padding-top: 0;
  padding-bottom: 0;
  width: 100%;
  height: var(--default-size);
  caret-color: var(--col-fg-default);

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: var(--col-bg-lighter);
  }
}
</style>
