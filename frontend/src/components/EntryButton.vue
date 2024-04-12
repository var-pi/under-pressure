<template>
  <DefaultButton id="enter-btn" @click="updateEntry">
    {{ value }}
  </DefaultButton>
</template>

<script setup lang="ts">
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import { api } from "@/api";
import { useSubjectStore } from "@/stores/subject";
import { useEventStore } from "@/stores/event";
import { EntryUpdated } from "@/stores/events/entryUpdated";

const props = defineProps<{ value: number }>();
const subjects = useSubjectStore();
const eventStore = useEventStore();

function updateEntry() {
  if (subjects.current == null) return alert("Palun vali mõni aine.");
  api.updateEntry(subjects.current, props.value);
  const body: EntryUpdated = { subject: subjects.current, value: props.value };
  eventStore.emit("entryupdated", body);
}
</script>
