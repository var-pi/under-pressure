<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
@import "@/styles/colors/colors.css";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--col-bg-default);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  --default-margin: 8px;
  --default-size: 64px;
}
</style>

