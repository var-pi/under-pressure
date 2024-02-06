Loader by greyby: https://github.com/greyby/vue-spinner.git
<template>
  <div v-show="props.loading" class="v-spinner">
    <div class="v-sync v-sync1" :style="[spinnerStyle, spinnerDelay1]"></div>
    <div class="v-sync v-sync2" :style="[spinnerStyle, spinnerDelay2]"></div>
    <div class="v-sync v-sync3" :style="[spinnerStyle, spinnerDelay3]"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';

const props = defineProps<{
  loading: boolean;
}>();

const spinnerStyle = ref({
  backgroundColor: '#95B9C7',
  height: '5px',
  width: '5px',
  margin: '2px',
  borderRadius: '100%',
  display: 'inline-block',
  animationName: 'v-syncStretchDelay',
  animationDuration: '0.6s',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'ease-in-out',
  animationFillMode: 'both',
});

const spinnerDelay1 = computed(() => ({
  animationDelay: '0.07s',
}));

const spinnerDelay2 = computed(() => ({
  animationDelay: '0.14s',
}));

const spinnerDelay3 = computed(() => ({
  animationDelay: '0.21s',
}));
</script>

<style>
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