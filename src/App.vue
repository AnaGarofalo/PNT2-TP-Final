<template>
  <Navbar v-if="!isUnlogedRoute" />
  <RouterView />
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { RoutesDefinition } from "./router.js";

export default {
  name: "app",
  components: {
    Navbar,
  },
  computed: {
    isUnlogedRoute() {
      const [route] = Object.keys(RoutesDefinition).filter(
        (routeName) => RoutesDefinition[routeName].path === this.$route.path
      );
      return route ? !RoutesDefinition[route].requiresLogin : false;
    },
  },
};
</script>
