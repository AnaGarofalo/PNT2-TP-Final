import { defineStore } from "pinia";

const initialState = {
  user: null,
};

export const useUserStore = defineStore("user", {
  state: () => {
    const storageJSONUser = localStorage.getItem("user");
    if (storageJSONUser) {
      return { user: JSON.parse(storageJSONUser) };
    }
    return initialState;
  },
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    setUser(user) {
      localStorage.setItem("user", JSON.stringify(user));
      this.user = user;
    },

    removeUser() {
      localStorage.removeItem("user");
      this.user = null;
    },
  },
});
