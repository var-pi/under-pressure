<template>
  <div id="dropdown" :class="{ opened: isOpened }">
    <LoaderComponent v-if="isLoading" />
    <template v-else-if="items.length > 0">
      <SearchBarComponent v-model="filter" />
      <div id="items">
        <slot v-for="(item, index) in filteredItems" :key="item" :item :index />
      </div>
    </template>
    <slot v-else name="fallback" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import SearchBarComponent from "@/components/SearchBarComponent.vue";

const props = defineProps<{
  isOpened: boolean;
  isLoading: boolean;
  items: string[];
  maxVisible: number;
}>();

const filter = ref("");

watch(
  () => props.isOpened,
  (newIsOpened) => {
    if (newIsOpened) {
      filter.value = "";
    }
  },
);

const filteredItems = computed(() =>
  props.items
    .filter((i) => new RegExp(filter.value, "i").test(i))
    .sort((a, b) => a.localeCompare(b)),
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
  max-height: 0px;
  &:not(.opened) {
    border-width: 0px;
    transition:
      border-width 0s var(--default-transition-length),
      max-height var(--default-transition-length);
  }
  &.opened {
    max-height: calc((v-bind(maxVisible) + 1) * var(--default-size));
    transition: max-height var(--default-transition-length);
  }
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
