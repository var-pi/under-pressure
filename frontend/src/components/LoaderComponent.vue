<!-- Loader by greyby: https://github.com/greyby/vue-spinner.git -->
<template>
  <div id="v-spinner">
    <div
      v-for="n in [1, 2, 3]"
      :key="n"
      :style="{ animationDelay: `${70 * n}ms` }"
    />
  </div>
</template>

<style scoped lang="scss">
#v-spinner {
  display: flex;
  height: var(--default-size);
  justify-content: center;
  align-items: center;
  & > div {
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
