<!-- Loader by greyby: https://github.com/greyby/vue-spinner.git -->
<template>
  <div id="v-spinner" class="v-spinner">
    <div class="v-sync v-sync1" :style="[spinnerDelay1]"></div>
    <div class="v-sync v-sync2" :style="[spinnerDelay2]"></div>
    <div class="v-sync v-sync3" :style="[spinnerDelay3]"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const spinnerDelay1 = computed(() => ({
  animationDelay: "0.07s",
}));

const spinnerDelay2 = computed(() => ({
  animationDelay: "0.14s",
}));

const spinnerDelay3 = computed(() => ({
  animationDelay: "0.21s",
}));
</script>

<style>
#v-spinner {
  display: flex;
  height: 64px;
  justify-content: center;
  align-items: center;
}

.v-sync {
  background-color: var(--col-fg-default);
  height: 6px;
  width: 6px;
  margin: 2px;
  border-radius: 100%;
  display: inline-block;
  animation-name: v-syncStretchDelay;
  animation-duration: 0.6s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
}

@-webkit-keyframes v-syncStretchDelay {
  33% {
    -webkit-transform: translateY(10px);
    transform: translateY(10px);
  }
  66% {
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

@keyframes v-syncStretchDelay {
  33% {
    -webkit-transform: translateY(10px);
    transform: translateY(10px);
  }
  66% {
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
</style>
