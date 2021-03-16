<template>
  <a-sub-menu :key="menuInfo.id" v-bind="$attrs">
    <template #title>
      <span>
        <component v-if="menuInfo.icon !== undefined" :is="menuInfo.icon" />
        <span>{{ menuInfo.title }}</span>
      </span>
    </template>
    <template v-for="item in menuInfo.children" :key="item.id">
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
  </a-sub-menu>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Menu } from "ant-design-vue";
import {
  AppstoreOutlined,
  SettingOutlined,
  ScheduleOutlined,
  UserOutlined
} from "@ant-design/icons-vue";
export default defineComponent({
  name: "SubMenu",
  props: {
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    AppstoreOutlined,
    SettingOutlined,
    ScheduleOutlined,
    UserOutlined,
    "a-menu-item": Menu.Item,
    "a-sub-menu": Menu.SubMenu
  }
});
</script>