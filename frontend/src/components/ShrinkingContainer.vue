<template>
  <div id="shrinking-container" :class="{ hidden: isHidden }">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ isHidden: boolean }>();
</script>

<style scoped lang="scss">
#shrinking-container {
  margin: var(--default-margin);
  width: var(--default-size);
  height: var(--default-size);
  position: relative;
  &.hidden {
    margin-right: 0px;
    margin-left: 0px;
    width: 0px;
  }

  transition: all var(--default-transition-length);
}
</style>
