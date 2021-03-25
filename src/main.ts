import { createApp } from "vue";
// import { AxiosInstance} from "axios";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Http from "./libs/http";
declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $http: Http;
  }
}
const http: Http = new Http();
const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
app.config.globalProperties.$http = http;
