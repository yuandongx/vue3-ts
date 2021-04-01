import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Login from "../views/Login.vue";
import Main from "../views/Main.vue";
import routeitems, { RouteItem } from "./routes";
import SSH from "../components/ssh/index.vue";
// const subRotes = routeitem1s.map(item1 => {
//   if (item1.children !== undefined && item1.children !== []) {
//     const route: RouteRecordRaw = {
//       path: item1.routePath,
//       component: () => import("../components/cluster/index.vue"),
//       name: item1.name,
//       children: item1.children.map(item2 => {
//         if (item2.children !== undefined && item2.children !== []) {
//           const route: RouteRecordRaw = {
//             path: item2.routePath,
//             component: () => import("../components/cluster/index.vue"),
//             name: item2.name,
//             children: item2.children.map(item3 => {
//               if (item3.children !== undefined && item3.children !== []) {
//                 const route: RouteRecordRaw = {
//                   path: item3.routePath,
//                   component: () => import("../components/cluster/index.vue"),
//                   name: item3.name,
//                   children: item3.children.map(item => {
//                     const route: RouteRecordRaw = {
//                       path: item.routePath,
//                       name: item.name,
//                       component: () => import("../components/cluster/index.vue")
//                     };
//                     return route;
//                   })
//                 };
//                 return route;
//               } else {
//                 const route: RouteRecordRaw = {
//                   path: item3.routePath,
//                   name: item3.name,
//                   component: () => import("../components/cluster/index.vue")
//                 };
//                 return route;
//               }
//             })
//           };
//           return route;
//         } else {
//           const route: RouteRecordRaw = {
//             path: item2.routePath,
//             name: item2.name,
//             component: () => import("../components/cluster/index.vue")
//           };
//           return route;
//         }
//       })
//     };
//     return route;
//   } else {
//     const route: RouteRecordRaw = {
//       path: item1.routePath,
//       name: item1.name,
//       component: () => import("../components/cluster/index.vue")
//     };
//     return route;
//   }
// });

function MapRoute(dataItems: Array<RouteItem>): Array<RouteRecordRaw> {
  const routers: Array<RouteRecordRaw> = [];
  for (const item of dataItems) {
    const route: RouteRecordRaw = {
      path: item.routePath,
      name: item.name,
      component: () => import(`../components/${item.componentPath}/index.vue`)
    };
    if (item.children !== undefined && item.children !== []) {
      route.children = MapRoute(item.children);
    }
    routers.push(route);
  }
  return routers;
}

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
    children: MapRoute(routeitems)
  },
  {
    path: "/ssh/:id",
    name: "ssh",
    components: { "app-ssh": SSH },
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

NProgress.configure({
  easing: "ease",
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3
});
const hasAuthen = () => {
  return true;
};
router.beforeEach((to, from, next) => {
  // 每次切换页面时，调用进度条
  // console.log(to.fullPath);
  // console.log(to.query);
  NProgress.start();
  NProgress.inc();
  if (!hasAuthen() && !to.fullPath.startsWith("/login")) {
    next({ path: "/login", query: { next: to.fullPath } });
  } else {
    next();
  }
});

//当路由进入后：关闭进度条
router.afterEach(() => {
  NProgress.done();
});
export default router;
