<template>
  <div id="dropdown">
    <slot name="head" />

    <div id="dropdown-body" :class="{ opened: isOpened }">
      <LoaderComponent v-if="isLoading" />

      <template v-else-if="items.length > 0">
        <SearchBarComponent v-model="filter" />
        <div id="items">
          <slot
            v-for="(item, index) in filteredItems"
            :key="item"
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
  @include border;
  @include radius;
  overflow: hidden;
}

#dropdown-body {
  max-height: 0px;
  &.opened {
    max-height: calc((v-bind(maxVisible) + 1) * var(--default-size));
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
