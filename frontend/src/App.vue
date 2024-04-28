<template>
  <div id="container">
    <router-view />
  </div>
</template>

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
