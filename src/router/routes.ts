interface RouteItem {
  id: string;
  name: string;
  componentPath?: string;
  routePath: string;
  icon?: string;
  title: string;
  children?: RouteItem[];
}

const routes: RouteItem[] = [
  {
    id: "1",
    name: "dashboard",
    componentPath: "dashboard",
    routePath: "/dashboard",
    icon: "dashboard-outlined",
    title: "主页面板"
  },
  {
    id: "2",
    name: "cluster",
    componentPath: "cluster",
    routePath: "/cluster",
    icon: "desktop-outlined",
    title: "主机集群"
  },
  {
    id: "3",
    name: "deployment",
    componentPath: "deployment",
    routePath: "/deployment",
    icon: "deployment-unit-outlined",
    title: "安装部署"
  },
  {
    id: "4",
    name: "schedule",
    componentPath: "schedule",
    routePath: "/schedule",
    icon: "schedule-outlined",
    title: "任务调度",
    children: [
      {
        id: "4-1",
        name: "cli",
        componentPath: "schedule/cli",
        routePath: "/schedule/cli",
        icon: "appstore-outlined",
        title: "控制台"
      },
      {
        id: "4-2",
        name: "tasks",
        componentPath: "schedule/tasks",
        routePath: "/schedule/tasks",
        icon: "appstore-outlined",
        title: "任务"
      },
      {
        id: "4-4",
        name: "workflow",
        componentPath: "schedule/workflow",
        routePath: "/schedule/workflow",
        icon: "appstore-outlined",
        title: "工作流"
      }
    ]
  },
  {
    id: "5",
    name: "setting",
    componentPath: "setting",
    routePath: "/setting",
    icon: "setting-outlined",
    title: "系统配置",
    children: [
      {
        id: "5-1",
        name: "credentials",
        componentPath: "setting/credentials",
        routePath: "/setting/credentials",
        icon: "appstore-outlined",
        title: "访问凭证"
      }
    ]
  },
  {
    id: "6",
    name: "team",
    componentPath: "team",
    routePath: "/team",
    icon: "user-outlined",
    title: "管理员",
    children: [
      {
        id: "6-1",
        name: "information",
        componentPath: "team/information",
        routePath: "/team/information",
        icon: "appstore-outlined",
        title: "个人信息",
        children: [
          {
            id: "6-1-1",
            name: "privilege",
            componentPath: "privilege",
            routePath: "/team/information/privilege",
            icon: "appstore-outlined",
            title: "权限管理"
          },
          {
            id: "6-1-2",
            name: "update",
            componentPath: "update",
            routePath: "/team/information/update",
            icon: "appstore-outlined",
            title: "信息更新"
          }
        ]
      }
    ]
  }
];
export default routes;
