import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import http from "./libs/http";
import { AxiosInstance } from "axios";
declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}
const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");

app.config.globalProperties.$http = http;
