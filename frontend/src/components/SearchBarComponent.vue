<template>
  <input v-model="text" placeholder="Otsi..." />
</template>

<script setup lang="ts">
const text = defineModel<string>({ required: true });
</script>

<style scoped lang="scss">
@import "@/styles/default";

input {
  @include default;
  border-radius: 0;
  border-right: none;
  border-left: none;
  text-align: center;
  padding: 0;
  width: 100%;
  height: calc(var(--default-size));
  caret-color: var(--col-fg-default);

  &:focus {
    outline: none;
    &::placeholder {
      color: transparent;
    }
  }

  &:hover {
    background-color: var(--col-bg-lighter);
  }
}
</style>
