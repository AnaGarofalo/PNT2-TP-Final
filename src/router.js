import { createRouter, createWebHistory } from "vue-router";
import Formulario from "./components/Formulario.vue";
import Usuarios from "./components/Usuarios.vue";

const routes = [
  { path: "/", redirect: "/formulario" },

  { path: "/formulario", component: Formulario },
  { path: "/usuarios", component: Usuarios },

  { path: "/:pathmatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
