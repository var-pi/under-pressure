<template>
  <ShrinkingContainer :is-hidden>
    <DefaultButton id="modal-button" :class="{ hidden: isHidden }">
      <BasicIcon name="settings.png" alt="⚙️" />
    </DefaultButton>
  </ShrinkingContainer>
</template>

<script setup lang="ts">
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import BasicIcon from "@/components/BasicIcon.vue";
import ShrinkingContainer from "@/components/ShrinkingContainer.vue";

defineProps<{ isHidden: boolean }>();
</script>

<style scoped lang="scss">
#modal-button {
  position: absolute;
  width: var(--default-size);
  height: var(--default-size);
  transition: all var(--default-transition-length);
  &.hidden {
    translate: calc(-100% - var(--default-margin));
  }
}
</style>
