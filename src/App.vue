<template>
  <a-config-provider :locale="zhCN">
    <router-view name="app-main" />
    <router-view name="app-ssh" />
  </a-config-provider>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ConfigProvider } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import moment from "moment";
import "moment/dist/locale/zh-cn";
moment.locale("zh-cn");
export default defineComponent({
  components: {
    "a-config-provider": ConfigProvider
  },
  data() {
    return {
      zhCN
    };
  },
  methods: {
    // eslint-disable-next-line
    getPopupContainer(el: any, dialogContext: any) {
      if (dialogContext) {
        return dialogContext.getDialogWrap();
      } else {
        return document.body;
      }
    }
  }
});
</script>
