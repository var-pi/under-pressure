<template>
  <section>
    <div id="description-wrapper">
      <div id="done" class="column">
        <h1>Olemas</h1>
        <InfoBlock head="Jälgi stressi" body="Õpi ennast paremini tundma" />
      </div>
      <div id="comming" class="column">
        <h1>Tulemas</h1>
        <InfoBlock
          head="Võrdle keskmisega"
          body="Tõde, et ka teistel on raske"
        />
        <InfoBlock head="Avalik statistika" body="Arvesta aine koormusega" />
        <InfoBlock head="Stressiprognoos" body="Tegutse ennetavalt" />
      </div>
    </div>
    <a
      href="https://github.com/var-pi/under-pressure-public"
      target="_blank"
      style="color: inherit"
    >
      <FontAwesomeIcon id="github-icon" :icon="['fab', 'github']" size="2x" />
    </a>
  </section>
</template>

<script setup lang="ts">
import InfoBlock from "@/components/home/InfoBlock.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>

<style lang="scss" scoped>
@import "@/styles/font";

section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("../../../assets/chart-example.png");
    background-size: cover;
    background-position: center;
    opacity: 0.1;
    z-index: -1;
  }

  #description-wrapper {
    display: flex;
    @media screen and (max-width: 1000px) {
      flex-direction: column;
    }
    .column {
      text-align: center;
      display: flex;
      flex-direction: column;
      & > h1 {
        @include default-font;
        color: var(--col-fg-default);
      }
      & > :not(h1) {
        margin: var(--default-margin);
      }
    }
  }

  #github-icon {
    position: absolute;
    bottom: 0;
    left: 50%;
    translate: -50%;
    padding: var(--default-margin);
  }
}
</style>
