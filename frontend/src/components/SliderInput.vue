<template>
  <div
    @pointerdown="pointerDown"
    @pointermove="pointerMove"
    @pointerup="pointerUp"
    id="slider-wrapper"
    :class="{ vertical: isVertical, horizontal: !isVertical }"
  >
    <div
      id="slider-body"
      :class="{ vertical: isVertical, horizontal: !isVertical }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { defineModel, computed, withDefaults, defineProps } from "vue";

interface Props {
  isVertical?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isVertical: false,
});
const model = defineModel<number>({ required: true });

let isPointerDown = false;

function pointerDown(e: PointerEvent) {
  isPointerDown = true;
  updateValue(e);
}

function pointerMove(e: PointerEvent) {
  if (isPointerDown) updateValue(e);
}

function pointerUp(e: PointerEvent) {
  isPointerDown = false;
}

function updateValue(e: PointerEvent) {
  const wrapper: HTMLElement = e.currentTarget as HTMLElement;

  const offsetFraction: number = props.isVertical
    ? (e.y - wrapper.offsetTop) / wrapper.offsetHeight
    : (wrapper.offsetLeft + wrapper.offsetWidth - e.x) / wrapper.offsetWidth;

  const calculatedValue = 100 - Math.round(offsetFraction * 100);
  model.value = Math.min(Math.max(calculatedValue, 0), 100);
}

const sliderOffset = computed(
  () => (props.isVertical ? 1 : -1) * (100 - model.value) + "%"
);
</script>

<style scoped lang="scss">
@import "@/styles/default";

#slider-wrapper {
  @include default;
  touch-action: none; // Needed for pointermove on mobile
  margin: var(--default-margin);
  overflow: hidden;
  &.vertical {
    width: 64px;
  }
  &.horizontal {
    height: 64px;
  }
}

#slider-body {
  width: 100%;
  height: 100%;
  background-color: var(--col-bg-lighter);
  &.vertical {
    translate: 0 v-bind(sliderOffset);
  }
  &.horizontal {
    translate: v-bind(sliderOffset) 0;
  }
}
</style>

