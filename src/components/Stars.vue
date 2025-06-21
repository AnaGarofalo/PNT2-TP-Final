<template>
  <section class="d-flex gap-2">
    <div v-for="index in Array.from({ length: 5 }, (_, i) => i)" :key="index">
      <i
        v-if="score >= index + 1"
        class="bi bi-star-fill"
        style="color: goldenrod"
      ></i>
      <i
        v-else-if="score >= index + 0.5"
        class="bi bi-star-half"
        style="color: goldenrod"
      ></i>
      <i v-else class="bi bi-star" style="color: goldenrod"></i>
    </div>
  </section>
</template>

<script>
export default {
  name: "stars",
  props: ["score"],
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scoped></style>
