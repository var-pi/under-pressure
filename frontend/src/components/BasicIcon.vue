<template>
  <img id="icon" :src :alt="alt" />
</template>

<script setup lang="ts">
import { withDefaults } from "vue";

const props = withDefaults(defineProps<{ name: string; alt?: string }>(), {
  alt: "",
});

const src = new URL(`../../assets/icons/${props.name}`, import.meta.url).href;
</script>

<style scoped>
#icon {
  width: 24px;
  max-width: 100%;
}
</style>
