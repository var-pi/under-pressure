import { defineStore } from "pinia";
import { ref, onMounted, onUnmounted } from "vue";

export const useDeviceStore = defineStore("device", () => {
  const isMobile = ref(false);

  onMounted(() => {
    detectDeviceType();
    setVhProperty();

    window.addEventListener("resize", detectDeviceType);
    window.addEventListener("resize", setVhProperty);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", detectDeviceType);
    window.removeEventListener("resize", setVhProperty);
  });

  function detectDeviceType() {
    isMobile.value = window.innerWidth < 900;
  }

  function setVhProperty() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  return { isMobile };
});
