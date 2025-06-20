<template>
  <section class="card game-card">
    <div class="card-header">
      <h3>{{ game.title }}</h3>
    </div>

    <div class="card-body"></div>
  </section>
</template>

<script>
import GameService from "../services/GameService.js";
export default {
  name: "gameCard",
  props: ["game"],
  mounted() {},
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
  width: 15rem;
}
</style>
