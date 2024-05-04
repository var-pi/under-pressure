<template>
  <header>
    <DefaultButton @click="login()">Logi sisse</DefaultButton>
  </header>
</template>

<script setup lang="ts">
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import { login } from "@/api/auth";
</script>

<style scoped lang="scss">
header {
  z-index: 10;
  padding: 16px;
  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  justify-content: right;
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--col-border);
  button {
    height: var(--default-size);
    padding: 0 var(--default-size);
  }
}
</style>
