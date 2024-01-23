<template>
  <div class="dropdown">
    <button id="dropbtn" @click="toggleMenu">My subjects</button>
    <div v-if="isDropdownVisible" 
    class="dropdown-content">
      <input id="search-bar" type="text" v-model="filter" placeholder="Otsi"/>
      <div class="scrollable-content">
        <button
          v-for="subject in filteredSubjects"
          :key="subject.text"
          :style="{ display: subject.display }"
          @click="$emit('addSelectedSubject', subject.text)"
          class="menubtn">
          {{ subject.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Script in Composition API
import { ref, computed, defineProps } from "vue";

// Prop definition for subjects array
const props = defineProps<{
  personalSubjects: string[];
}>();

// Reactive reference for the filter text
const filter = ref("");
// Reactive reference for dropdown visibility
const isDropdownVisible = ref(false);

// Computed property for filtered subjects based on the filter text
const filteredSubjects = computed(() => {
  const filterText = filter.value.toUpperCase();
  // Map subjects to SubjectItem structure with text and display properties
  return props.personalSubjects.map((subject: string) => ({
    text: subject,
    display: subject.toUpperCase().includes(filterText) ? "block" : "none",
  }));
});

// Method to toggle dropdown visibility
const toggleMenu = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};
</script>

<style scoped>
.dropdown-content {
  width: 200px;
  align-self: center;
}
.scrollable-content {
  max-height: 200px;
  overflow-y: scroll;
}
.dropdown {
  display: flex;
  flex-direction: column;
  align-content: center;
}
#dropbtn {
  width: 100px;
  align-self: center;
}
#search-bar {
  width: 190px;
}
</style>

