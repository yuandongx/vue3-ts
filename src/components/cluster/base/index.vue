<template>
  <div>
    <a-row>
      <a-col :span="2">
        <a-button type="link" @click="() => (addHostVisiable = true)"
          >新建主机</a-button
        >
      </a-col>
      <a-col :span="2">
        <a-button type="link" @click="showImportModal">批量导入主机</a-button>
      </a-col>
      <a-col :span="2">
        <a-button type="link" @click="deleteHost">批量删除主机</a-button>
      </a-col>
    </a-row>
    <a-divider></a-divider>
    <the-display ref="display" @update="update" :platform="platform" />
    <import-modal @refresh="refresh" :platform="platform" />
  </div>
</template>

<script lang="ts">
import { App } from "vue";
import { Button, Col, Divider, Row } from "ant-design-vue";
import { defineComponent } from "@vue/runtime-core";
import ImportModal from "./import.vue";
import Display from "./display.vue";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
export default defineComponent({
  props: {
    platform: {
      type: String,
      default: "linux"
    }
  },
  components: {
    [Button.name]: Button,
    [Col.name]: Col,
    [Row.name]: Row,
    [Divider.name]: Divider,
    "import-modal": ImportModal,
    "the-display": Display
  },
  setup() {
    const store = useStore();
    const setImportVisible = (v: boolean) => {
      store.commit(MutationType.SetClusterImportVisible, v);
    };
    return { setImportVisible };
  },
  data() {
    return {
      showImport: false
    };
  },
  methods: {
    showImportModal() {
      this.setImportVisible(true);
    },
    deleteHost() {
      console.log();
    },
    update() {
      console.log();
    },
    refresh() {
      this.showImport = false;
      (this.$refs.display as App & { fetch: Function }).fetch();
    }
  }
});
</script>
<style></style>
