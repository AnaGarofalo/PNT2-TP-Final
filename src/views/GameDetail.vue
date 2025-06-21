<template>
  <section class="row m-0 fluid-container">
    <div v-if="game === null">Loading...</div>
    <div v-else>
      <div>
        <h2>{{ game.title }}</h2>
        <Stars :score="averageScore" />
        <p>{{ game.description }}</p>
        <div class="d-flex">
          <div v-for="genre of game.Genres" class="p-2">{{ genre.title }}</div>
        </div>
      </div>

      <h3>Reviews</h3>
      <div>
        <div v-for="review of game.Reviews">
          <div class="d-flex">
            <p>{{ review.User.name }}</p>
            <Stars :score="review.score" />
            <p>{{ review.comment }}</p>
          </div>
        </div>
      </div>
      <AddReviewModal />
    </div>
  </section>
</template>

<script>
import Stars from "../components/Stars.vue";
import GameService from "../services/GameService.js";
import AddReviewModal from "../components/AddReviewModal.vue";

export default {
  name: "gameDetail",
  components: {
    Stars,
    AddReviewModal,
  },
  props: [],
  mounted() {
    const id = this.$route.params.id;
    this.gameService.getById(id).then((res) => {
      this.game = res;
    });
  },
  data() {
    return {
      gameService: new GameService(),
      game: null,
    };
  },
  methods: {},
  computed: {
    averageScore() {
      if (this.game === null) return 0;
      return (
        this.game.Reviews.reduce((sum, review) => {
          return sum + parseFloat(review.score);
        }, 0) / this.game.Reviews.length
      );
    },
  },
};
</script>

<style scoped></style>
