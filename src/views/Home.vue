<template>
  <section class="row m-0 fluid-container">
    <SideBar />
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
import SideBar from "../components/SideBar.vue";
export default {
  name: "home",
  components: {
    GameCard,
    SideBar
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


.games-container {
  background-color: rgb(32, 32, 32);
  margin-left: 14rem;
  height: 100%;
  max-height: 100%;
  overflow: auto;
  
}
.games-container:hover .game-card:not(:hover){
  filter: grayscale(75%);
}

</style>
