<template>
  <button id="menu-btn" @click="openModal">
    <span></span>
    <span></span>
    <span></span>
  </button>
  <ModalMenu
    id="menuModal"
    :is-open="isModalOpened"
    @modal-close="closeModal"
  />
  <div id="contents">
    <LineGraph :new-selected-subject="newSelectedSubject">
      <DropdownPersonalSubjects
        @handle-selected-subject-update="updateSelectedSubject"
      />
    </LineGraph>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DropdownPersonalSubjects from "@/components/DropdownPersonalSubjects.vue";
import LineGraph from "@/components/LineGraph.vue";
import ModalMenu from "@/components/ModalMenu.vue";

const newSelectedSubject = ref("");
let isModalOpened = ref(false);

function updateSelectedSubject(subject: string) {
  newSelectedSubject.value = subject;
}

const openModal = () => {
  isModalOpened.value = true;
};
const closeModal = () => {
  isModalOpened.value = false;
};
</script>

<style scoped>
@import "@/styles/colors/colors.css";

#menu-btn {
  position: absolute;
  width: 35px;
  height: 25px;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
}
#menu-btn > span {
  display: block;
  background-color: var(--col-3);
  margin: 5px 0;
  height: 5px;
  width: 35px;
  max-width: 49px;
}
#menu-btn > span:nth-child(1) {
  margin-top: 0px;
}
#menu-btn > span:nth-child(3) {
  margin-bottom: 0px;
}
@media screen and (max-width: 550px) {
  #menu-btn {
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    margin: 5px;
  }
  #menu-btn > span {
    margin: 6px 0;
    height: 6px;
    width: 30px;
  }
}
@media screen and (max-width: 400px) {
  #menu-btn {
    width: 20px;
    height: 20px;
  }
  #menu-btn > span {
    margin: 4px 0;
    height: 4px;
    width: 20px;
  }
}
</style>

