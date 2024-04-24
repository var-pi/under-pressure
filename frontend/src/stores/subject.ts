import { defineStore } from "pinia";
import { ref } from "vue";

export const useSubjectStore = defineStore("counter", () => {
  const subjects = {
    all: ref<string[]>([]),
    personal: ref<string[]>([]),
    current: ref<string | null>(null),
  };

  return { subjects };
});