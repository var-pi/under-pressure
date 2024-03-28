<template>
  <button class="basic-button" :class="{ emoji }">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

interface Props {
  emoji?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  emoji: false,
});
</script>

<style scoped>
.basic-button {
  cursor: pointer;
  justify-content: center;
  transition: background-color 200ms;

  &:hover {
    background-color: var(--col-bg-lighter);
  }
  &.emoji {
    color: transparent;
    text-shadow: 0 0 0 var(--col-fg-default);
  }
}
</style>

