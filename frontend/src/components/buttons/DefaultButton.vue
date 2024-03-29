<template>
  <DefaultButton :emoji="emoji" class="default-button">
    <slot />
  </DefaultButton>
</template>

<script setup lang="ts">
import DefaultButton from "./BasicButton.vue";
import { defineProps, withDefaults } from "vue";

interface Props {
  emoji?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  emoji: false,
});
</script>

<style lang="scss" local>
@import "@/styles/default";

.default-button {
  @include default;
}
</style>

