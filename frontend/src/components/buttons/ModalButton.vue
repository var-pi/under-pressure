<template>
  <DefaultButton id="modal-button">
    <BasicIcon name="settings.png" alt="⚙️" />
  </DefaultButton>
</template>

<script setup lang="ts">
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import BasicIcon from "@/components/BasicIcon.vue";
</script>

<style scoped lang="scss">
#modal-button {
  margin: var(--default-margin);
  width: var(--default-size);
  height: var(--default-size);
}
</style>
