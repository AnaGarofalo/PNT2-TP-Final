<template>
  <section class="row m-0 fluid-container">
    <div class="col bg-primary side-bar">SideBar</div>

    <div
      class="col d-flex flex-wrap justify-content-around p-3 gap-3 games-container"
    >
      <GameCard
        v-for="game of games"
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
export default {
  name: "home",
  components: {
    GameCard,
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
    };
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
.side-bar {
  max-width: 14rem;
  height: 100%;
  position: fixed;
}

.games-container {
  background-color: pink;
  margin-left: 14rem;
  height: 100%;
  max-height: 100%;
  overflow: auto;
}
</style>
