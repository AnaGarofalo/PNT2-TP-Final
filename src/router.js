import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/Login.vue";

const routes = [
  { path: "/", redirect: "/login" },

  { path: "/login", component: Login },
  // { path: "/usuarios", component: Usuarios },

  { path: "/:pathmatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
