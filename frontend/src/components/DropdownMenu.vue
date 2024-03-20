<template>
  <div v-if="isDropdownVisible" class="dropdown-content">
    <SearchBarComponent v-model="filter"/>
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
import { ref, defineProps, computed } from "vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import SearchBarComponent from "@/components/SearchBarComponent.vue";
import { DropdownItem } from "@/interfaces";

const props = defineProps<{
  isDropdownVisible: boolean;
  menuItems: string[];
}>();

const filter = ref("");

const filteredItems = computed(function () {
  const filterText = filter.value.toUpperCase();
  return props.menuItems
    .filter(function (item: string) {
      return item.toUpperCase().includes(filterText)
    })
    .map(function (item: string): DropdownItem {
      return {
        text: item,
        display: "block",
      };
    });
});
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

.scrollable-content {
  max-height: var(--width-xl);
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

}
.scrollable-content::-webkit-scrollbar {
  display: none;
}
</style>

