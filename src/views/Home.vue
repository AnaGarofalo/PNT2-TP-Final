<template>
  <section class="row m-0 fluid-container">
    <SideBar :selectedName="selectedName" :setSelectedName="setSelectedName" />
    <div
      class="col d-flex flex-wrap justify-content-around p-3 gap-3 games-container align-items-center"
    >
      <div
        v-if="games.length && !filteredGames.length"
        class="d-flex no-found-container"
      >
        <h3 style="margin-bottom: 0px">No games found.</h3>
        <TextButton
          title="Clear filters"
          :onClick="clearFilters"
          fSize="1.75rem"
        />
      </div>
      <GameCard
        v-for="game of filteredGames"
        :key="game.id"
        :game="game"
        class="card game-card"
      />
    </div>
  </section>
</template>

<script>
import GameService from "../services/GameService.js";
import GameCard from "../components/GameCard.vue";
import TextButton from "../components/TextButton.vue";
import SideBar from "../components/SideBar.vue";
export default {
  name: "home",
  components: {
    GameCard,
    SideBar,
    TextButton,
  },
  props: [],
  mounted() {
    this.gameService.getAll().then((res) => {
      this.games = res;
    });
  },
  data() {
    return {
      gameService: new GameService(),
      games: [],
      genres: [],

      selectedGenres: [],
      selectedScore: null,
      selectedName: "",
    };
  },
  methods: {
    clearFilters() {
      this.selectedGenres = [];
      this.selectedScore = null;
      this.selectedName = "";
    },
    setSelectedName(event) {
      this.selectedName = event.target.value;
    },
    filterByName(arr) {
      if (!this.selectedName.length) return arr;
      else return arr.filter((game) => game.title.includes(this.selectedName));
    },
  },
  computed: {
    filteredGames() {
      return this.filterByName(this.games);
    },
  },
};
</script>

<style scoped>
.games-container {
  background-color: var(--accent-beige);
  margin-left: 14rem;
  height: 100%;
  max-height: 100%;
  overflow: auto;
}

.no-found-container {
  height: 100px;
  align-items: center;
}
</style>
