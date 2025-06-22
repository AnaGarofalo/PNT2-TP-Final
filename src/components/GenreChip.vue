<template>
  <section class="genre-chip">
    {{ title }}
  </section>
</template>

<script>
export default {
  name: "genreChip",
  props: ["title"],
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
.genre-chip {
  background-color: antiquewhite;
  border-radius: 20px;
  padding: 2px;
  width: 90px;
  text-align: center;
}
</style>
