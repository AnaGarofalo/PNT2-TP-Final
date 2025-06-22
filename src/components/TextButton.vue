<template>
  <p class="text-button" @click="onClick" :style="{ fontSize: fSize }">
    {{ title }}
  </p>
</template>

<script>
export default {
  name: "textButton",
  props: ["title", "onClick", "fSize"],
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scoped></style>
