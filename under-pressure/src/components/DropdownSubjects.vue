<template>
  <div class="dropdown">
    <button @click="toggleMenu" id="dropbtn">Dropdown</button>
    <div v-if="isDropdownVisible" class="dropdown-content">
      <input id="search-bar" type="text" placeholder="Otsi" v-model="filter">
      <div class="scrollable-content">
        <button v-for="item in filteredItems" 
        :key="item.text" 
        :style="{ display: item.display }" 
        @click="handleButtonClick(item.text)">
        {{ item.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      filter: "",
      isDropdownVisible: false,
      items: [
        { text: "Kõrgem matemaatika I", display: "block" },
        { text: "Matemaatiline maailmapilt", display: "block" },
        { text: "Programmeerimine I", display: "block" },
        { text: "Algebra I", display: "block" },
        { text: "Algoritmid ja andmestruktuurid", display: "block" },
        { text: "Programmeerimine II", display: "block" },
        { text: "Andmebaasid", display: "block" },
        { text: "Mitme muutuja matemaatiline analüüs", display: "block" },
        { text: "Tarkvaratehnika", display: "block" },
        { text: "Veebirakenduse loomine", display: "block" },
        { text: "Terved hambad kõigile", display: "block" },
      ],
    };
  },
  computed: {
    filteredItems() {
      const filter = this.filter.toUpperCase();
      return this.items.map(item => ({
        text: item.text,
        display: item.text.toUpperCase().indexOf(filter) > -1 ? "block" : "none",
      }));
    },
  },
  methods: {
    toggleMenu() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    handleButtonClick(itemText: string) {
      // Handle button click for the selected itemText
      console.log(`Button clicked for item: ${itemText}`);
      // TODO: fetch info according to subject
      this.$emit('button-clicked', itemText);
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
