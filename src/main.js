import "./assets/main.css";
import axios from "axios";
import { createPinia } from "pinia";
import { baseUrl } from "../env.json";
import { createApp } from "vue";
import App from "./App.vue";

import "./bootstrap";
import router from "./router";

axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true;

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount("#app");
