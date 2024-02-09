<template>
    <div v-if="isDropdownVisible" class="dropdown-content">
    <input
      id="search-bar"
      v-model="filter"
      type="text"
      placeholder="Otsi..."
    />
    <div class="scrollable-content">
      <div 
        v-for="item in filteredItems" 
        :key="item.text">
        <slot
          :item="item"
        >
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps } from "vue"
import { DropdownItem } from "@/interfaces/interfaces";

const props = defineProps<{
  isDropdownVisible: boolean;
  menuItems: string[];
}>();

const filter = ref("");
const filteredItems = computed(function () {  
  const filterText = filter.value.toUpperCase();
  return props.menuItems.map(function (item: string): DropdownItem {
    console.log(filteredItems);
    return {
      text: item,
      display: item.toUpperCase().includes(filterText) ? "block" : "none",
    };
  });
  
});


watch(() => props.isDropdownVisible, () => {
  filter.value = "";
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