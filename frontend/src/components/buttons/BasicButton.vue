<template>
  <button class="basic-button">
    <slot />
  </button>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.basic-button {
  cursor: pointer;
  justify-content: center;
  transition: background-color 200ms;

  @media (hover: hover) {
    &:hover {
      background-color: var(--col-bg-lighter);
    }
  }
}
</style>
