<template>
  <div class="dropdown">
    <button id="dropbtn" @click="toggleMenu">
      My subjects
    </button>
    <div v-if="isDropdownVisible" class="dropdown-content">
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
          @click="$emit('handleSelectedSubjectUpdate', subject.text)">
          {{ subject.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps<{
  personalSubjects: string[];
}>();

const emits = defineEmits(["handleSelectedSubjectUpdate"]);

const filter = ref("");
const isDropdownVisible = ref(false);

const filteredSubjects = computed(() => {
  const filterText = filter.value.toUpperCase();
  return props.personalSubjects.map((subject) => ({
    text: subject,
    display: subject.toUpperCase().includes(filterText) ? "block" : "none",
  }));
});

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