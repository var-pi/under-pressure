import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export const useSubjectStore = defineStore("counter", () => {
  const current: Ref<string | null> = ref(null);

  return { current };
});
