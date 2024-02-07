<template>
  <button id="settings-btn">
    Settings
  </button>
  <div id="contents">
    <LineGraph
      :new-selected-subject="newSelectedSubject" />
    <div id="dropdown-menus">
      <DropdownSubjects id="all-subjects" />
      <DropdownPersonalSubjects
        id="personal-subjects"
        @handle-selected-subject-update="updateSelectedSubject" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DropdownSubjects from "@/components/DropdownSubjects.vue";
import DropdownPersonalSubjects from "@/components/DropdownPersonalSubjects.vue";
import LineGraph from "@/components/LineGraph.vue";

const newSelectedSubject = ref("")

function updateSelectedSubject(subject: string) {
  newSelectedSubject.value = subject;
}
</script>

<style scoped>
@import "@/styles/colors/colors.css";

#dropdown-menus {
  display: flex;
  justify-content: center;
}
#all-subjects {
  margin: 1cap;
}
#personal-subjects {
  margin: 1cap;
}
#settings-btn {
    max-width: 70px;
    max-height: 70px;
    width: 10vw;
    height: 10vw;
    aspect-ratio: 1/1;
    margin: 10px;
    position: fixed;
    top: 10px;
    right: 10px;
}

@media screen and (max-width: 550px) {

  #settings-btn {
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    margin: 5px;
  }
}

@media screen and (max-width: 400px) {

  #settings-btn {
    width: 20px;
    height: 20px;
    margin: 5px;
  }
}
</style>