<template>
  <Navbar v-if="$route.path !== '/login'" />
  <RouterView />
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "app",
  components: {
    Navbar,
  },
  mounted() {},
  data() {
    return {
      route: this.$route.path,
    };
  },
};
</script>
