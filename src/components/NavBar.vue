<template>
  <nav class="navbar navbar-expand-md navbar-dark my-navbar">
    <div class="container-fluid">
      <RouterLink class="navbar-brand my-link" to="/">Home</RouterLink>

      <div v-if="user" class="d-flex gap-3 align-items-center">
        <div class="d-flex gap-1 align-items-center">
          <div
            class="profile-picture"
            :style="{ backgroundImage: `url(${user.profilePicture})` }"
          ></div>
          <p class="username">{{ user.name }}</p>
        </div>
        <button class="btn secondary-button" @click="logout()">
          <i class="bi bi-door-closed"></i>
          Logout
        </button>
      </div>
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
      user: null,
    };
  },
  methods: {
    logout() {
      document.cookie = "token=; Max-Age=0; path=/";
      this.userStore.removeUser();
      this.$router.push(RoutesDefinition.login.path);
    },
  },
  mounted() {
    this.user = this.userStore.getUser;
  },
};
</script>

<style scoped>
.my-navbar {
  background-color: var(--purple-dark);
}

.my-link {
  color: var(--accent-beige);
}

.username {
  color: var(--accent-beige);
  margin: 0px;
}

.profile-picture {
  width: 36px;
  height: 36px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
}
</style>
