<template>
  <div id="container">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  setVhProperty();
});
window.addEventListener("resize", () => {
  setVhProperty();
});

function setVhProperty() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
</script>

<style scoped lang="scss">
@import "@/styles/colors.css";

#container {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: calc(var(--vh) * 100);
  display: flex;
  flex-direction: column;
  --default-margin: 8px;
  --default-size: 64px;
  --default-transition-length: 1s;
}
</style>
