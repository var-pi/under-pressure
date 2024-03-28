<template>
  <DefaultButton class="default-button">
    <slot />
  </DefaultButton>
</template>

<script setup lang="ts">
import DefaultButton from "./BasicButton.vue";
</script>

<style lang="scss" local>
@import "@/styles/default";

.default-button {
  @include default;
}
</style>

