<template>
  <div class="dropdown">
    <button @click="toggleMenu" id="dropbtn">Dropdown</button>
    <div v-if="isDropdownVisible" class="dropdown-content">
      <input id="search-bar" type="text" placeholder="Otsi" v-model="filter">
      <div class="scrollable-content">
        <button v-for="subject in filteredSubjects" 
                :key="subject.text" 
                :style="{ display: subject.display }" 
                @click="handleButtonClick(subject.text)">
          {{ subject.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    // Prop to receive the slider value from the parent component
    subjects: {
      type: Array,
      default: () => [],
    },
  },
  data(): {
    filter: string;
    isDropdownVisible: boolean;
  } {
    return {
      filter: "",
      isDropdownVisible: false,
    };
  },
  computed: {
    filteredSubjects(): Array<{ text: string; display: string }> {
      const filter = this.filter.toUpperCase();
      return (this.subjects as string[]).map((subject) => ({
        text: subject,
        display: subject.toUpperCase().indexOf(filter) > -1 ? "block" : "none",
      }));
    },
  },
  methods: {
    toggleMenu(this: any): void {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    handleButtonClick(subjectText: string): void {
      // Handle button click for the selected itemText
      console.log(`Button clicked for item: ${subjectText}`);
      // TODO: fetch info according to subject
    },
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
