import { defineStore } from "pinia";
import { ref } from "vue";

export const useDeviceStore = defineStore("device", () => {
  const isMobile = ref(false);

  const detectDeviceType = () => {
    isMobile.value = window.innerWidth < 900;
  };

  detectDeviceType();

  window.addEventListener("resize", detectDeviceType);

  return { isMobile };
});
