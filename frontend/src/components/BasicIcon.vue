<template>
  <img id="icon" :src="require(`../../assets/icons/${name}`)" :alt="alt" />
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

withDefaults(defineProps<{ name: string; alt?: string }>(), {
  alt: "",
});
</script>

<style scoped>
#icon {
  width: 24px;
}
</style>

