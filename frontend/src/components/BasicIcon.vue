<template>
  <img id="icon" :src="src" :alt="alt" />
</template>

<script setup lang="ts">
import { withDefaults } from "vue";
// import src from `../../assets/icons/${props.name}`;
import src from "../../assets/icons/check.png"; // TODO!!

const props = withDefaults(defineProps<{ name: string; alt?: string }>(), {
  alt: "",
});
</script>

<style scoped>
#icon {
  width: 24px;
}
</style>

