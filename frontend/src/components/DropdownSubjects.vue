<template>
  <div class="dropdown">
    <button @click="toggleMenu" id="dropbtn">Dropdown</button>
    <div v-if="isDropdownVisible" class="dropdown-content">
      <input id="search-bar" type="text" placeholder="Otsi" v-model="filter" />
      <div class="scrollable-content">
        <button v-for="subject in filteredSubjects"
                :key="subject.text"
                :style="{ display: subject.display }"
                @click="selectSubject(subject.text)">
          {{ subject.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Script in Composition API
import { ref, computed, PropType } from 'vue';

// Interface for the structure of a subject item
interface DropdownSubjectsProps {
  subjects: string[];
}

// Exporting the Vue component
export default {
  // Prop definition for subjects array
  props: {
    subjects: {
      type: Array as PropType<string[]>, // Explicitly define the type of subjects
      default: () => [],
    },
  },
  // Setup function for reactive data and component logic
  setup(props: DropdownSubjectsProps, { emit }) {
    
    // Reactive reference for the filter text
    const filter = ref('');
    // Reactive reference for dropdown visibility
    const isDropdownVisible = ref(false);

    // Computed property for filtered subjects based on the filter text
    const filteredSubjects = computed(() => {
      const filterText = filter.value.toUpperCase();
      // Map subjects to SubjectItem structure with text and display properties
      return props.subjects.map((subject: string) => ({
        text: subject,
        display: subject.toUpperCase().includes(filterText) ? 'block' : 'none',
      }));
    });

    // Method to toggle dropdown visibility
    const toggleMenu = () => {
      isDropdownVisible.value = !isDropdownVisible.value;
    };

    // Method to handle button click for a subject
    const selectSubject = (subjectText: string) => {
      emit('update:selectedSubject', subjectText);
    };

    // Return reactive data and methods for external use
    return {
      filter,
      isDropdownVisible,
      filteredSubjects,
      toggleMenu,
      selectSubject,
    };
  },
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