import { createApp } from "vue";
import MainApp from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import http from "./libs/http";
import { AxiosInstance } from "axios";
// import Axios from "axios";
declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}
const app = createApp(MainApp)
  .use(store)
  .use(router)
  .mount("#app");

app.config.globalProperties.$http = http;
