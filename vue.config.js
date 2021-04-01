// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 'primary-color': '#2E8B57', //
            // "layout-sider-background": "#2E8B57", // 侧边的颜色
            // 'link-color': '#1a9111',
            // "menu-dark-color": "#0000ff", //菜单字体
            // "menu-dark-bg": "#2E8B57", //菜单背景色
            // 'border-radius-base': '2px',
            // "menu-item-color": "#2E8B57",
            // "menu-dark-submenu-bg": "#2E8B57",
            // "menu-dark-item-active-bg": "#CDCD00" // 已选择的item的颜色
          },
          javascriptEnabled: true
        }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("base", resolve("baseConfig"))
      .set("store", resolve("src/store"))
      .set("public", resolve("public"));
  }
};
