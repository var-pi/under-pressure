<template>
  <input id="search-bar" v-model="filter" type="text" placeholder="Otsi..." />
</template>

<script setup lang="ts">
import { computed, ref, watch, defineEmits, defineProps, onMounted } from "vue"
import { DropdownItem } from "@/interfaces/interfaces";

const props = defineProps<{
  menuItems: string[];
}>();

const emits = defineEmits(["handle-filtered-items"])

const filter = ref("");

const filteredItems = computed(function () {
  const filterText = filter.value.toUpperCase();
  return props.menuItems
    .filter(function (item: string) {
      return item.toUpperCase().includes(filterText)
    })
    .map(function (item: string): DropdownItem {
      console.log(item)
      return {
        text: item,
        display: "block",
      };
    });
});

onMounted(() => {
  emits("handle-filtered-items", filteredItems.value);
});

watch(filter, () => {
  // Emitting 'filtered-items' custom event with the filtered items
  emits("handle-filtered-items", filteredItems.value);
});
</script>

<style>
#search-bar {
  text-indent: 16px;
  text-align: center;
  padding: 0px;
  border: none;
  width: 100%;
  height: var(--row-height);
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