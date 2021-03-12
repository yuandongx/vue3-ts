import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";
import Main from "../views/Main.vue";
import routeitem1s from "./routes";
import "../components/ssh/index.vue";
const componentsPath = "../components/";
const subRotes = routeitem1s.map(item1 => {
  if (item1.children !== undefined && item1.children !== []) {
    const route: RouteRecordRaw = {
      path: item1.routePath,
      // components: {
      //   "app-content": () => import(componentsPath + item1.componentPath + "/index.vue")
      // },
      component: () => import("../components/cluster/index.vue"),
      name: item1.name,
      children: item1.children.map(item2 => {
        if (item2.children !== undefined && item2.children !== []) {
          const route: RouteRecordRaw = {
            path: item2.routePath,
            component: () => import("../components/cluster/index.vue"),
            name: item2.name,
            children: item2.children.map(item3 => {
              if (item3.children !== undefined && item3.children !== []) {
                const route: RouteRecordRaw = {
                  path: item3.routePath,
                  component: () => import("../components/cluster/index.vue"),
                  name: item3.name,
                  children: item3.children.map(item => {
                    const route: RouteRecordRaw = {
                      path: item.routePath,
                      name: item.name,
                      component: () => import("../components/cluster/index.vue"),
                    };
                    return route;
                  })
                };
                return route;
              } else {
                const route: RouteRecordRaw = {
                  path: item3.routePath,
                  name: item3.name,
                  component: () => import("../components/cluster/index.vue"),
                };
                return route;
              }
            })
          };
          return route;
        } else {
          const route: RouteRecordRaw = {
            path: item2.routePath,
            name: item2.name,
            component: () => import("../components/cluster/index.vue"),
          };
          return route;
        }
      })
    };
    return route;
  } else {
    const route: RouteRecordRaw = {
      path: item1.routePath,
      name: item1.name,
      component: () => import("../components/cluster/index.vue"),
    };
    return route;
  }
});

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    components: { "app-main": Login }
  },
  {
    path: "/",
    name: "main",
    components: { "app-main": Main },
    children: subRotes
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
