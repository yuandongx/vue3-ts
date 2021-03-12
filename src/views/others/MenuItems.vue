<template>
  <div>
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['2']"
      mode="inline"
      theme="dark"
    >
      <template v-for="item in list" :key="item.id">
        <template v-if="!item.children">
          <a-menu-item :key="item.id">
            <router-link :to="item.routePath">
              <component v-if="item.icon !== undefined" :is="item.icon" />
              <span>{{ item.title }}</span>
            </router-link>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.id" />
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Menu } from "ant-design-vue";
import RoutesInfo from "../../router/routes";
import SubMenu from "./SubMenItems.vue";
import {
  AppstoreOutlined,
  DesktopOutlined,
  DashboardOutlined,
  DeploymentUnitOutlined
} from "@ant-design/icons-vue";
export default defineComponent({
  props: {
    MenuCollapsed: {
      type: Boolean,
      default: true
    }
  },
  components: {
    "a-menu-item": Menu.Item,
    "a-menu": Menu,
    "sub-menu": SubMenu,
    AppstoreOutlined,
    DesktopOutlined,
    DashboardOutlined,
    DeploymentUnitOutlined
  },
  data() {
    return {
      list: RoutesInfo,
      collapsed: false
    };
  }
});
</script>
