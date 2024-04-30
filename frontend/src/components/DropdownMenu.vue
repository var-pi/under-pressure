<template>
  <div id="dropdown">
    <slot name="head" />

    <div id="dropdown-body" :class="{ opened: isOpened }">
      <LoaderComponent v-if="isLoading" />

      <template v-else-if="items.length > 0">
        <SearchBarComponent v-model="filter" />
        <div id="items">
          <slot
            v-for="(priorityItem, index) in filteredPriorityItems"
            :key="index"
            name="priority-content"
            :priority-item
            :index
          />
          <slot
            v-for="(item, index) in filteredItems"
            :key="index"
            name="content"
            :item
            :index
          />
        </div>
      </template>

      <slot v-else name="fallback" />
    </div>
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
  priorityItems: string[] | null;
  maxVisible: number;
}>();

const filter = ref("");

const filteredPriorityItems = computed(() =>
  (props.priorityItems ?? [])
    .filter((item: string) => new RegExp(filter.value, "i").test(item))
    .sort((a: string, b: string) => a.localeCompare(b)),
);

const filteredItems = computed(() =>
  props.items
    .filter((item) => new RegExp(filter.value, "i").test(item))
    .filter((item) => !filteredPriorityItems.value.includes(item))
    .sort((a, b) => a.localeCompare(b)),
);

watch(
  () => props.isOpened,
  (newIsOpened) => {
    if (newIsOpened) {
      filter.value = "";
    }
  },
);
</script>

<style scoped lang="scss">
@import "@/styles/default";

#dropdown {
  @include border;
  @include radius;
  overflow: hidden;
}

#dropdown-body {
  max-height: 0px;
  &.opened {
    --proposed-max-height: calc((v-bind(maxVisible) + 1) * var(--default-size));
    max-height: calc(min(70vh, var(--proposed-max-height)));
  }
  transition: max-height var(--default-transition-length);
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
