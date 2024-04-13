<template>
  <div id="container">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import "@/styles/colors.css";

#container {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--col-bg-default);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  --default-margin: 8px;
  --default-size: 64px;
  --default-transition-length: 0.5s;
}
</style>
