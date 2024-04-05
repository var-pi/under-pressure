<template>
  <img id="icon" :src :alt="alt" />
</template>

<script setup lang="ts">
import { computed, withDefaults } from "vue";
// import src from `../../assets/icons/${props.name}`;
// import src from "../../assets/icons/check.png"; // TODO!!

const props = withDefaults(defineProps<{ name: string; alt?: string }>(), {
  alt: "",
});

const src = new URL(`../../assets/icons/${props.name}`, import.meta.url).href;
</script>

<style scoped>
#icon {
  width: 24px;
}
</style>

