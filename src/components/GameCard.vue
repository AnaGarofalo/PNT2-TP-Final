<template>
  <section class="card game-card">
    <div class="card-body" :style="{ backgroundImage: `url(${game.image})` }">
      <h3 class="game-title">{{ game.title }}</h3>
    </div>
  </section>
</template>

<script>
import GameService from "../services/GameService.js";
export default {
  name: "gameCard",
  props: ["game"],
  mounted() {
    console.log("Datos recibidos por gameCard:", this.game);
  },
  data() {
    return {
      gameService: new GameService(),
    };
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
.game-card {
  position: relative;
  width: 20rem;
  height: 25rem;
  border: solid 1px rgba(0, 0, 0, 0.945);
}
.card-body {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border: solid 1px rgba(0, 0, 0, 0.945);
}

.game-card:hover {
  transform: scale(1.03);
  transition: all ease-in-out 200ms;
}

.game-title {
  color: transparent;
  transition: all ease-in-out 200ms;
  position: absolute;
  padding: 5px;
  bottom: 0px;
  left: 0px;
  width: 100%;
}

.game-card:hover .game-title {

  color: rgb(255, 255, 255);
  text-shadow: 0px 0px 2px rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.488);
  border: solid 1px rgba(255, 255, 255, 0.096);
  transition: all ease-in-out 200ms;
}


</style>
