<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import "@/styles/colors.css";

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
