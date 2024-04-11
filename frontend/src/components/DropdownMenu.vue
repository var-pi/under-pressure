<template>
  <div v-show="isOpened" id="dropdown">
    <LoaderComponent v-if="isLoading" />
    <template v-else>
      <SearchBarComponent v-model="filter" />
      <div id="items">
        <slot v-for="(item, index) in filteredItems" :key="item" :item :index />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import SearchBarComponent from "@/components/SearchBarComponent.vue";

const props = defineProps<{
  isOpened: boolean;
  isLoading: boolean;
  items: string[];
  maxVisible: number;
}>();

const filter = ref("");

const filteredItems = computed(() =>
  props.items.filter((i) => new RegExp(filter.value, "i").test(i)),
);
</script>

<style scoped lang="scss">
@import "@/styles/default";

#dropdown {
  @include default;
  display: block;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-top: none;
  overflow: hidden;
}

#items {
  max-height: calc(v-bind(maxVisible) * var(--default-size));
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
