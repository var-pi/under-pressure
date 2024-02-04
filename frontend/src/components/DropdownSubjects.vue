<template>
  <div class="dropdown">
    <button id="dropbtn" @click="toggleMenu">
      Subjects
    </button>
    <div
      v-if="isDropdownVisible"
      class="dropdown-content">
      <input
        id="search-bar"
        v-model="filter"
        type="text"
        placeholder="Otsi" />
      <div class="scrollable-content">
        <button
          v-for="subject in filteredSubjects"
          :key="subject.text"
          :style="{ display: subject.display }"
          class="menubtn"
          @click="$emit('newSelectedSubject', subject.text)">
          {{ subject.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Script in Composition API
import { ref, computed, defineProps, defineEmits } from "vue";

// Prop definition for subjects array
const props = defineProps<{
  subjects: string[];
}>();

// Declare emitted event
const emits = defineEmits(["newSelectedSubject"]);

// Reactive reference for the filter text
const filter = ref<string>("");
// Reactive reference for dropdown visibility
const isDropdownVisible = ref(false);

// Computed property for filtered subjects based on the filter text
const filteredSubjects = computed(function () {
  const filterText = filter.value.toUpperCase();
  // Map subjects to SubjectItem structure with text and display properties
  return props.subjects.map(function (subject) {
    return {
      text: subject,
      display: subject.toUpperCase().includes(filterText) ? "block" : "none",
    };
  });
});

// Method to toggle dropdown visibility
function toggleMenu() {
  isDropdownVisible.value = !isDropdownVisible.value;
}

// Ensure emits is used, even if it's not used explicitly in your component
console.log(emits);
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
