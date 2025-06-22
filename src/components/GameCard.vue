<template>
  <section class="card game-card" @click="navigateToGameDetail(game.id)">
    <div
      class="card-body"
      :style="{ backgroundImage: `url(${game.image})` }"
    ></div>
    <div class="card-footer">
      <h3 class="game-title">{{ game.title }}</h3>
      <Stars :score="game.averageScore" />
      <div
        class="d-flex flex-wrap gap-1 align-items-center justify-content-around mt-2"
      >
        <GenreChip v-for="genre of game.Genres" :title="genre.title" />
      </div>
    </div>
  </section>
</template>

<script>
import Stars from "../components/Stars.vue";
import { RoutesDefinition } from "../router.js";
import GenreChip from "./GenreChip.vue";

export default {
  name: "gameCard",
  props: ["game"],
  components: {
    Stars,
    GenreChip,
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {
    navigateToGameDetail(id) {
      this.$router.push(RoutesDefinition.gameDetail.generatePath(id));
    },
  },
  computed: {},
};
</script>

<style scoped>
.game-card {
  position: relative;
  width: 20rem;
  height: 25rem;
  border: solid 2px rgba(0, 0, 0, 0.945);
  background-color: var(--purple-dark);
}
.card-body {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border: solid 1px rgba(0, 0, 0, 0.945);
  filter: grayscale(75%);
  border-radius: 4px 4px 0px 0px;
  border: none;
}

.game-card:hover .card-body {
  filter: grayscale(0%);
}

.game-card:hover {
  transform: scale(1.03);
  transition: all ease-in-out 200ms;
  border-color: var(--accent-pink);
  box-shadow: 0px 0px 43px -8px var(--accent-pink);
  cursor: pointer;
}

.game-title {
  transition: all ease-in-out 200ms;
  margin-bottom: 0px;
  width: 100%;
  color: var(--accent-green);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Courier New", Courier, monospace;
  font-weight: 800;
  font-size: 24px;
}

.game-card:hover .game-title {
  text-shadow: 0px 0px 2px var(--accent-beige);
  transition: all ease-in-out 200ms;
}
</style>
