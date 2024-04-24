import { defineStore } from "pinia";
import { ref } from "vue";

export const useSubjectStore = defineStore("subject", () => {
  const subjects = {
    all: ref<string[]>([]),
    personal: ref<string[]>([]),
    current: ref<string | null>(null),
  };

  return { subjects };
});