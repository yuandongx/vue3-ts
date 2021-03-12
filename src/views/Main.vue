<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="the-logo-icon" />
      <the-menu :menu-collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '660px' }"
        >
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { Layout } from "ant-design-vue";
import { defineComponent, ref } from "vue";
import Menu from "./others/MenuItems.vue";
export default defineComponent({
  components: {
    "a-layout": Layout,
    "a-layout-header": Layout.Header,
    "a-layout-content": Layout.Content,
    "a-layout-sider": Layout.Sider,
    "a-layout-footer": Layout.Footer,
    "the-menu": Menu
  },
  data() {
    return {
      collapsed: ref<boolean>(false)
    };
  }
});
</script>
<style>
.the-logo-icon {
  height: 62px;
  margin: 16px;
  background-image: url("../assets/logo.png");
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #1a915f;
}
</style>
