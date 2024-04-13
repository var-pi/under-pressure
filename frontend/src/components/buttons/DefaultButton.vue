<template>
  <BasicButton class="default-button">
    <slot />
  </BasicButton>
</template>

<script setup lang="ts">
import BasicButton from "./BasicButton.vue";
</script>

<style lang="scss" local>
@import "@/styles/default";

.default-button {
  @include default;
}
</style>
