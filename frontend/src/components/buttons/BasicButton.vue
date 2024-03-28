<template>
  <button class="basic-button">
    <slot />
  </button>
</template>

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

