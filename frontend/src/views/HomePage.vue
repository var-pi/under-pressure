import DefaultButton from '@/components/buttons/DefaultButton.vue';
<template>
  <header>
    <DefaultButton>Logi sisse</DefaultButton>
  </header>
  <div id="hero-section">
    <canvas></canvas>
    <p>
      Ülikool võib olla
      <span class="highlight">stressivaba</span>
    </p>
  </div>
  <div id="description">Description</div>
</template>

<script setup lang="ts">
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import { onMounted } from "vue";
import { StarPainter } from "@/classes/StarPainter";

onMounted(() => {
  new StarPainter(document.getElementsByTagName("canvas")[0]);
});
</script>

<style lang="scss" scoped>
@import "@/styles/font";

header {
  z-index: 10;
  padding: 16px;
  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  justify-content: right;
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--col-border);
  button {
    height: var(--default-size);
    padding: 0 var(--default-size);
  }
}
#hero-section {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  p {
    @include default-font;
    font-size: 24px;
    color: var(--col-fg-default);
    font-weight: bold;
    padding: var(--default-size);
    text-align: center;
    .highlight {
      color: var(--col-fg-accent);
    }
  }
  canvas {
    position: absolute;
    left: 0;
    right: 0;
    z-index: -1;
  }
}
#description {
  //   background-color: green;
  height: 100vh;
}
</style>
