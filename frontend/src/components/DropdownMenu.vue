<template>
  <div v-if="isDropdownVisible" class="dropdown-content">
    <SearchBarComponent :menu-items="menuItems" @handle-filtered-items="updateFilteredItems" />
    <div class="scrollable-content">
      <div v-for="item in filteredItems" :key="item.text">
        <slot :item="item">
        </slot>
      </div>
    </div>
  </div>
  <div v-else>
    <LoaderComponent :loading="true" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import SearchBarComponent from "@/components/SearchBarComponent.vue";
import { DropdownItem } from "@/interfaces";

defineProps<{
  isDropdownVisible: boolean;
  menuItems: string[];
}>();

const filteredItems = ref<DropdownItem[]>();

function updateFilteredItems(items: DropdownItem[]) {
  filteredItems.value = items;
}
</script>

<style>
.dropdown-content {
  display: flex;
  flex-direction: column;
  border-top: none;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border: 1px solid var(--col-border);
  border-radius: 8px;
  font-size: 18px;
  font-family: var(--font-family);
  color: var(--col-fg-default);
}
</style>

