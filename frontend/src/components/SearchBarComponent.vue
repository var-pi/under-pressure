<template>
  <input id="search-bar" v-model="filter" type="text" placeholder="Otsi..." />
</template>

<script setup lang="ts">
import { ref, watch, defineEmits, defineProps, onMounted } from "vue";

const emits = defineEmits(["update:filterValue"]);

const filter = ref("");

watch(filter, () => {
  emits("update:filterValue", filter.value);
});
</script>

<style>
#search-bar {
  text-indent: 16px;
  text-align: center;
  padding: 0px;
  border: none;
  width: 100%;
  height: var(--default-size);
  background-color: initial;
  font-family: var(--font-family);
  color: var(--col-fg-default);

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: var(--col-bg-lighter);
  }
}
</style>

