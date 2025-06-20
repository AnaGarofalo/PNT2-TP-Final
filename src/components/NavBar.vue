<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">Bienvenidos!</RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <!-- <li class="nav-item">
            <RouterLink class="nav-link" to="/formulario"
              >Formulario</RouterLink
            >
          </li> -->
          <!-- <li class="nav-item">
            <RouterLink class="nav-link" to="/usuarios">Usuarios</RouterLink>
          </li> -->
        </ul>
      </div>

      <button class="btn btn-danger" @click="logout()">Logout</button>
    </div>
  </nav>
</template>

<script>
import { useUserStore } from "../store/userStore.js";
import { RoutesDefinition } from "../router.js";

export default {
  name: "navbar",
  data() {
    return {
      userStore: useUserStore(),
    };
  },
  methods: {
    logout() {
      document.cookie = "token=; Max-Age=0; path=/";
      this.userStore.removeUser();
      this.$router.push(RoutesDefinition.login.path);
    },
  },
};
</script>

<style scoped></style>
