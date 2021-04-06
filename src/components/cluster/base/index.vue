/* eslint-disable to ignore the next line */
<template>
  <div>
    <a-row>
      <a-col :span="2">
        <a-button type="link" @click="() => setAddVisible(true)"
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
    <the-display ref="display" @update="onUpdate" :platform="platform" />
    <import-modal @refresh="refresh" :platform="platform" />
    <the-add :platform="platform" ref="updateAddForm" />
  </div>
</template>

<script lang="ts">
import { App } from "vue";
import { Button, Col, Divider, Row } from "ant-design-vue";
import { defineComponent } from "@vue/runtime-core";
import ImportModal from "./import.vue";
import Display from "./display.vue";
import Add from "./add.vue";
import { useStore } from "@/store";
import { Credentials } from "@/store/somes/culster";
import { MutationType } from "@/store/mutations";
import { FormData } from "./interface";
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
    "the-display": Display,
    "the-add": Add
  },
  setup() {
    const store = useStore();
    const setImportVisible = (v: boolean) => {
      store.commit(MutationType.SetClusterImportVisible, v);
    };
    const setAddVisible = (v: boolean) => {
      store.commit(MutationType.SetClusterAddVisible, v);
    };
    const setCredentials = (v: Array<Credentials>) => {
      store.commit(MutationType.SetCredentials, v);
    };
    return { setImportVisible, setAddVisible, setCredentials };
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
    onUpdate(param: FormData) {
      this.setAddVisible(true);
      (this.$refs.updateAddForm as App & { update: Function }).update(param);
    },
    add() {
      this.setAddVisible(true);
    },
    refresh() {
      this.showImport = false;
      (this.$refs.display as App & { fetch: Function }).fetch();
    }
  }
});
</script>
<style></style>
