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
    <!-- <display ref="refresh" @update="update"/> -->
    <import-modal :showImport="showImport" />
  </div>
</template>

<script lang="ts">
import { Button, Col, Divider, Row } from "ant-design-vue";
import { defineComponent } from "@vue/runtime-core";
import ImportModal from "./import.vue";
export default defineComponent({
  components: {
    [Button.name]: Button,
    [Col.name]: Col,
    [Row.name]: Row,
    [Divider.name]: Divider,
    "import-modal": ImportModal
  },
  data() {
    return {
      showImport: false
    };
  },
  methods: {
    showImportModal() {
      this.showImport = true;
      console.log(this.showImport);
    },
    deleteHost() {
      console.log();
    }
  }
});
</script>
<style></style>
