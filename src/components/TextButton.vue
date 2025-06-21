<template>
  <p class="my-btn" @click="onClick" :style="{ fontSize: fSize }">
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

<style scoped>
.my-btn {
  color: var(--accent-pink);
  padding: 0px 5px;
  cursor: pointer;
  margin: 0px;
}

.my-btn:active {
  text-shadow: 0px 0px 2px var(--accent-pink);
}
</style>
