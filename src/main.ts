import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { store } from "./store";
import Http from "./libs/http";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
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
