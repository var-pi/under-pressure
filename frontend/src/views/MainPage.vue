<template>
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
</style>