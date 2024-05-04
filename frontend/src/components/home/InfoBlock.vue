<template>
  <div class="info-block-container">
    <h2 class="head">{{ head }}</h2>
    <div class="divider" />
    <div class="body">{{ body }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ head: string; body: string }>();
</script>

<style scoped lang="scss">
@import "@/styles/default";

.info-block-container {
  @include default;
  flex-direction: column;
  background-color: var(--col-bg-default);
  h2,
  .body {
    padding: 16px;
  }
  h2 {
    @include default-font;
    font-weight: bold;
    color: var(--col-fg-accent);
    margin: 0;
  }
  .divider {
    width: 90%;
    border-top: 1px solid var(--col-border);
  }
}
</style>
