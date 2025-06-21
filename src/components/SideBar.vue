<template>
  <div class="col side-bar">
    <div class="input-search">
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search by Name..."
        class="form-control"
        :value="selectedName"
        @input="setSelectedName"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: ["selectedName", "setSelectedName"],
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
.side-bar {
  max-width: 14rem;
  height: 100%;
  position: fixed;
  background-color: var(--purple-medium);
}
.input-search {
  margin-top: 10px;
  padding: 2px;
}
</style>
