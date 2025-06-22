<template>
  <section class="d-flex">
    <div
      v-for="index in Array.from({ length: 5 }, (_, i) => i)"
      :key="index"
      class="star"
      @click="setSelectedScore(index + 1)"
      @mouseover="hoverScore = index + 1"
      @mouseleave="hoverScore = selectedScore"
    >
      <i
        :class="['bi', hoverScore >= index + 1 ? 'bi-star-fill' : 'bi-star']"
        style="color: goldenrod; cursor: pointer"
      ></i>
    </div>
  </section>
</template>

<script>
export default {
  name: "starsSelectable",
  props: ["selectedScore", "setSelectedScore"],
  mounted() {},
  data() {
    return {
      hoverScore: 0,
    };
  },
  methods: {},
  computed: {},
  watch: {
    selectedScore(newValue) {
      this.hoverScore = newValue;
    },
  },
};
</script>

<style scoped>
.star {
  padding: 0px 4px;
}
</style>
