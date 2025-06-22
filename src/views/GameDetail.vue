<template>
  <section
    class="m-0 fluid-container home-background d-flex justify-content-center game-detail-background"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <div v-if="game === null">Loading...</div>
    <div v-else>
      <div class="d-flex gap-3 m-3 p-4 radius-5 game-info-container rounded-4">
        <div
          class="game-image"
          :style="{ backgroundImage: `url(${game.image})` }"
        ></div>

        <div class="d-flex flex-column gap-3">
          <h2 class="game-title">{{ game.title }}</h2>

          <div>
            <div class="d-flex gap-2 align-items-end my-2">
              <h5 class="m-0">Score:</h5>
              <Stars :score="averageScore" />
              <p class="score m-0">({{ averageScore.toFixed(1) }})</p>
            </div>
            <p>{{ game.description }}</p>
          </div>
          <h5 class="m-0">Categories:</h5>
          <div class="d-flex">
            <div v-for="genre of game.Genres" class="p-2">
              {{ genre.title }}
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center justify-content-between m-3">
        <button class="btn medium-purple-button" @click="setOrderBy">
          Order by Score
          <i
            :class="[
              'bi',
              orderBy === 'DESC' ? 'bi-arrow-up' : 'bi-arrow-down',
            ]"
          ></i>
        </button>
        <AddReviewModal :gameId="game.id" :addReview="addReview" />
      </div>

      <div class="d-flex flex-column gap-3 reviews-container">
        <Review v-for="review of orderedReviews" :review="review" />
      </div>
    </div>
  </section>
</template>

<script>
import Stars from "../components/Stars.vue";
import GameService from "../services/GameService.js";
import AddReviewModal from "../components/AddReviewModal.vue";
import backgroundImage from "@/assets/background-image.png";
import Review from "../components/Review.vue";

export default {
  name: "gameDetail",
  components: {
    Stars,
    AddReviewModal,
    Review,
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
      backgroundImage,
      gameService: new GameService(),
      game: null,
      orderBy: null,
    };
  },
  methods: {
    addReview(review) {
      this.game.Reviews.push(review);
    },
    setOrderBy() {
      if (!this.orderBy || this.orderBy === "ASC") this.orderBy = "DESC";
      else this.orderBy = "ASC";
    },
  },
  computed: {
    averageScore() {
      if (this.game === null) return 0;
      return (
        this.game.Reviews.reduce((sum, review) => {
          return sum + parseFloat(review.score);
        }, 0) / this.game.Reviews.length
      );
    },
    orderedReviews() {
      if (!this.game) return [];
      if (this.orderBy === "ASC")
        return this.game.Reviews.sort((a, b) => a.score - b.score);
      else if (this.orderBy === "DESC")
        return this.game.Reviews.sort((a, b) => b.score - a.score);
      else return this.game.Reviews;
    },
  },
};
</script>

<style scoped>
.game-detail-background {
  /* height: calc(100vh - 56px);
  max-height: calc(100vh - 56px);
  overflow: auto; */
}

.game-info-container {
  background-color: var(--purple-faded);
  border: 2px solid var(--purple-medium);
  color: var(--accent-beige);
  max-width: 900px;
}

.game-image {
  min-width: 220px;
  height: 300px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border: solid 2px var(--purple-medium);
  border-radius: 8px;
}

.game-title {
  margin-bottom: 0px;
  max-width: 400px;
  color: var(--accent-beige);
  font-family: "Courier New", Courier, monospace;
  font-weight: 1000;
  font-size: 42px;
}

.score {
  font-family: "Courier New", Courier, monospace;
  line-height: 20px;
}
</style>
