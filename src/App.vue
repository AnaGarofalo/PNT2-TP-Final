<template>
  <Navbar v-if="!isUnlogedRoute" />
  <RouterView
    :style="{
      height: !isUnlogedRoute ? 'calc(100vh - 56px)' : '100vh',
      marginTop: !isUnlogedRoute ? '56px' : '0px',
      overflow: 'auto',
    }"
  />
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
