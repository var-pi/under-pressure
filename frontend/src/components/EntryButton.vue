<template>
  <ShrinkingContainer :is-hidden>
    <DefaultButton
      id="entry-button"
      :class="{ hidden: isHidden }"
      @click="updateEntry"
    >
      {{ value }}
    </DefaultButton>
  </ShrinkingContainer>
</template>

<script setup lang="ts">
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import { api } from "@/api";
import { useSubjectStore } from "@/stores/subject";
import { useEventStore } from "@/stores/event";
import ShrinkingContainer from "@/components/ShrinkingContainer.vue";

const props = defineProps<{ value: number; isHidden: boolean }>();
const subjectStore = useSubjectStore();
const eventStore = useEventStore();

function updateEntry() {
  const subject = subjectStore.subjects.current;
  if (subject == null) return alert("Palun vali mõni aine.");
  api.updateEntry(subject, props.value);
  eventStore.emit("entryupdated", { value: props.value });
}
</script>

<style scoped lang="scss">
#entry-button {
  right: 0;
  position: absolute;
  width: var(--default-size);
  height: var(--default-size);
  transition: all var(--default-transition-length);
  &.hidden {
    translate: calc(100% + var(--default-margin));
  }
}
</style>
