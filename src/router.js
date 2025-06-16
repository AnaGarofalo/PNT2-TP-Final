import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/Login.vue";
import SignUp from "./views/SignUp.vue";
import Home from "./views/Home.vue";
import { useUserStore } from "./store/userStore";

export const RoutesDefinition = {
  home: {
    path: "/home",
    component: Home,
    requiresLogin: true,
  },
  login: {
    path: "/login",
    component: Login,
    requiresLogin: false,
  },
  signup: {
    path: "/signup",
    component: SignUp,
    requiresLogin: false,
  },
};

const routes = [{ path: "/", redirect: RoutesDefinition.login.path }];

Object.values(RoutesDefinition).forEach(
  ({ path, component, requiresLogin }) => {
    routes.push({
      path,
      component,
      meta: {
        requiresLogin,
      },
    });
  }
);

const unregisteredRoute = {
  path: "/:pathmatch(.*)*",
  redirect: RoutesDefinition.login.path,
};

routes.push(unregisteredRoute);
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  const isLoggedIn = !!userStore.getUser;

  // if route requires user to be logged in, redirects to login
  if (to.meta.requiresLogin && !isLoggedIn) {
    return next(RoutesDefinition.login.path);
  }

  // if route requires user to be logged in, redirects to home
  if (!to.meta.requiresLogin && isLoggedIn) {
    return next(RoutesDefinition.home.path);
  }

  next();
});

export default router;
