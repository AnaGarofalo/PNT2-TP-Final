<template>
  <div
    v-if="!!review"
    class="d-flex flex-column review-container p-4 rounded-1"
  >
    <div class="d-flex align-items-center justify-content-between">
      <div class="d-flex gap-2">
        <div
          class="profile-picture"
          :style="{ backgroundImage: `url(${review.User.profilePicture})` }"
        ></div>
        <p>{{ review.User.name }}</p>
      </div>

      <Stars :score="review.score" />
    </div>
    <p class="m-0">{{ review.comment }}</p>
  </div>
</template>

<script>
import Stars from "./Stars.vue";

export default {
  name: "review",
  props: ["review"],
  components: {
    Stars,
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
.profile-picture {
  width: 24px;
  height: 24px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 4px;
}

.review-container {
  background-color: var(--purple-dark-faded);
  border: 2px solid var(--purple-dark);
  color: var(--accent-beige);
  max-width: 900px;
  margin: 0px 12px;
}
</style>
