<template>
    <div class="col bg-primary side-bar">
        <div class="input-search">
            <label for="search">Search:</label>
            <input type="text" id="search" name="search" placeholder="Search" class="form-control">
        </div>
        
    </div>
  
</template>

<script>
export default {
  name: "SideBar",
  props: [],
  mounted() {
  },
  data() {
    return {
    };
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
}
.input-search{
    margin-top: 10px;
    padding: 2px;
}
</style>
