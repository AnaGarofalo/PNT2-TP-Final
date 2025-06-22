<template>
  <div class="d-flex flex-column justify-content-around side-bar">
    <div class="input-search">
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search by Name..."
        class="form-control base-input"
        :value="selectedName"
        @input="setSelectedName"
      />
    </div>

    <div>
      <label class="form-check-label" for="checkDefault">
        Filter by Score
      </label>
      <div class="d-flex align-items-center justify-content-between">
        <StarsSelectable
          :selectedScore="selectedScore"
          :setSelectedScore="setSelectedScore"
        />
        <button class="btn secondary-button" @click="setSelectedScore(null)">
          Clear
        </button>
      </div>
    </div>

    <div class="d-flex flex-column gap-2">
      <div v-for="genre of genres" class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          :checked="selectedGenres.includes(genre.id)"
          @change="handleCheckboxChange(genre)"
          id="checkDefault"
        />
        <label class="form-check-label" for="checkDefault">
          {{ genre.title }}
        </label>
      </div>
    </div>

    <button class="btn primary-button w-100" @click="clearFilters">
      Clear All
    </button>
  </div>
</template>

<script>
import GenreService from "../services/GenreService";
import StarsSelectable from "./StarsSelectable.vue";

export default {
  name: "SideBar",
  props: [
    "selectedName",
    "setSelectedName",
    "selectedGenres",
    "setSelectedGenres",
    "selectedScore",
    "setSelectedScore",
    "clearFilters",
  ],
  components: {
    StarsSelectable,
  },
  async mounted() {
    this.genres = await this.genreService.getAll();
  },
  data() {
    return {
      genreService: new GenreService(),
      genres: [],
    };
  },
  methods: {
    handleCheckboxChange(genre) {
      const genreIsSelected = this.selectedGenres.includes(genre.id);
      let newGenresSelected;
      if (genreIsSelected) {
        newGenresSelected = this.selectedGenres.filter((id) => id !== genre.id);
      } else {
        newGenresSelected = [...this.selectedGenres, genre.id];
      }
      this.setSelectedGenres(newGenresSelected);
    },
  },
  computed: {},
};
</script>

<style scoped>
.side-bar {
  max-width: 14rem;
  height: calc(100vh - 56px);
  position: fixed;
  background-color: var(--purple-medium);
}
.input-search {
  padding: 2px;
}

.form-check-label {
  color: var(--accent-beige);
}

.form-check-input:checked {
  background-color: var(--accent-pink);
  border-color: var(--accent-beige);
  color: var(--accent-beige);
}

.form-check-input:focus {
  box-shadow: none;
  border-color: var(--accent-beige);
}
</style>
