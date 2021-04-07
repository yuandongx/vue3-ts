<template>
  <a-row :gutter="gutter">
    <a-col :span="3">
      <a-input-search
        v-model:value="valueName"
        placeholder="输入名称进行查找"
        enter-button
        @search="onSearchByName"
      />
    </a-col>
    <a-col :span="3">
      <a-input-search
        v-model:value="valuePlatform"
        placeholder="输入平台进行查找"
        enter-button
        @search="onSearchByPlatform"
      />
    </a-col>
    <a-col :span="3">
      <a-input-search
        v-model:value="valueAuthor"
        placeholder="输入作者进行查找"
        enter-button
        @search="onSearchByAuthor"
      />
    </a-col>
    <a-col :span="3">
      <a-button type="primary" shape="round" @click="createTask"
        >创建任务</a-button
      >
    </a-col>
  </a-row>
  <a-divider />
  <task-show />
  <task-create />
</template>
<script lang="ts">
import TaskShow from "./task-show.vue";
import TaskCreate from "./task-create.vue";
import { defineComponent } from "vue";
import { Input, Row, Col, Divider, Button } from "ant-design-vue";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
const gutter = { xs: 8, sm: 16, md: 24 };
export default defineComponent({
  setup() {
    const store = useStore();
    const setTaskCreateVisible = (v: boolean) => {
      store.commit(MutationType.SetTaskCreateVisible, v);
    };
    return { setTaskCreateVisible };
  },
  components: {
    TaskShow,
    TaskCreate,
    "a-button": Button,
    "a-input-search": Input.Search,
    "a-row": Row,
    "a-col": Col,
    "a-divider": Divider
  },
  data() {
    return {
      gutter,
      valueName: "",
      valuePlatform: "",
      valueAuthor: ""
    };
  },
  methods: {
    onSearchByName() {
      console.log();
    },
    onSearchByPlatform() {
      console.log();
    },
    onSearchByAuthor() {
      console.log();
    },
    createTask() {
      this.setTaskCreateVisible(true);
    }
  }
});
</script>
