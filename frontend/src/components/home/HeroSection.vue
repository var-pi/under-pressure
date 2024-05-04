<template>
  <section>
    <canvas />
    <p>
      Ülikool võib olla
      <span class="highlight">stressivaba</span>
    </p>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { StarPainter } from "@/classes/StarPainter";

onMounted(() => {
  new StarPainter(document.getElementsByTagName("canvas")[0]);
});
</script>

<style scoped lang="scss">
@import "@/styles/font";

section {
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
</style>
