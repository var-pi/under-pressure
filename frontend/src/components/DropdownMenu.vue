<template>
  <div v-show="isOpened" id="container">
    <LoaderComponent v-if="isLoading" />
    <template v-else>
      <SearchBarComponent v-model="filter" />
      <div v-for="item in filteredItems" id="items" :key="item">
        <slot :item />
      </div>
    </template>
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
}>();

const filter = ref("");

watch(() => props.isOpened, (newIsOpened) => {
  if (newIsOpened) {
    filter.value = "";
  }
});

const filteredItems = computed(() =>
  props.items.filter((i) => new RegExp(filter.value, "i").test(i)),
);
</script>

<style scoped lang="scss">
@import "@/styles/default";

#container {
  @include default;
  display: block;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-top: none;
}

#items {
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
